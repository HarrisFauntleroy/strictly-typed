/**
 *
 * Debug component
 * Displays raw object data in a readable format
 * Only displays in development environment
 *
 */
import { Heading, Stat } from '@chakra-ui/react';
import React from 'react';

export const Debug = (props: Record<string, unknown>) =>
  process.env.NODE_ENV === 'development' ? (
    <Stat mt={4}>
      <Heading my={2} as="h4" fontSize="16px">
        Raw data:
      </Heading>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </Stat>
  ) : null;
