import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { z } from 'zod'
import dayjs from 'dayjs'

import { prisma } from '../../../../lib/prisma'
import { getGoogleOAuthToken } from '../../../../lib/google'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) return res.status(400).json({ message: 'User does not exist.' })

  // Checa os campos do formulário
  const createSchedulingBody = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string().nullable(),
    date: z.string().datetime(),
  })

  const { name, email, observations, date } = createSchedulingBody.parse(
    req.body,
  )

  // Dá um FORCE pra hora ficar no formato: XX:00h
  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date()))
    return res.status(400).json({ message: 'Date is in the past.' })

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling)
    return res
      .status(400)
      .json({ message: 'There is another schedule occurring at this time.' })

  const scheduling = await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  try {
    const auth = await getGoogleOAuthToken(user.id)

    const calendar = google.calendar({ version: 'v3', auth })

    const event = {
      summary: `Ignite Call: ${name}`,
      description: observations || '',
      start: {
        dateTime: schedulingDate.toISOString(), // Horário de início em formato ISO 8601
        timeZone: 'America/Sao_Paulo', // Fuso horário de São Paulo
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').toISOString(), // Horário de término em formato ISO 8601
        timeZone: 'America/Sao_Paulo', // Fuso horário de São Paulo
      },
      attendees: [{ email, displayName: name }], // Adicionando os participantes
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet', // Configuração para criar uma reunião no Google Meet
          },
        },
      },
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: event,
    })

    res.status(201).json({ scheduling, event: response.data })
  } catch (error) {
    console.error('Error creating calendar event', error)
    res.status(500).json({ error: 'Error creating calendar event' })
  }
}
