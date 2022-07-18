/**
 *
 *	History API route
 *	Captures all users posts for a period and saves them
 *	For future aggregation
 *
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/prisma';

export type GenericInput =
  | string
  | Record<string, unknown>
  | { [x: string]: unknown };

interface GetPostHistory {
  userId?: string;
}

// Get all users posts from the database
export const getPostHistory = async ({ userId }: GetPostHistory) =>
  await prisma.post.findMany({
    where: {
      userId: userId,
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
  const history = await getPostHistory({ userId: String(userId) });
  // Return history as a JSON object under the key 'data'
  res.status(200).json({ data: history, userId: userId });
};

export default handler;
