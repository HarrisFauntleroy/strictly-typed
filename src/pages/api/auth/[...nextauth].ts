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
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '~/server/prisma';

export interface WithAuth {
  auth: boolean;
}

export interface WithRole {
  roles: Role[];
}

export interface WithAuthRole extends WithAuth, WithRole {}

let useMockProvider = process.env.NODE_ENV === 'test';

const { GITHUB_CLIENT_ID, GITHUB_SECRET, NODE_ENV, APP_ENV } = process.env;

if (
  (NODE_ENV !== 'production' || APP_ENV === 'test') &&
  (!GITHUB_CLIENT_ID || !GITHUB_SECRET)
) {
  console.log('⚠️ Using mocked GitHub auth correct credentials were not added');
  useMockProvider = true;
}

const providers: Provider[] = [
  EmailProvider({
    server: process.env.MAIL_SERVER,
    from: process.env.EMAIL_FROM,
  }),
  GoogleProvider({
    // Google provider types being weird.
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
  }),
  GithubProvider({
    clientId: process.env.GITHUB_ID || '',
    clientSecret: process.env.GITHUB_SECRET || '',
  }),
];

// TODO...
// Doesn't work with database sessions
if (useMockProvider)
  providers.push(
    CredentialsProvider({
      id: 'github',
      name: 'mocked GitHub',
      async authorize(credentials) {
        console.log(credentials);
        return {
          id: credentials?.name,
          name: credentials?.name,
          email: credentials?.name,
        };
      },
      credentials: {
        name: { type: 'test' },
      },
    }),
  );

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
    // signIn: '/auth/signin',
    // 	signOut: '/auth/signout',
    // 	error: '/auth/error', // Error code passed in query string as ?error=
    // 	verifyRequest: '/auth/verify-request', // (used for check email message)
    // 	newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code
    logo: 'https://next-auth.js.org/img/logo/logo-xs.png', // Absolute URL to image
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

      // Add user ID and role to session object
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
    // async signIn({ user, account, profile, email, credentials }) {
    // 	return true
    // },
    // async redirect({ url, baseUrl }) {
    // 	return baseUrl
    // },
  },
  // events: {
  // 	async signIn(message) { /* on successful sign in */ },
  // 	async signOut(message) { /* on signout */ },
  // 	async createUser(message) { /* user created */ },
  // 	async updateUser(message) { /* user updated - e.g. their email was verified */ },
  // 	async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
  // 	async session(message) { /* session is active */ },
  // }
});
