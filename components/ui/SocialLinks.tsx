import { site } from '#content';
import { cn } from '@/lib/cn';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const PLATFORMS = [
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
] as const;

type SocialLinksProps = {
  /** Classes for the wrapping list. */
  className?: string;
  /** Classes applied to each link. */
  linkClassName?: string;
  iconClassName?: string;
  /** Render a visible text label next to each icon. */
  showLabel?: boolean;
};

export function SocialLinks({
  className,
  linkClassName,
  iconClassName,
  showLabel = false,
}: SocialLinksProps) {
  const items = PLATFORMS.filter(({ key }) => site.social[key]);
  if (items.length === 0) return null;

  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {items.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={site.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              'inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
              linkClassName,
            )}
          >
            <Icon className={cn('h-5 w-5', iconClassName)} />
            {showLabel ? <span>{label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
