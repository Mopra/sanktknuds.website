import { getLocale, getTranslations } from 'next-intl/server';
import { site } from '#content';
import { CurrentPour } from '@/components/content/CurrentPour';
import { HoursList } from '@/components/content/HoursList';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { Link } from '@/i18n/navigation';
import { routes } from '@/i18n/routing';
import { getRecommendedWines } from '@/lib/content';
import { FooterMarque } from './FooterMarque';

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');

  const year = new Date().getFullYear();
  const recommendedWines = getRecommendedWines();

  return (
    <footer className="mt-32 border-t border-ink/10 bg-bone-dim">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <CurrentPour locale={locale} wines={recommendedWines} />

        <div className="mt-20 grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="font-display text-2xl tracking-tight text-ink">Sankt Knuds</h2>
            <p className="mt-3 text-sm text-ink/70">{site.tagline[locale as 'da' | 'en']}</p>
            <SocialLinks
              showLabel
              className="mt-6"
              linkClassName="text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
              iconClassName="h-4 w-4"
            />
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-stone">{t('visit')}</h3>
            <address className="mt-4 not-italic text-sm leading-relaxed text-ink/80">
              {site.address.streetAddress}
              {site.address.addressDetail ? `, ${site.address.addressDetail}` : ''}
              <br />
              {site.address.postalCode} {site.address.locality}
              <br />
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-ember">
                {site.phone}
              </a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-ember">
                {site.email}
              </a>
            </address>
            <a
              href="https://www.findsmiley.dk/1579205"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block border-b border-moss/40 pb-0.5 text-xs uppercase tracking-[0.2em] text-moss transition-colors hover:border-moss hover:text-moss/80"
            >
              {t('smiley')}
            </a>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-stone">{t('hours')}</h3>
            <HoursList locale={locale as 'da' | 'en'} className="mt-4 text-sm" />
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs uppercase tracking-[0.3em] text-stone">{t('sitemap')}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={routes.menu} className="text-ink/75 hover:text-ink">
                  {nav('menu')}
                </Link>
              </li>
              <li>
                <Link href={routes.cocktails} className="text-ink/75 hover:text-ink">
                  {nav('cocktails')}
                </Link>
              </li>
              <li>
                <Link href={routes.drinks} className="text-ink/75 hover:text-ink">
                  {nav('drinks')}
                </Link>
              </li>
              <li>
                <Link href={routes.story} className="text-ink/75 hover:text-ink">
                  {nav('story')}
                </Link>
              </li>
              <li>
                <Link href={routes.visit} className="text-ink/75 hover:text-ink">
                  {nav('visit')}
                </Link>
              </li>
              <li>
                <Link href={routes.events} className="text-ink/75 hover:text-ink">
                  {nav('events')}
                </Link>
              </li>
              <li>
                <Link href={routes.book} className="text-ink/75 hover:text-ink">
                  {nav('book')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <FooterMarque className="mt-20" />

        <p className="mt-12 text-[0.625rem] uppercase tracking-[0.3em] text-ink/40">
          © {year} {site.name}
          {site.cvr ? ` · CVR ${site.cvr}` : ''}
        </p>
      </div>
    </footer>
  );
}
