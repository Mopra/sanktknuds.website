import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routes } from '@/i18n/routing';
import { site } from '#content';
import { FooterMarque } from './FooterMarque';
import { CurrentPour } from '@/components/content/CurrentPour';
import { HoursList } from '@/components/content/HoursList';
import { SocialLinks } from '@/components/ui/SocialLinks';

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');

  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-stone/15 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <CurrentPour locale={locale} />

        <div className="mt-20 grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="font-display text-2xl tracking-tight">Sankt Knuds</h2>
            <p className="mt-3 text-sm text-parchment/70">{site.tagline[locale as 'da' | 'en']}</p>
            <SocialLinks
              showLabel
              className="mt-6"
              linkClassName="font-mono text-xs uppercase tracking-[0.2em] text-parchment/70 hover:text-parchment"
              iconClassName="h-4 w-4"
            />
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
              {t('visit')}
            </h3>
            <address className="mt-4 not-italic text-sm leading-relaxed text-parchment/80">
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
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
              {t('hours')}
            </h3>
            <HoursList locale={locale as 'da' | 'en'} className="mt-4 text-sm" />
          </div>

          <nav aria-label="Footer">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
              {t('sitemap')}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={routes.menu} className="text-parchment/80 hover:text-parchment">
                  {nav('menu')}
                </Link>
              </li>
              <li>
                <Link href={routes.story} className="text-parchment/80 hover:text-parchment">
                  {nav('story')}
                </Link>
              </li>
              <li>
                <Link href={routes.visit} className="text-parchment/80 hover:text-parchment">
                  {nav('visit')}
                </Link>
              </li>
              <li>
                <Link href={routes.events} className="text-parchment/80 hover:text-parchment">
                  {nav('events')}
                </Link>
              </li>
              <li>
                <Link href={routes.book} className="text-parchment/80 hover:text-parchment">
                  {nav('book')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <FooterMarque className="mt-20" />

        <p className="mt-12 font-mono text-[0.625rem] uppercase tracking-[0.3em] text-parchment/40">
          © {year} {site.name}
          {site.cvr ? ` · CVR ${site.cvr}` : ''}
        </p>
      </div>
    </footer>
  );
}
