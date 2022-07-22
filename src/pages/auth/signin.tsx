import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { signIn, getProviders } from 'next-auth/react';
import React from 'react';

interface Provider {
  id: string;
  name: string;
}

type Providers = Provider[];

interface SignInProps {
  providers: Providers;
  csrfToken: string;
}

const Signin = ({ providers }: SignInProps) => (
  <Center width="100vw" height="100vh">
    <Box
      maxW={'320px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
    >
      <Avatar
        size={'xl'}
        src={'/images/cosmicoctopus.jpeg'}
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        Strongly Typed 💪
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        Sign in or register
      </Text>
      <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
        <Badge
          px={2}
          py={1}
          bg={useColorModeValue('gray.50', 'gray.800')}
          fontWeight={'400'}
        ></Badge>
        <Badge
          px={2}
          py={1}
          bg={useColorModeValue('gray.50', 'gray.800')}
          fontWeight={'400'}
        ></Badge>
        <Badge
          px={2}
          py={1}
          bg={useColorModeValue('gray.50', 'gray.800')}
          fontWeight={'400'}
        ></Badge>
      </Stack>
      <Stack mt={4} direction={'column'} spacing={4}>
        {providers &&
          Object.values(providers).map((provider) => (
            <Button key={provider.id} onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          ))}
      </Stack>
    </Box>
  </Center>
);

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

// No layout for this page
Signin.getLayout = function getLayout(page: NextPage) {
  return <>{page}</>;
};
