/**
 *
 * Default layout
 * Wraps other pages
 *
 */
import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Elixir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
