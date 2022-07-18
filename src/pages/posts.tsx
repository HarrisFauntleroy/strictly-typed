/**
 *
 * Index
 *
 */
import { NextPageWithLayout } from './_app';
import { getPostHistory } from './api/history';
import {
  Center,
  CircularProgress,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Post, Role } from '@prisma/client';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import { PostCard, PostsForm } from '~/components/Posts';
import { trpc } from '~/utils/trpc';

const postsByUser = 'post.byUser';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  const userId = session?.userId;
  const history = await getPostHistory(userId);

  return {
    props: { history },
  };
};

const Posts: NextPageWithLayout = ({ history }: { history?: Post[] }) => {
  console.log(history);
  const session = useSession();
  const userId = session?.data?.userId;

  const postsQuery = trpc.useQuery([postsByUser, { userId: userId || '' }]);

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  if (postsQuery.status === 'loading')
    return (
      <Center
        position="fixed"
        minWidth="100vw"
        minHeight="100vh"
        background="transparent"
        top={0}
        left={0}
      >
        <CircularProgress isIndeterminate size="64px" thickness="8px" />
      </Center>
    );

  return (
    <Stack gap={2}>
      <Head>
        <title>Posts</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text fontSize="4xl">Posts</Text>
      <PostsForm mode="add" label="New Post" />
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} gap={4}>
        {postsQuery.data?.map((item) => (
          <PostCard key={item.id} post={item} />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

Posts.auth = true;
Posts.roles = [Role.USER, Role.ADMIN];
export default Posts;

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
