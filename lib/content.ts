import { pages, menuSections } from '#content';
import type { Locale } from '@/i18n/routing';

export type ContentPage = (typeof pages)[number];
export type ContentMenuSection = (typeof menuSections)[number];

export function getPage(slug: string, locale: Locale): ContentPage {
  const page = pages.find((p) => p.slug === slug && p.locale === locale);
  if (!page) {
    throw new Error(`Missing page content: ${slug}.${locale}.md`);
  }
  return page;
}

export function getMenuSections(locale: Locale): ContentMenuSection[] {
  return menuSections
    .filter((s) => s.locale === locale)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
