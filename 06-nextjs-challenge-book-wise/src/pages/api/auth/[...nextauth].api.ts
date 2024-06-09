import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import { NextApiRequest, NextApiResponse } from 'next'
import nextAuth, { NextAuthOptions } from 'next-auth'

import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

export function buildNextAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),

    // configurando GIT e GOOGLE
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? '',
        clientSecret: process.env.GOOGLE_SECRET ?? '',
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID ?? '',
        clientSecret: process.env.GITHUB_SECRET ?? '',
        profile(profile: GithubProfile) {
          return {
            id: String(profile.id),
            name: profile.name ?? '',
            email: profile.email ?? '',
            avatar_url: profile.avatar_url,
          }
        },
      }),
    ],

    callbacks: {
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return nextAuth(req, res, buildNextAuthOptions(req, res))
}
