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
  Avatar,
  Box,
  Center,
  CircularProgress,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormattedDate } from 'react-intl';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  const postsQuery = trpc.useQuery(['post.all']);
  const addPost = trpc.useMutation('post.add', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(['post.all']);
    },
  });

  const session = useSession();

  const userId = session?.data?.userId;

  console.log(session);

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h2>
        Posts
        {postsQuery.status === 'loading' && <CircularProgress />}
      </h2>
      {postsQuery.data?.map((item) => (
        <Center py={6} key={item.id}>
          <Box
            maxW={'445px'}
            w={'full'}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
          >
            {/* <Box
              h={'210px'}
              bg={'gray.100'}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}
            >
              image
            </Box> */}
            <Stack>
              <Text
                color={'green.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}
              >
                Post
              </Text>
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {item.title}
              </Heading>
              <Text color={'gray.500'}>{item.text}</Text>
              <Link href={`/post/${item.id}`}>
                <a>View more</a>
              </Link>
            </Stack>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
              <Avatar src="/vercel.svg" />
              <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                <Text fontWeight={600}>Harris Fauntleroy</Text>
                <Text color={'gray.500'}>
                  <FormattedDate value={item.createdAt} />
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Center>

        // <Flex
        //   key={item.id}
        //   borderRadius="20px"
        //   bg={boxBg}
        //   p="20px"
        //   h="345px"
        //   w={{ base: '315px', md: '345px' }}
        //   alignItems="center"
        //   direction="column"
        // >
        //   <h3>{item.title}</h3>
        //   <h3>{item.text}</h3>
        //   <Link href={`/post/${item.id}`}>
        //     <a>View more</a>
        //   </Link>
        // </Flex>
      ))}
      <hr />
      <Center>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            /**
             * In a real app you probably don't want to use this manually
             * Checkout React Hook Form - it works great with tRPC
             * @link https://react-hook-form.com/
             */
            const $userId: HTMLInputElement = (e as any).target.elements.userId;
            const $title: HTMLInputElement = (e as any).target.elements.title;
            const $text: HTMLInputElement = (e as any).target.elements.text;

            const input = {
              userId: $userId.value,
              title: $title.value,
              text: $text.value,
            };
            try {
              console.log(input);
              await addPost.mutateAsync(input);
              // Reset after submit
              $userId.value = '';
              $title.value = '';
              $text.value = '';
            } catch {}
          }}
        >
          <label htmlFor="userId">userId: </label>
          <input
            id="userId"
            name="userId"
            type="text"
            disabled={addPost.isLoading}
            value={userId}
          />
          <br />
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            disabled={addPost.isLoading}
          />

          <br />
          <label htmlFor="text">Text: </label>
          <textarea id="text" name="text" disabled={addPost.isLoading} />
          <br />
          <input type="submit" disabled={addPost.isLoading} />
          {addPost.error && (
            <p style={{ color: 'red' }}>{addPost.error.message}</p>
          )}
        </form>
      </Center>
    </>
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
