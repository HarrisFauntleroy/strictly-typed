/**
 *
 * Footer
 *
 */
import { Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Text textAlign="center" width="100%" padding="8px">
      {process.env.NEXT_PUBLIC_AUTHOR}
      Version: {process.env.NEXT_PUBLIC_VERSION}
    </Text>
  );
};

export default Footer;
