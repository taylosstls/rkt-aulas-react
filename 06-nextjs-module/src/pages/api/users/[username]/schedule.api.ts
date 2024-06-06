import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { z } from 'zod'
import dayjs from "dayjs";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) return res.status(400).json({ message: 'User does not exist.' })

  // Checa os campos do formulário
  const createSchedulingBody = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string(),
    date: z.string().datetime()
  })

  const { name, email, observations, date } = createSchedulingBody.parse(req.body)

  // Dá um FORCE pra hora ficar no formato: XX:00h
  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) return res.status(400).json({ message: 'Date is in the past.' })

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate()
    }
  })

  if (conflictingScheduling) return res.status(400).json({ message: 'There is another schedule ocurring at this time.' })

  await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      user_id: user.id,
      date: schedulingDate.toDate(),
    }
  })


  return res.status(201).end()
}