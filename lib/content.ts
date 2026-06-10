import {
  cocktailCard,
  drinksCard,
  menuSections,
  pages,
  receptions,
  tastings,
  wineCard,
} from '#content';
import type { Locale } from '@/i18n/routing';

export type ContentPage = (typeof pages)[number];
export type ContentMenuSection = (typeof menuSections)[number];
export type ContentTasting = (typeof tastings)[number];
export type ContentReception = (typeof receptions)[number];
export type WineCard = typeof wineCard;
export type WineSection = WineCard['sections'][number];
export type CocktailCard = typeof cocktailCard;
export type CocktailSection = CocktailCard['sections'][number];
export type DrinksCard = typeof drinksCard;
export type DrinksChapter = DrinksCard['chapters'][number];

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

export function getTasting(slug: string, locale: Locale): ContentTasting | undefined {
  return tastings.find((t) => t.slug === slug && t.locale === locale);
}

export function getReception(slug: string, locale: Locale): ContentReception | undefined {
  return receptions.find((r) => r.slug === slug && r.locale === locale);
}

export function getWineSections(): WineSection[] {
  return wineCard.sections;
}

export type RecommendedWine = {
  name: string;
  category: { da: string; en: string } | null;
  glass: number | null;
};

/**
 * Flattens the "House recommendations" section (the by-the-glass selection)
 * into a single list — used by CurrentPour to rotate a featured wine per load.
 */
export function getRecommendedWines(): RecommendedWine[] {
  const section = wineCard.sections.find((s) => s.id === 'recommendations');
  if (!section) return [];
  return section.groups.flatMap((group) =>
    group.wines.map((wine) => ({
      name: wine.name,
      category: group.label ?? null,
      glass: wine.glass ?? null,
    })),
  );
}

export function getCocktailCard(): CocktailCard {
  return cocktailCard;
}

export function getCocktailSections(): CocktailSection[] {
  return cocktailCard.sections;
}

export function getDrinksChapters(): DrinksChapter[] {
  return drinksCard.chapters;
}
