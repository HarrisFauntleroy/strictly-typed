import React, { PropsWithChildren } from 'react';
import { ChakraProvider as Provider } from '@chakra-ui/react';

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export const primaryTheme = extendTheme({ colors });

export const ChakraProvider = ({ children }: PropsWithChildren) => {
  return <Provider theme={primaryTheme}>{children}</Provider>;
};
