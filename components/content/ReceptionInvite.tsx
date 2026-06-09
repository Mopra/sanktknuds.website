import { useTranslations } from 'next-intl';
import { site } from '#content';
import type { Locale } from '@/i18n/routing';
import { getReception } from '@/lib/content';
import { buildEventSchema } from '@/lib/seo';

const MAPS_URL = 'https://maps.app.goo.gl/o2skFDbEp1yKy1Rq8';

export function ReceptionInvite({ locale }: { locale: Locale }) {
  const t = useTranslations('reception');
  const reception = getReception('reception', locale);
  if (!reception) return null;

  const place = `${site.address.streetAddress} · ${site.address.postalCode} ${site.address.locality}`;
  const schema = buildEventSchema(site, reception, locale);

  const details = [
    { label: t('date'), value: reception.dateLabel },
    { label: t('time'), value: reception.timeLabel },
    { label: t('place'), value: place },
  ];

  return (
    <section className="relative overflow-hidden border-t border-ember/25 bg-ink-soft">
      {/* Warm ember wash — marks this out as the announcement */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 80% at 15% 0%, color-mix(in oklch, var(--color-ember) 12%, transparent), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="max-w-2xl">
          <div className="h-px w-16 bg-ember" />
          {reception.eyebrow ? (
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.35em] text-ember/80">
              {reception.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-5 font-display text-3xl leading-[1.05] tracking-tight text-parchment md:text-4xl lg:text-5xl">
            {reception.title}
          </h2>
          {reception.description ? (
            <p className="mt-6 text-lg leading-relaxed text-parchment/70">
              {reception.description}
            </p>
          ) : null}
        </div>

        {/* Key facts — hairline-separated, masthead-style */}
        <dl className="mt-12 grid grid-cols-1 divide-y divide-stone/15 border-y border-stone/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {details.map((detail) => (
            <div key={detail.label} className="py-6 sm:px-8 sm:py-7 sm:first:pl-0 sm:last:pr-0">
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-stone">
                {detail.label}
              </dt>
              <dd className="mt-3 font-display text-xl tracking-tight text-parchment md:text-2xl">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Invitation */}
        <div
          className="prose prose-invert mt-12 max-w-2xl"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
          dangerouslySetInnerHTML={{ __html: reception.body }}
        />

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          {reception.closing ? (
            <p className="font-display text-2xl tracking-tight text-ember md:text-3xl">
              {reception.closing}
            </p>
          ) : (
            <span />
          )}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-parchment"
          >
            {t('directions')}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD needs raw injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
