import { getLocale, getTranslations } from 'next-intl/server';
import { site } from '#content';
import { LocaleToggle } from '@/components/ui/LocaleToggle';
import { getPage } from '@/lib/content';
import type { Locale } from '@/i18n/routing';

export async function PreLaunchOverlay() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('preLaunch');
  const page = getPage('home', locale);

  const openingLabel = site.openingMonth?.[locale];
  const instagramUrl = site.social.instagram;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pre-launch-heading"
      className="fixed inset-0 z-[60]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ink/70 backdrop-blur-lg backdrop-saturate-150"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
      >
        <div className="absolute -left-32 -top-40 h-[40rem] w-[40rem] rounded-full bg-ember/20 blur-[120px]" />
        <div className="absolute -right-40 -bottom-40 h-[44rem] w-[44rem] rounded-full bg-brass/15 blur-[140px]" />
        <div className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-moss/10 blur-[120px]" />
      </div>

      <div className="absolute inset-0 overflow-y-auto">
        <div className="absolute right-5 top-5 z-10 md:right-10 md:top-10">
          <LocaleToggle />
        </div>

        <article className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-5 pb-14 pt-20 sm:px-6 sm:py-24">
        {page.eyebrow ? (
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-ember/80 sm:text-xs">
            {page.eyebrow}
          </p>
        ) : null}

        <h1
          id="pre-launch-heading"
          className="mt-3 font-display text-[2.5rem] leading-[1.05] tracking-tight sm:mt-4 sm:text-5xl md:text-7xl"
        >
          {page.title}
        </h1>

        {page.description ? (
          <p className="mt-5 text-base text-parchment/80 sm:mt-6 sm:text-lg">{page.description}</p>
        ) : null}

        <div
          className="prose prose-invert mt-8 max-w-none sm:mt-10"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
          dangerouslySetInnerHTML={{ __html: page.body }}
        />

        <div className="mt-10 border-t border-stone/20 pt-8 sm:mt-16 sm:pt-10">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-ember/80 sm:text-[0.6875rem]">
            {t('preamble')}
          </p>
          <p className="mt-3 font-display text-[2.25rem] tracking-tight sm:text-4xl md:text-5xl">
            {openingLabel}
          </p>
          {instagramUrl ? (
            <p className="mt-5 text-sm text-parchment/60 sm:mt-6">
              {t('standby')}{' '}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block whitespace-nowrap border-b border-ember/50 pb-0.5 font-mono text-xs uppercase tracking-[0.2em] text-ember hover:border-ember"
              >
                {t('follow')}
              </a>
            </p>
          ) : null}
        </div>
      </article>
      </div>
    </div>
  );
}
