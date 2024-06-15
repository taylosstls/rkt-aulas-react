import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  // Ajusta a ordenação, inclui apenas usuário e livro e retorna os últimos 10
  const categories = await prisma.category.findMany()

  return res.status(201).json({ categories })
}
