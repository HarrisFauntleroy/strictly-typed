/**
 *
 * Internationalization
 *
 */
import React, { PropsWithChildren } from 'react';
import { IntlProvider as Provider } from 'react-intl';
import enAUMessages from '~/lang/en-AU.json';
import enUSMessages from '~/lang/en-US.json';
import zhCNMessages from '~/lang/zh-CN.json';

export enum LOCALE {
  AUSTRALIAN = 'en-AU',
  AMERICAN = 'en-US',
  CHINESE = 'zh-CN',
}

export interface LocaleType {
  label: string;
  value: LOCALE;
  currency: string;
}

type IntlContextType = {
  locale: LocaleType;
  setLocale: React.Dispatch<React.SetStateAction<LocaleType>>;
};

const defaultValues = {
  locale: { label: 'Australian', value: LOCALE.AUSTRALIAN, currency: 'AUD' },
  setLocale: () => null,
};

export const IntlContext = React.createContext<IntlContextType>(defaultValues);

export const IntlProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = React.useState<LocaleType>(defaultValues.locale);

  const messages = {
    [LOCALE.AUSTRALIAN]: enAUMessages,
    [LOCALE.AMERICAN]: enUSMessages,
    [LOCALE.CHINESE]: zhCNMessages,
  };

  return (
    <Provider
      locale={locale.value}
      messages={messages[locale.value]}
      defaultLocale={LOCALE.AUSTRALIAN}
    >
      <IntlContext.Provider value={{ locale, setLocale }}>
        {children}
      </IntlContext.Provider>
    </Provider>
  );
};
