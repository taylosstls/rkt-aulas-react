import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import dayjs from "dayjs";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const username = String(req.query.username)
  // Formato esperado:
  // http://localhost:3000/api/users/gustavo-teixeira/availability?date=2024-06-01
  const { date } = req.query

  if (!date) return res.status(400).json({ message: 'Date not provided.' })

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) return res.status(400).json({ message: 'User does not exist.' })

  const referenceDate = dayjs(String(date))

  // Valida se a data passada é antiga
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) return res.json({ possibleTimes: [], availableTimes: [] })

  // Cross entre TimeInterval com Scheduling
  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day')
    }
  })

  // Se não tiver horário disponível
  if (!userAvailability) return res.json({ possibleTimes: [], availableTimes: [] })

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  // validação de hora em hora
  const startHour = time_start_in_minutes / 60 // 10h00
  const endHour = time_end_in_minutes / 60 // 18h00

  // Trabalha das 10h até 18h
  // retorno esperado [10, 11, 12, 13, 14, 15, 16, 17]
  const possibleTimes = Array.from({
    length: endHour - startHour
  }).map((_, i) => {
    return startHour + i
  })

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(), // gte = greater than or equal
        lte: referenceDate.set('hour', endHour).toDate(), // gte = leather than or equal
      }
    }
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )

    const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

    return !isTimeBlocked && !isTimeInPast
  })

  return res.json({ possibleTimes, availableTimes })
}