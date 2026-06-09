import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sankt Knuds Brasseri & Bar',
    short_name: 'Sankt Knuds',
    description: 'Brasseri & bar på Ryesgade 29 midt i Aarhus C.',
    start_url: '/da',
    display: 'standalone',
    background_color: '#17120e',
    theme_color: '#17120e',
    lang: 'da',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
