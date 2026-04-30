import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/core-db'
import { users } from '@/src/db/schema'
import { eq } from 'drizzle-orm'


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ username, password }) => {
        const msgBuffer = new TextEncoder().encode(password as string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        const user = await db.select().from(users)
          .where(eq(users.username, username as string))
          .get()
        if (!user || user.passwordHash !== hash) return null
        return { id: user.id, name: user.username, role: user.role }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    session({ session, token }) {
      (session.user as any).role = token.role
      return session
    }
  },
  pages: { signIn: '/login' }
})
