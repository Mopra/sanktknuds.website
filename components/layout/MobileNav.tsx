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
        className="flex h-10 w-10 items-center justify-center border border-ink/20 text-ink/80 transition-colors hover:text-ink md:hidden"
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm" />
        <Drawer.Content
          className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col bg-bone text-ink outline-none"
          aria-describedby={undefined}
        >
          <Drawer.Title className="sr-only">Menu</Drawer.Title>
          <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
            <span className="text-xs uppercase tracking-[0.3em] text-stone">
              {locale.toUpperCase()}
            </span>
            <Drawer.Close
              aria-label="Close menu"
              className="text-xs uppercase tracking-[0.2em] text-ink"
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
                className="border-b border-ink/10 py-4 font-display text-2xl tracking-tight text-ink hover:text-ember"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-ink/10 p-6">
            <BookingButton size="lg" className="w-full" />
            <SocialLinks
              showLabel
              className="mt-6 justify-center"
              linkClassName="text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-ink"
              iconClassName="h-4 w-4"
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
