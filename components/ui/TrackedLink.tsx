'use client';

import type { AnchorHTMLAttributes } from 'react';
import { type ConversionEvent, trackEvent } from '@/lib/analytics';

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Required: this is always a real navigation, never a button in disguise. */
  href: string;
  event: ConversionEvent;
  eventParams?: Record<string, unknown>;
};

/**
 * A plain <a> that reports a conversion on click. Navigation is never blocked or
 * delayed — the event is fired and the browser follows the href as it normally would.
 */
export function TrackedLink({
  href,
  event,
  eventParams,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
