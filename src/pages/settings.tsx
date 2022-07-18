/**
 *
 * Index
 *
 */
import { NextPageWithLayout } from './_app';
import { Stack, Text } from '@chakra-ui/react';
import { Role } from '@prisma/client';
import Head from 'next/head';
import React from 'react';

const Settings: NextPageWithLayout = () => {
  return (
    <Stack gap={2}>
      <Head>
        <title>Settings</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text fontSize="4xl">Settings</Text>
    </Stack>
  );
};

Settings.auth = true;
Settings.roles = [Role.USER, Role.ADMIN];
export default Settings;
