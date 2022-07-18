/**
 *
 * Sidebar
 *
 */
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export interface ISidebarContent {
  icon?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  hidden?: boolean;
  href: string;
  onClick?: () => void;
}

interface SidebarProps {
  sidebarControls: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: () => unknown;
    getDisclosureProps: () => unknown;
  };
  headerContent: ISidebarContent[];
  bodyContent: ISidebarContent[];
  footerContent: ISidebarContent[];
}

const SidebarComponent = ({
  sidebarControls,
  headerContent,
  bodyContent,
  footerContent,
}: SidebarProps) => (
  <Drawer
    placement="left"
    onClose={sidebarControls.onClose}
    isOpen={sidebarControls.isOpen}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px" justifyContent="center">
        {headerContent?.map((headerItem) => (
          <Wrap key={headerItem.href}>
            <WrapItem>{headerItem.icon}</WrapItem>
            <WrapItem alignItems="center">
              <Button>{headerItem.title}</Button>
            </WrapItem>
          </Wrap>
        ))}
      </DrawerHeader>
      <DrawerBody flexDirection="column">
        {bodyContent?.map((bodyItem) => (
          <Button key={bodyItem.href}>
            <Link href={bodyItem.href}>{bodyItem.title}</Link>
          </Button>
        ))}
      </DrawerBody>
      <DrawerFooter borderTopWidth="1px" flexDirection="column">
        {footerContent?.map((footerItem) => (
          <Button key={footerItem.href}>
            <Link href={footerItem.href}>{footerItem.title}</Link>
          </Button>
        ))}
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export default SidebarComponent;
