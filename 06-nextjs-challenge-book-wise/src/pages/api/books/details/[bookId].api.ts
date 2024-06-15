import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const bookId = String(req.query.bookId)

  // Ajusta a ordenação, inclui apenas usuário e livro e retorna os últimos 10
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      ratings: {
        include: {
          user: true,
        },
      },
    },
  })

  const booksAvgRating = await prisma.rating.groupBy({
    by: ['book_id'],
    where: { book_id: bookId },
    _avg: { rate: true },
  })

  const booksWithAvgRating = {
    ...book,
    avgRating: booksAvgRating[0]?._avg.rate ?? 0,
  }

  return res.status(201).json({ book: booksWithAvgRating })
}
