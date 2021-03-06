/**
 *
 *	History API route
 *
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/prisma';

export type GenericInput =
  | string
  | Record<string, unknown>
  | { [x: string]: unknown };

// Get all users posts from the database
export const getPostHistory = async (userId?: string) =>
  await prisma.post.findMany({
    where: {
      userId: userId || 'NOT_FOUND',
    },
  });

// API route handler
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GenericInput>,
) => {
  // Take the userId from the query parameters
  // eg. http://.../api/history?userId=<userId>
  const { userId } = req.query;
  //	Return post history associated with the user
  const history = await getPostHistory(String(userId));
  // Return history as a JSON object under the key 'data'
  res.status(200).json({ data: history, userId: userId });
};

export default handler;
