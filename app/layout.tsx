import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getSiteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  // Resolves relative metadata URLs (incl. the file-convention OG/Twitter images and the
  // not-found route) to the production domain instead of localhost.
  metadataBase: new URL(getSiteUrl()),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
