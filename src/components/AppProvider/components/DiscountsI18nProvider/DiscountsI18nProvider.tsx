import React from 'react';
import {useI18n} from '@shopify/react-i18n';
import defaultTranslations from '@locales/en.json';

async function DEFAULT_TRANSLATIONS_FN(locale: string) {
  return import(
    /* webpackChunkName: "DiscountAppComponents-i18n", webpackMode: "lazy-once" */ `locales_dynamic/${locale}.json`
    ).then((dictionary) => {
    if (!dictionary) {
      return undefined;
    }

    return dictionary.default;
  });
}

export function DiscountsI18nProvider({
                                        children,
                                        translationsFn,
                                      }: {
  children: React.ReactNode;
  translationsFn?: (locale: string) => Promise<any>;
}) {
  const [, ShareTranslations] = useI18n({
    id: 'DiscountAppComponents',
    fallback: defaultTranslations,
    async translations(locale) {
      return typeof translationsFn === 'function'
        ? translationsFn(locale)
        : DEFAULT_TRANSLATIONS_FN(locale);
    },
  });

  return <ShareTranslations>{children}</ShareTranslations>;
}
