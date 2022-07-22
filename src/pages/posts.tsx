/**
 *
 * Index
 *
 */
import { NextPageWithLayout } from './_app';
import { SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import { PostCard, PostsForm } from '~/components/Posts';
import { trpc } from '~/utils/trpc';

const postsByUser = 'post.byUser';

const Posts: NextPageWithLayout = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const postsQuery = trpc.useQuery([postsByUser, { userId: userId || '' }]);

  if (postsQuery.isLoading) return <Text>Loading...</Text>;

  return (
    <Stack gap={2}>
      <Head>
        <title>Settings</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text fontSize="4xl">Posts</Text>
      <PostsForm mode="add" label="New Post" />
      <SimpleGrid minChildWidth="268px" gap={4}>
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
