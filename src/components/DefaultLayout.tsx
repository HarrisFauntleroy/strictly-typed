import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { Role } from '@prisma/client';
import { NextPageContext } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { ReactNode, useMemo } from 'react';
import { MdAdminPanelSettings, MdLogin, MdLogout } from 'react-icons/md';
import { ReactQueryDevtools } from 'react-query/devtools';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Sidebar, { ISidebarContent } from '~/components/Sidebar';

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

  const SidebarHeader: ISidebarContent[] = useMemo(() => [], []);

  const SidebarContent: ISidebarContent[] = useMemo(() => [], []);

  const SidebarFooter: ISidebarContent[] = useMemo(
    () => [
      {
        icon: <Icon as={MdAdminPanelSettings} />,
        title: 'admin',
        href: '/admin',
        hidden: !session || session?.user?.role !== Role.ADMIN,
      },
      {
        icon: <Icon as={SettingsIcon} />,
        title: 'settings',
        href: '/settings',
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
      {/* Sidebar placement doesnt matter as its a drawer */}
      <Sidebar
        sidebarControls={sidebarControls}
        headerContent={SidebarHeader}
        bodyContent={SidebarContent}
        footerContent={SidebarFooter}
      />
      <Header sidebarControls={sidebarControls} />
      <Flex direction="column" flex={1} minHeight="100vh" maxWidth="100vw">
        <Box flex={1} padding="16px">
          {children}
        </Box>
      </Flex>
      <Footer />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
