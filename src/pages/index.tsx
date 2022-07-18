/**
 *
 * Index
 *
 */
import { NextPageWithLayout } from './_app';
import { Link, Stack, Text } from '@chakra-ui/react';
import { Role } from '@prisma/client';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

const Index: NextPageWithLayout = () => {
  return (
    <Stack gap={2}>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text fontSize="4xl">Home</Text>
      <NextLink href="/" passHref>
        <Link>Home</Link>
      </NextLink>
      <NextLink href="/posts" passHref>
        <Link>Posts</Link>
      </NextLink>
    </Stack>
  );
};

Index.auth = true;
Index.roles = [Role.USER, Role.ADMIN];
export default Index;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
