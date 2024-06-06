import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import nextConnect from 'next-connect'
import upload from '../../../lib/multer-config'
import { prisma } from '../../../lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, _, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiRoute.use(upload.single('avatar'))

apiRoute.put(
  async (
    req: NextApiRequest & { file?: Express.Multer.File },
    res: NextApiResponse,
  ) => {
    try {
      const session = await getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res),
      )

      if (!session) return res.status(401).end()

      const { bio } = updateProfileBodySchema.parse(req.body)

      let avatarUrl = session.user.avatar_url
      if (req.file) {
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        const day = currentDate.getDate().toString().padStart(2, '0')
        const uploadPath = `/uploads/${year}/${month}/${day}/${req.file.filename}`
        avatarUrl = uploadPath
      }

      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          bio,
          avatar_url: avatarUrl,
        },
      })

      return res.status(204).end()
    } catch (error) {
      console.error(error)
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: 'Invalid request format', issues: error.errors })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
)

export const config = {
  api: {
    bodyParser: false, // Disables Next.js's default body parsing
  },
}

export default apiRoute
