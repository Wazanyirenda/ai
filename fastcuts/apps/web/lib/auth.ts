import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/client';
import { ensureUserSetup } from '@/db/helpers';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ user }) {
      if (user?.id) {
        await ensureUserSetup(user.id, user.email);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/app/projects`;
    }
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        await ensureUserSetup(user.id, user.email);
      }
    }
  }
});
