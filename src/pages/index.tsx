/**
 *
 * Index
 *
 */
import Head from 'next/head';
import { Role } from '@prisma/client';

import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import {
  CircularProgress,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { PostCard, PostsForm } from '~/components/Posts';

const postsByUser = 'post.byUser';

const IndexPage: NextPageWithLayout = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const postsQuery = trpc.useQuery([postsByUser, { userId: userId || '' }]);

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  if (postsQuery.status === 'loading') return <CircularProgress />;

  return (
    <Stack gap={2}>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text fontSize="4xl">Posts</Text>
      <PostsForm mode="add" label="New Post" />
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} gap={4}>
        {postsQuery.data?.map((item) => (
          <GridItem key={item.id}>
            <PostCard post={item} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

IndexPage.auth = true;
IndexPage.roles = [Role.USER, Role.ADMIN];
export default IndexPage;

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
