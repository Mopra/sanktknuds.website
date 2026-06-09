import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routes } from '@/i18n/routing';
import { BookingButton } from '@/components/ui/BookingButton';
import { LocaleToggle } from '@/components/ui/LocaleToggle';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { MobileNav } from '@/components/layout/MobileNav';
import { Masthead } from '@/components/layout/Masthead';

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations('nav');

  const links = [
    { href: routes.menu, label: t('menu') },
    { href: routes.wine, label: t('wine') },
    { href: routes.story, label: t('story') },
    { href: routes.visit, label: t('visit') },
    { href: routes.events, label: t('events') },
  ] as const;

  return (
    <>
      <Masthead />
      <header className="sticky top-0 z-40 border-b border-stone/15 bg-ink/80 backdrop-blur supports-[backdrop-filter]:bg-ink/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link
            href={routes.home}
            className="font-display text-lg tracking-tight hover:text-ember"
            aria-label="Sankt Knuds"
          >
            Sankt Knuds
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-parchment/70 transition-colors hover:text-parchment"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LocaleToggle />
            <div className="hidden md:block">
              <SocialLinks linkClassName="text-parchment/70 hover:text-parchment" />
            </div>
            <div className="hidden md:block">
              <BookingButton />
            </div>
            <MobileNav links={links} locale={locale} />
          </div>
        </div>
      </header>
    </>
  );
}
