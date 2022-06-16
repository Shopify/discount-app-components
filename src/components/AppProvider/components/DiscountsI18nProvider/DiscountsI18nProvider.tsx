import React from 'react';
import {useI18n} from '@shopify/react-i18n';
import defaultTranslations from '@locales/en.json';

export function DiscountsI18nProvider({children}: {children: React.ReactNode}) {
  const [, ShareTranslations] = useI18n({
    id: 'DiscountAppComponents',
    fallback: defaultTranslations,
    async translations(locale) {
      return import(
        /* webpackChunkName: "DiscountAppComponents-i18n", webpackMode: "lazy-once" */ `locales_dynamic/${locale}.json`
      ).then((dictionary) => {
        if (!dictionary) {
          return undefined;
        }

        return dictionary.default;
      });
    },
  });

  return <ShareTranslations>{children}</ShareTranslations>;
}
