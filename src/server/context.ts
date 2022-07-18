import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

interface CreateContextOptions {
  // session: Session | null;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // Will be available as `ctx` in all your resolvers

  // This is just an example
  async function getTokenFromHeader() {
    if (opts?.req.headers.authorization) {
      return opts.req.headers.authorization;
    }
    return null;
  }

  const token = await getTokenFromHeader();

  // Example
  console.log(token);
  // for API-response caching see https://trpc.io/docs/caching

  return await createContextInner({});
}
