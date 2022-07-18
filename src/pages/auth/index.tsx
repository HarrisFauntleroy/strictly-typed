/**
 *
 *	Auth page
 *	Checks if user is logged in before allowing access to page
 *
 */
import { Center, CircularProgress } from '@chakra-ui/react';
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
    // No session found and no longer loading
    if (!loading && !session) {
      logger.debug('!loading && !session');
      logger.debug('This triggers a redirect to sign in');
      router.push('/api/auth/signin');
    }
  }, [loading, router, session]);

  const isRoleAllowed = () => roles && !roles?.includes(role);
  const isWaitingForSession = () => loading || !session;

  if (isWaitingForSession()) {
    logger.debug('loading || !session');
    logger.debug('This displays a loading indicator');
    return (
      <Center
        position="fixed"
        minWidth="100vw"
        minHeight="100vh"
        background="transparent"
        top={0}
        left={0}
      >
        <CircularProgress isIndeterminate size="64px" thickness="8px" />
      </Center>
    );
  }
  if (isRoleAllowed()) {
    logger.debug('roles && !roles?.includes(role)');
    logger.debug('This triggers a redirect to sign in');
    logger.debug(roles);
    router.push('/api/auth/signin');
  }
  // Continue
  return children;
};

export default Auth;
