/**
 *
 * _app page
 *
 */
import { WithAuthRole } from './api/auth/[...nextauth]';
import Auth from './auth';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import 'katex/dist/katex.css';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { SessionProvider, getSession } from 'next-auth/react';
import { AppProps } from 'next/app';
import { AppType, NextPageContext } from 'next/dist/shared/lib/utils';
import React, { ReactElement, ReactNode } from 'react';
import superjson from 'superjson';
import { DefaultLayout } from '~/components/DefaultLayout';
import { AppContext } from '~/providers';
import { AppRouter } from '~/server/routers/_app';
import { SSRContext } from '~/utils/trpc';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

export type NextPageWithLayout = NextPage &
  WithAuthRole & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session?: Session | null;
};

const MyApp = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth roles={Component.roles}>
          <AppContext>{getLayout(<Component {...pageProps} />)}</AppContext>
        </Auth>
      ) : (
        <AppContext>{getLayout(<Component {...pageProps} />)}</AppContext>
      )}
    </SessionProvider>
  );
}) as AppType;

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  /**
   * Set headers or status code when doing SSR
   */
  responseMeta(opts) {
    const ctx = opts.ctx as SSRContext;

    if (ctx.status) {
      // If HTTP status set, propagate that
      return {
        status: ctx.status,
      };
    }

    const error = opts.clientErrors[0];
    if (error) {
      // Propagate http first error from API calls
      return {
        status: error.data?.httpStatus ?? 500,
      };
    }
    // For app caching with SSR see https://trpc.io/docs/caching
    return {};
  },
})(MyApp);
