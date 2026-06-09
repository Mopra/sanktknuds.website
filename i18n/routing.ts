import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['da', 'en'] as const,
  defaultLocale: 'da',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/menu': {
      da: '/menukort',
      en: '/menu',
    },
    '/wine': {
      da: '/vinkort',
      en: '/wine',
    },
    '/story': {
      da: '/historie',
      en: '/story',
    },
    '/visit': {
      da: '/besoeg',
      en: '/visit',
    },
    '/book': {
      da: '/book-bord',
      en: '/reservations',
    },
    '/events': {
      da: '/selskaber',
      en: '/events',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export const routes = {
  home: '/',
  menu: '/menu',
  wine: '/wine',
  story: '/story',
  visit: '/visit',
  book: '/book',
  events: '/events',
} as const satisfies Record<string, AppPathname>;
