/**
 * Integration test for the `post` router
 */
import { createContextInner } from '../../context';
import { appRouter } from '../_app';
import { inferMutationInput } from '~/utils/trpc';

const userId = 'test-user-id';
// Must match the actual Test User created by prisma/seed.ts
const testUser = 'Test User';

test('add and get post', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferMutationInput<'post.add'> = {
    userId: userId,
    text: testUser,
    title: testUser,
  };

  const post = await caller.mutation('post.add', input);

  const byId = await caller.query('post.byId', {
    id: post.id,
  });

  expect(byId).toMatchObject(input);
});

test.todo('Add Update Post test');

test.todo('Add Delete Post test');

test.todo('Add Archive Post test');

test.todo('Add Publish Post test');
