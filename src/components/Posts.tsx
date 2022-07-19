import { Form } from './Form';
import { CheckIcon, DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Text,
  Heading,
  Link,
  Avatar,
  Icon,
  IconButton,
  IconButtonProps,
  ModalHeader,
  ButtonGroup,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import React, { Suspense, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { MdArchive, MdPerson } from 'react-icons/md';
import { FormattedDate } from 'react-intl';
import logger from '~/utils/logger';
import { trpc } from '~/utils/trpc';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const postsByUser = 'post.byUser';

export type Post = {
  id: string;
  userId: string;
  title: string;
  text: string;
  user: {
    image: string | null;
    name: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
};

interface PostsFormProps extends Pick<IconButtonProps, 'icon'> {
  post?: Post;
  mode: 'edit' | 'add' | 'delete' | 'archive';
  label?: string;
}

export const PostsForm = ({ post, mode, icon, label }: PostsFormProps) => {
  const utils = trpc.useContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const addPost = trpc.useMutation('post.add', {
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

  const session = useSession();

  const userId = session.data?.userId;

  const middlebit = () => {
    switch (mode) {
      case 'add':
        return (
          userId && (
            <Form
              onSubmit={async (submitValues) => {
                try {
                  logger.info(submitValues);
                  addPost.mutateAsync({
                    ...submitValues,
                    userId: userId,
                  });
                } catch (error) {
                  logger.error(error);
                }
              }}
            />
          )
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
      case 'archive':
        return (
          <Stack>
            <Text>Are you sure you want to archive?</Text>
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
      {label && (
        <Button maxWidth="max-content" onClick={onOpen} size="sm">
          {label}
        </Button>
      )}
      {icon && (
        <IconButton
          aria-label=""
          maxWidth="max-content"
          icon={icon}
          onClick={onOpen}
          size="sm"
        />
      )}
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {label}
            {icon}
          </ModalHeader>
          <ModalCloseButton mt="8px" />
          {middlebit()}
        </ModalContent>
      </ChakraModal>
    </>
  );
};

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => setEditing((editing) => !editing);

  const utils = trpc.useContext();

  const editPost = trpc.useMutation('post.edit', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries([postsByUser]);
    },
  });

  return (
    <FocusLock disabled={!editing} autoFocus={true}>
      <Stack
        w={['1fr', '2fr', '3fr', '4fr', '5fr']}
        h={['1fr', '2fr', '3fr', '4fr', '5fr']}
        boxShadow={'2xl'}
        rounded={'md'}
        p="8px"
        height="undefined !important"
      >
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {post.title}
        </Heading>
        <Suspense fallback={<Skeleton height={300} isLoaded={!!post} />}>
          <MDEditor
            onMouseDown={() => {
              if (!editing) toggleEditing();
            }}
            textareaProps={{
              placeholder: 'Please enter Markdown text',
            }}
            height={editing ? 270 : 300}
            toolbarHeight={32}
            hideToolbar={!editing}
            value={post.text}
            preview={editing ? 'edit' : 'preview'}
            highlightEnable
            onChange={async (submitValues) => {
              try {
                editPost.mutateAsync({
                  id: post.id,
                  userId: post.userId,
                  data: { text: submitValues },
                });
              } catch (error) {
                logger.error(error);
              }
            }}
          />
        </Suspense>
        <Flex
          mt={2}
          direction={['column', 'row']}
          gap={2}
          width="100%"
          align={'center'}
          justifyContent="space-between"
        >
          <Stack direction={'row'} alignItems={'center'} width="100%">
            <Avatar
              size="sm"
              src={post.user.image || undefined}
              icon={<Icon as={MdPerson} w={8} h={8} />}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{post.user.name}</Text>
              <Text color={'gray.500'}>
                <FormattedDate value={post.createdAt} />
              </Text>
            </Stack>
          </Stack>
          {editing && (
            <ButtonGroup width="100%" gap="4px">
              <Link href={`/post/${post.id}`}>
                <IconButton
                  aria-label={'Go to post'}
                  icon={<ExternalLinkIcon />}
                  size="sm"
                />
              </Link>
              <PostsForm mode="archive" post={post} icon={<MdArchive />} />
              <PostsForm mode="delete" post={post} icon={<DeleteIcon />} />
              {/* <PostsForm mode="edit" post={post} icon={<EditIcon />} />
               */}
              <IconButton
                color="green.400"
                aria-label={'Edit post'}
                size="sm"
                icon={<CheckIcon />}
                onClick={toggleEditing}
              />
            </ButtonGroup>
          )}
        </Flex>
      </Stack>
    </FocusLock>
  );
};
