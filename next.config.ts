import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Build Velite content (the `#content` module) as part of the Next.js
// lifecycle so `.velite` is always generated for both dev and build.
// Turbopack does not run webpack plugins, so we kick off Velite here.
const isDev = process.argv.includes('dev');
const isBuild = process.argv.includes('build');
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  const { build } = await import('velite');
  await build({ watch: isDev, clean: !isDev });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // 90 for the hero photography; 75 (Next's default) for everything else
    qualities: [75, 90],
  },
};

export default withNextIntl(nextConfig);
