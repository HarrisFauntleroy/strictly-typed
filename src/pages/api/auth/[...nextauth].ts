/**
 *
 * Authentication route using NextAuth
 * Prisma adapter provides type mapping and ORM
 *
 */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Role } from '@prisma/client';
import NextAuth, { Session } from 'next-auth';
import { Provider } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '~/server/prisma';

export interface WithAuth {
  auth: boolean;
}

export interface WithRole {
  roles: Role[];
}

export interface WithAuthRole extends WithAuth, WithRole {}

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
  }),
];

export default NextAuth({
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  adapter: PrismaAdapter(prisma),
  providers: providers,
  debug: false,
  pages: {
    signIn: '/auth/signin',
  },
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: 'https://next-auth.js.org/img/logo/logo-xs.png',
  },
  callbacks: {
    async session({ session, user }) {
      const userData = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          role: true,
          id: true,
        },
      });
      const updatedSession: Session = {
        ...session,
        userId: user.id,
        user: {
          ...session.user,
          id: user.id,
          role: userData?.role ?? Role.USER,
        },
      };
      return updatedSession;
    },
    // Seems to be required for custom sign in page to work
    // Does skip sign in process, just signs in.
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
});
