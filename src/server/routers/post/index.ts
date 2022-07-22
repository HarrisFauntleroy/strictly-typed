/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  userId: true,
  user: {
    select: {
      name: true,
      image: true,
    },
  },
  title: true,
  text: true,
  createdAt: true,
  updatedAt: true,
  archived: true,
});

export const postRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      userId: z.string(),
      title: z.string().min(1).max(32),
      text: z.string().min(1),
    }),
    async resolve({ input }) {
      return prisma.post.create({
        data: input,
        select: defaultPostSelect,
      });
    },
  })
  // read
  .query('all', {
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return prisma.post.findMany({
        where: {
          deleted: {
            equals: false,
          },
        },
        select: defaultPostSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
        select: defaultPostSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    },
  })
  .query('byUser', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      const { userId } = input;
      const post = await prisma.post.findMany({
        where: {
          userId,
          deleted: {
            equals: false,
          },
        },
        select: defaultPostSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with userId '${userId}'`,
        });
      }
      return post;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.string(),
      userId: z.string(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      return prisma.post.update({
        where: { id },
        data,
        select: defaultPostSelect,
      });
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.post.update({ where: { id }, data: { deleted: true } });
      return {
        id,
      };
    },
  })
  // unarchive
  .mutation('unarchive', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.post.update({ where: { id }, data: { archived: false } });
      return {
        id,
      };
    },
  })
  // archive
  .mutation('archive', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.post.update({ where: { id }, data: { archived: true } });
      return {
        id,
      };
    },
  });
