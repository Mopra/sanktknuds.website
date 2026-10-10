import type { ReactNode } from 'react';
import { site } from '#content';
import { TrackedLink } from '@/components/ui/TrackedLink';

export const phoneHref = `tel:${site.phone.replace(/\s/g, '')}`;

/** Tap-to-call link that reports a phone_click. Shows the number unless given children. */
export function PhoneLink({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <TrackedLink event="phone_click" href={phoneHref} className={className}>
      {children ?? site.phone}
    </TrackedLink>
  );
}
