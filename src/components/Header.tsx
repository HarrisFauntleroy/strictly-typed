/**
 *
 * Header
 *
 */
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  MdChevronRight,
  MdLightMode,
  MdLogin,
  MdLogout,
  MdNightsStay,
  MdSettings,
} from 'react-icons/md';

const Header = () => {
  const location = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const pathName = location?.asPath;
  // Split pathName into seperate peices, remove empty spaces
  const pathArr = pathName?.split('/').filter((n) => n);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box px={6} id="back-to-top-anchor">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Breadcrumb
            aria-label="breadcrumb"
            separator={
              <Flex>
                <MdChevronRight />
              </Flex>
            }
            textTransform="lowercase"
          >
            <BreadcrumbItem isCurrentPage={pathName === '/'}>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            {pathArr?.map((path, index) => (
              <BreadcrumbItem
                key={'breadcrumbs' + index}
                isCurrentPage={pathName.replace('/', '') === path}
              >
                <BreadcrumbLink href={'/' + path}>{path}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={1}>
              <IconButton
                variant="link"
                onClick={toggleColorMode}
                aria-label={''}
                icon={
                  colorMode === 'light' ? <MdLightMode /> : <MdNightsStay />
                }
              />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={user?.image ?? '/images/user-not-found.jpg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Link href="/profile">
                      <Avatar
                        size={'2xl'}
                        src={user?.image ?? '/images/user-not-found.jpg'}
                      />
                    </Link>
                  </Center>
                  <br />
                  <Center>
                    <p>{user?.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link href="/posts">
                    <MenuItem icon={<MdSettings />}>Posts</MenuItem>
                  </Link>
                  <MenuDivider />
                  {/* <Link href="/changelog">
                    <MenuItem icon={<MdList />}>Changelog</MenuItem>
                  </Link> */}
                  <Link href="/settings">
                    <MenuItem icon={<MdSettings />}>Settings</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem
                    icon={session ? <MdLogout /> : <MdLogin />}
                    onClick={
                      session
                        ? () => signOut({ callbackUrl: '/' })
                        : () => signIn()
                    }
                  >
                    {session ? 'Sign Out' : 'Sign In'}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
