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
  useColorModeValue,
} from '@chakra-ui/react';
import { StatusIndicator } from '~/components/Status';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  MdAccountBalanceWallet,
  MdBarChart,
  MdChevronRight,
  MdLightMode,
  MdList,
  MdLogin,
  MdLogout,
  MdMenu,
  MdMenuOpen,
  MdNightsStay,
  MdSavings,
  MdSettings,
} from 'react-icons/md';

interface Props {
  sidebarControls: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: unknown) => unknown;
    getDisclosureProps: (props?: unknown) => unknown;
  };
}

const Header = ({ sidebarControls }: Props) => {
  const location = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const pathName = location?.asPath;
  // Split pathName into seperate peices, remove empty spaces
  const pathArr = pathName?.split('/').filter((n) => n);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        id="back-to-top-anchor"
      >
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
                onClick={sidebarControls.onToggle}
                aria-label={''}
                icon={sidebarControls.isOpen ? <MdMenuOpen /> : <MdMenu />}
              />
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
                  <Stack padding="8px">
                    <Button leftIcon={<MdBarChart />}>
                      <Link href="/overview">Overview</Link>
                    </Button>
                    <Button leftIcon={<MdAccountBalanceWallet />}>
                      <Link href="/accounts">Accounts</Link>
                    </Button>
                    <Button leftIcon={<MdSavings />}>
                      <Link href="/budget">Budgets</Link>
                    </Button>
                  </Stack>
                  <MenuDivider />
                  <Link href="/status">
                    <MenuItem icon={<StatusIndicator active />}>
                      API Status Page
                    </MenuItem>
                  </Link>
                  <Link href="/changelog">
                    <MenuItem icon={<MdList />}>Changelog</MenuItem>
                  </Link>
                  <MenuItem icon={<MdSettings />}>Preferences</MenuItem>
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
