import { Link } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';

/** "← Hub" link at the top of a page that lives under a hub, e.g. Selskaber. */
export function BackLink({ href, label }: { href: AppPathname; label: string }) {
  return (
    <Link
      // biome-ignore lint/suspicious/noExplicitAny: href is one of the typed static app pathnames
      href={href as any}
      className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink/65 transition-colors hover:text-ember"
    >
      <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
        ←
      </span>
      {label}
    </Link>
  );
}
