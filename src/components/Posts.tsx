import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { trpc } from '~/utils/trpc';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Text,
  Box,
  Heading,
  Link,
  Avatar,
} from '@chakra-ui/react';
import { FormattedDate } from 'react-intl';

const postsByUser = 'post.byUser';

interface PostsFormProps {
  post?: Partial<Post>;
  mode: 'edit' | 'add' | 'delete';
  label?: string;
}

export const PostsForm = ({ post, mode, label }: PostsFormProps) => {
  const session = useSession();
  const userId = session?.data?.userId;
  const utils = trpc.useContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const addPost = trpc.useMutation('post.add', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries([postsByUser]);
    },
  });

  const editPost = trpc.useMutation('post.edit', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries([postsByUser]);
    },
  });

  const deletePost = trpc.useMutation('post.delete', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries([postsByUser]);
    },
  });

  const middlebit = () => {
    switch (mode) {
      case 'add':
        return (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              /**
               * In a real app you probably don't want to use this manually
               * Checkout React Hook Form - it works great with tRPC
               * @link https://react-hook-form.com/
               */
              const $userId: HTMLInputElement = (e as any).target.elements
                .userId;
              const $title: HTMLInputElement = (e as any).target.elements.title;
              const $text: HTMLInputElement = (e as any).target.elements.text;

              const input = {
                userId: $userId.value,
                title: $title.value,
                text: $text.value,
              };
              try {
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
        );
      case 'edit':
        return (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              /**
               * In a real app you probably don't want to use this manually
               * Checkout React Hook Form - it works great with tRPC
               * @link https://react-hook-form.com/
               */
              const $id: HTMLInputElement = (e as any).target.elements.id;
              const $userId: HTMLInputElement = (e as any).target.elements
                .userId;
              const $title: HTMLInputElement = (e as any).target.elements.title;
              const $text: HTMLInputElement = (e as any).target.elements.text;

              const input = {
                id: $id.value,
                userId: $userId.value,
                data: {
                  title: $title.value,
                  text: $text.value,
                },
              };
              try {
                await editPost.mutateAsync(input);
                $id.value = '';
                $userId.value = '';
                $title.value = '';
                $text.value = '';
              } catch {}
            }}
          >
            {post?.id && (
              <>
                <label htmlFor="id">id: </label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  contentEditable={false}
                  disabled={editPost.isLoading}
                  value={post?.id}
                />
                <br />
              </>
            )}
            <label htmlFor="userId">userId: </label>
            <input
              id="userId"
              name="userId"
              type="text"
              disabled={editPost.isLoading}
              value={userId}
            />
            <br />
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              name="title"
              type="text"
              disabled={editPost.isLoading}
              defaultValue={post?.title}
            />

            <br />
            <label htmlFor="text">Text: </label>
            <textarea
              id="text"
              name="text"
              disabled={editPost.isLoading}
              defaultValue={post?.text}
            />
            <br />
            <input type="submit" disabled={editPost.isLoading} />
            {editPost.error && (
              <p style={{ color: 'red' }}>{editPost.error.message}</p>
            )}
          </form>
        );
      case 'delete':
        return (
          <Stack>
            <Text>Are you sure you want to delete?</Text>
            <Button
              onClick={() => deletePost.mutateAsync({ id: post?.id || '' })}
            >
              deletePost
            </Button>
          </Stack>
        );
      default:
        return <Text>Something went wrong...</Text>;
    }
  };

  return (
    <>
      <Button maxWidth="max-content" onClick={onOpen}>
        {label || 'Open'}
      </Button>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="24px">{middlebit()}</ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

interface PostCardProps {
  post: Partial<Post>;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
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
          {post.title}
        </Heading>
        <Text color={'gray.500'}>{post.text}</Text>
        <Link href={`/post/${post.id}`}>
          <a>View more</a>
        </Link>
      </Stack>
      <Stack
        mt={6}
        direction={'row'}
        spacing={4}
        align={'center'}
        justifyContent="space-between"
      >
        <Stack direction={'row'} align={'center'}>
          <Avatar src="/vercel.svg" />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Harris Fauntleroy</Text>
            <Text color={'gray.500'}>
              <FormattedDate value={post.createdAt} />
            </Text>
          </Stack>
        </Stack>
        <PostsForm mode="delete" post={post} label="Delete" />
        <PostsForm mode="edit" post={post} label="Edit" />
      </Stack>
    </Box>
  );
};
