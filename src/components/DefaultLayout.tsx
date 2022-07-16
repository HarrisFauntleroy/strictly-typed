import {
  Avatar,
  Box,
  Flex,
  Icon,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode, useMemo } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from '~/components/Header';
import Sidebar, { ISidebarContent } from '~/components/Sidebar';
import Footer from '~/components/Footer';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import {
  MdAccountBalance,
  MdAdminPanelSettings,
  MdBarChart,
  MdHome,
  MdLogin,
  MdLogout,
  MdNote,
  MdQuestionAnswer,
  MdSavings,
} from 'react-icons/md';
import { NextPageContext } from 'next';
import { Role } from '@prisma/client';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  const user = session?.user;
  return {
    props: { session, user },
  };
};

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const sidebarControls = useDisclosure();

  const { data: session } = useSession();

  const displayName = session?.user.name;

  const SidebarHeader: ISidebarContent[] = useMemo(
    () => [
      {
        icon: (
          <Avatar src={session?.user.image ?? '/images/user-not-found.jpg'} />
        ),
        href: '/profile',
        title: displayName ?? '',
        disabled: !session,
      },
    ],
    [displayName, session],
  );

  const SidebarContent: ISidebarContent[] = useMemo(
    () => [
      {
        icon: <Icon as={MdHome} />,
        title: 'Home',
        href: '/',
        disabled: !session,
      },
      {
        icon: <Icon as={MdBarChart} />,
        title: 'Overview',
        href: '/overview',
        disabled: !session,
      },
      {
        icon: <Icon as={MdAccountBalance} />,
        title: 'Accounts',
        href: '/accounts',
        disabled: !session,
      },
      {
        icon: <Icon as={MdSavings} />,
        title: 'Budget',
        href: '/budget',
        disabled: !session,
      },
      {
        icon: <Icon as={MdNote} />,
        title: 'notes',
        href: '/notes',
        disabled: !session,
      },
    ],
    [session],
  );

  const SidebarFooter: ISidebarContent[] = useMemo(
    () => [
      {
        icon: <Icon as={MdAdminPanelSettings} />,
        title: 'admin',
        href: '/admin',
        hidden: !session || session?.user?.role !== Role.ADMIN,
      },
      {
        icon: <Icon as={MdQuestionAnswer} />,
        title: 'help',
        href: '/help',
        disabled: !session,
      },
      {
        icon: <Icon as={session ? MdLogout : MdLogin} />,
        onClick: session ? () => signOut({ callbackUrl: '/' }) : () => signIn(),
        title: session ? 'logout' : 'login',
        href: '',
      },
    ],
    [session],
  );

  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* The main layout structure */}
      <Stack>
        {/* Sidebar  */}
        <Sidebar
          sidebarControls={sidebarControls}
          headerContent={SidebarHeader}
          bodyContent={SidebarContent}
          footerContent={SidebarFooter}
        />
        <Flex direction="column">
          {/* Header  */}
          <Header sidebarControls={sidebarControls} />
          {/* Content  */}
          <Box flex={1} padding="16px">
            {children}
          </Box>
          {/* Footer  */}
          <Footer />
        </Flex>
      </Stack>

      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
