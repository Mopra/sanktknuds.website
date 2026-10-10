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
    '/lunch': {
      da: '/frokost',
      en: '/lunch',
    },
    '/wine': {
      da: '/vinkort',
      en: '/wine',
    },
    '/cocktails': {
      da: '/cocktailkort',
      en: '/cocktails',
    },
    '/drinks': {
      da: '/drikkevarer',
      en: '/drinks',
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
    '/menu/[slug]': {
      da: '/menukort/[slug]',
      en: '/menu/[slug]',
    },
    '/visit/[slug]': {
      da: '/besoeg/[slug]',
      en: '/visit/[slug]',
    },
    '/events/[slug]': {
      da: '/selskaber/[slug]',
      en: '/events/[slug]',
    },
    '/christmas-lunch': {
      da: '/julefrokost',
      en: '/christmas-lunch',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export const routes = {
  home: '/',
  menu: '/menu',
  lunch: '/lunch',
  wine: '/wine',
  cocktails: '/cocktails',
  drinks: '/drinks',
  story: '/story',
  visit: '/visit',
  book: '/book',
  events: '/events',
  christmasLunch: '/christmas-lunch',
} as const satisfies Record<string, AppPathname>;

/** Hub page for each landing-page group, and the dynamic route its children live on. */
export const hubs = {
  events: { href: '/events', child: '/events/[slug]' },
  menu: { href: '/menu', child: '/menu/[slug]' },
  visit: { href: '/visit', child: '/visit/[slug]' },
} as const satisfies Record<string, { href: AppPathname; child: AppPathname }>;
