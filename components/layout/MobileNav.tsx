'use client';

import { useState } from 'react';
import { Drawer } from 'vaul';
import { BookingButton } from '@/components/ui/BookingButton';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { Link } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';

type NavLink = { href: AppPathname; label: string };

export function MobileNav({ links, locale }: { links: readonly NavLink[]; locale: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
      <Drawer.Trigger
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center border border-stone/30 text-parchment/80 transition-colors hover:text-parchment md:hidden"
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Drawer.Content
          className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col bg-ink outline-none"
          aria-describedby={undefined}
        >
          <Drawer.Title className="sr-only">Menu</Drawer.Title>
          <div className="flex items-center justify-between border-b border-stone/15 px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-parchment/60">
              {locale.toUpperCase()}
            </span>
            <Drawer.Close
              aria-label="Close menu"
              className="font-mono text-xs uppercase tracking-[0.2em]"
            >
              ✕
            </Drawer.Close>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-stone/10 py-4 font-display text-2xl tracking-tight text-parchment hover:text-ember"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-stone/15 p-6">
            <BookingButton size="lg" className="w-full" />
            <SocialLinks
              showLabel
              className="mt-6 justify-center"
              linkClassName="font-mono text-xs uppercase tracking-[0.2em] text-parchment/70 hover:text-parchment"
              iconClassName="h-4 w-4"
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
