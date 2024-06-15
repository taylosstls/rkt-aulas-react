import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const categoryId = req.query.category as string

  const books = await prisma.book.findMany({
    where: {
      categories: {
        some: {
          category_id: categoryId,
        },
      },
    },
    include: {
      ratings: true,
    },
  })

  const booksAvgRating = await prisma.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
  })

  let userBooksId: string[] = []

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (session) {
    // Verifica se o usuário já fez uma avaliação sobre o livro para marcá-lo como "Lido"
    const userBooks = await prisma.book.findMany({
      where: {
        ratings: {
          some: {
            user_id: String(session.user.id),
          },
        },
      },
    })

    userBooksId = userBooks.map((book) => book.id)
  }

  const booksWithAvgRating = books.map((book) => {
    const bookAvgRating = booksAvgRating.find(
      (avgRating) => avgRating.book_id === book.id,
    )

    // Omitindo o ratings para não ser necessário retornar essa info na api
    const { ratings, ...bookInfo } = book

    return {
      ...bookInfo,
      ratings: ratings.length,
      avgRating: bookAvgRating?._avg.rate,
      alreadyRead: userBooksId.includes(book.id),
    }
  })

  return res.status(201).json({ books: booksWithAvgRating })
}
