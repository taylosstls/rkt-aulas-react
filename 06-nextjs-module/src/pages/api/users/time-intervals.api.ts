import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) return res.status(401).end()

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  const data = intervals.map((interval) => ({
    week_day: interval.weekDay,
    time_start_in_minutes: interval.startTimeInMinutes,
    time_end_in_minutes: interval.endTimeInMinutes,
    user_id: session.user?.id,
  }))

  try {
    await prisma.userTimeInterval.createMany({
      data,
    })
    return res.status(201).end()
  } catch (error) {
    console.error('Error creating user time intervals:', error)
    return res.status(500).end()
  }
}
