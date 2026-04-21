import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">404</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight">{t('title')}</h1>
      <p className="mt-6 text-parchment/70">{t('description')}</p>
      <Link
        href="/"
        className="mt-10 inline-block border-b border-ember/50 pb-1 font-mono text-sm uppercase tracking-[0.2em] text-ember hover:border-ember"
      >
        {t('home')}
      </Link>
    </div>
  );
}
