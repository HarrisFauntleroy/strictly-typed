/**
 * Integration test example for the `post` router
 */
import { createContextInner } from '../../context';
import { appRouter } from '../_app';
import { inferMutationInput } from '~/utils/trpc';

test('add and get post', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);
  const userId = 'd218a370a078-fc16-47e0-bd02-5c03994c';

  const input: inferMutationInput<'post.add'> = {
    userId: userId,
    text: 'hello test',
    title: 'hello test',
  };
  const post = await caller.mutation('post.add', input);
  const byId = await caller.query('post.byId', {
    id: post.id,
  });

  expect(byId).toMatchObject(input);
});
