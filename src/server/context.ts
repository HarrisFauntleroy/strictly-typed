/**
 *
 * Context provider for incoming requests
 *
 */
import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import ws from 'ws';

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

interface CreateContextOptions {
  // session: Session | null;
}

export type ContextInner = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({
  req,
  res,
}:
  | trpcNext.CreateNextContextOptions
  | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
  const session = await getSession({ req });
  console.log('createContext for', session?.user?.name ?? 'unknown user');

  let useMockProvider = process.env.NODE_ENV === 'test';

  const { GITHUB_CLIENT_ID, GITHUB_SECRET, NODE_ENV, APP_ENV } = process.env;

  if (
    (NODE_ENV !== 'production' || APP_ENV === 'test') &&
    (!GITHUB_CLIENT_ID || !GITHUB_SECRET)
  ) {
    console.log(
      '⚠️ Using mocked GitHub auth correct credentials were not added',
    );
    useMockProvider = true;
  }

  if (useMockProvider) {
    return await createContextInner({});
  } else
    return {
      req,
      res,
      prisma,
      session,
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
