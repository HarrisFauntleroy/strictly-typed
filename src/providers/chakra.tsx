import {
  ChakraProvider as Provider,
  GlobalStyle,
  extendTheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import React, { PropsWithChildren } from 'react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0,
        fontSmoothing: 'antialiased',
        backgroundColor: mode('#272727 !important', undefined),
        backgroundImage: mode(
          'url(/images/background.svg) !important',
          'url(/images/background-light.jpg) !important',
        ),
        backgroundSize: mode('91px 64px !important', '50px 50px !important'),
        backgroundRepeat: mode(undefined, 'repeat !important'),
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export const primaryTheme = extendTheme({ colors });

export const ChakraProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider theme={primaryTheme}>
      <GlobalStyle />
      {children}
    </Provider>
  );
};
