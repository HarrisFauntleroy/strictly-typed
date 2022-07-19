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
  useToast,
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

  const archivePost = trpc.useMutation('post.archive', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries([postsByUser]);
    },
  });

  const session = useSession();

  const userId = session.data?.userId;

  const toast = useToast();

  const middlebit = () => {
    switch (mode) {
      case 'add':
        return (
          userId && (
            <Form
              onSubmit={async (submitValues) => {
                addPost
                  .mutateAsync({
                    ...submitValues,
                    userId: userId,
                  })
                  .then(() => {
                    onClose();
                    toast({
                      title: 'Posted!',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  })
                  .catch(logger.error);
              }}
            />
          )
        );
      case 'delete':
        return (
          post && (
            <Button
              onClick={() =>
                deletePost.mutateAsync({ id: post.id }).then(() => {
                  onClose();
                  toast({
                    title: 'Deleted!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                })
              }
            >
              Delete the post titled: ${post?.title} ?
            </Button>
          )
        );
      case 'archive':
        return (
          post && (
            <Button
              onClick={() =>
                archivePost
                  .mutateAsync({ id: post.id })
                  .then(() => {
                    onClose();
                    toast({
                      title: 'Archived!',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  })
                  .catch(logger.error)
              }
            >
              Archive the post titled: ${post?.title} ?
            </Button>
          )
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
      <ChakraModal isOpen={isOpen} onClose={onClose} isCentered variant="full">
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

  const [markdown, setMarkdown] = useState<string | undefined>(post.text);

  return (
    <FocusLock disabled={!editing} autoFocus={true}>
      <Stack
        maxWidth="21cm"
        boxShadow="xl"
        rounded="md"
        p="8px"
        opacity={post.archived ? 0.1 : 1}
      >
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {post.title}
        </Heading>
        <Suspense fallback={<Skeleton height={300} isLoaded={!!post} />}>
          {editing ? (
            <MDEditor
              onMouseDown={() => {
                if (!editing) toggleEditing();
              }}
              textareaProps={{
                placeholder: 'Please enter Markdown text',
              }}
              height={270}
              // Bit of a hack to get max-content working but it seems to
              toolbarHeight={'max-content' as unknown as number}
              value={markdown}
              preview={'edit'}
              highlightEnable
              onChange={setMarkdown}
            />
          ) : (
            <MDEditor
              onMouseDown={toggleEditing}
              textareaProps={{
                placeholder: 'Please enter Markdown text',
              }}
              height={300}
              hideToolbar
              value={post.text}
              preview={'preview'}
              highlightEnable
              onChange={setMarkdown}
            />
          )}
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
                onClick={async () => {
                  await editPost
                    .mutateAsync({
                      id: post.id,
                      userId: post.userId,
                      data: { text: markdown },
                    })
                    .then(() => {
                      setEditing(false);
                    })
                    .catch(logger.error);
                }}
              />
            </ButtonGroup>
          )}
        </Flex>
      </Stack>
    </FocusLock>
  );
};
