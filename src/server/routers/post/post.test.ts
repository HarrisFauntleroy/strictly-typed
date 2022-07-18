/**
 * Integration test example for the `post` router
 */
import { createContextInner } from '../../context';
import { appRouter } from '../_app';
import { inferMutationInput } from '~/utils/trpc';

const userId = 'd218a370a078-fc16-47e0-bd02-5c03994c';

test('add and get post', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferMutationInput<'post.add'> = {
    userId: userId,
    text: 'NewPost',
    title: 'NewPost',
  };
  const post = await caller.mutation('post.add', input);
  const byId = await caller.query('post.byId', {
    id: post.id,
  });

  expect(byId).toMatchObject(input);

  const editedInput: inferMutationInput<'post.edit'> = {
    id: post.id,
    userId: userId,
    data: { text: 'Edited Post', title: 'Edited Post' },
  };

  const editedPost = await caller.mutation('post.edit', editedInput);
  const editedPostById = await caller.query('post.byId', {
    id: editedPost.id,
  });

  const editedPostInput = editedInput.data;

  expect(editedPostById).toMatchObject(editedPostInput);
});

test.todo('Add Update Post test');

test.todo('Add Delete Post test');

test.todo('Add Archive Post test');

test.todo('Add Publish Post test');
