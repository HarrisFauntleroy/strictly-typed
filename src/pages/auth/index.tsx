/**
 *
 *	Auth page
 *	Checks if user is logged in before allowing access to page
 *
 */
import {
  Center,
  CircularProgress,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { Role } from '@prisma/client';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import logger from '~/utils/logger';

enum Status {
  AUTHENTICATED = 'authenticated',
  LOADING = 'loading',
  UNAUTHENTICATED = 'unauthenticated',
}

interface AuthProps {
  children: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  > | null;
  // An array of roles from the current page
  roles?: Role[];
}

export const getServerSideProps = async (context: NextPageContext) => ({
  props: {
    session: await getSession(context),
  },
});

const Auth = ({ children, roles }: AuthProps) => {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  const loading = status === Status.LOADING;
  const role = session?.user.role || Role.USER;

  React.useEffect(() => {
    if (!loading && !session) {
      logger.debug('!loading && !session');
      logger.debug('This triggers a redirect to sign in');
      router.push('/api/auth/signin');
    }
  }, [loading, router, session]);

  if (loading || !session) {
    logger.debug('loading || !session');
    logger.debug('This displays a loading indicator');
    return (
      <Center minWidth="100vw" minHeight="100vh">
        <Stack>
          <Text textAlign="center">Authenticating</Text>
          <StackDivider />
          <CircularProgress />
        </Stack>
      </Center>
    );
  }
  logger.debug(roles);

  if (roles && !roles?.includes(role)) {
    logger.debug('roles && !roles?.includes(role)');
    logger.debug('This triggers a redirect to sign in');
    logger.debug(roles);
    router.push('/api/auth/signin');
  }
  return children;
};

export default Auth;
