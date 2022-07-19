import React, { PropsWithChildren } from 'react';
import { ChakraProvider } from '~/providers/chakra';
import { IntlProvider } from '~/providers/intl';

export const AppContext = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider>
      <IntlProvider>{children}</IntlProvider>
    </ChakraProvider>
  );
};
