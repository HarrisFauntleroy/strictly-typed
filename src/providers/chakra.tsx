import {
  ChakraProvider as Provider,
  GlobalStyle,
  extendTheme,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

// Extend the theme to include custom color, fonts, etc
export const primaryTheme = extendTheme({
  useSystemColorMode: true,
  styles: {
    global: () => ({
      'html, body': {
        margin: 0,
        padding: 0,
        fontSmoothing: 'antialiased',
        // backgroundImage: mode(
        //   'url(/images/background.svg) !important',
        //   'url(/images/background-light.jpg) !important',
        // )(props),
        // backgroundSize: mode(
        //   '91px 64px !important',
        //   '50px 50px !important',
        // )(props),
        // backgroundRepeat: mode(undefined, 'repeat !important')(props),
      },
      a: {
        color: 'teal.500',
      },
      '.w-md-editor-show-preview': {
        boxShadow: '0px !important',
      },
    }),
  },
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
});

export const ChakraProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider theme={primaryTheme}>
      <GlobalStyle />
      {children}
    </Provider>
  );
};
