import { ImageResponse } from 'next/og';

// Branded 1200×630 share image used for og:image and (via twitter-image) twitter:image,
// so links to the site no longer render with a blank preview.
export const alt = 'Sankt Knuds Brasseri & Bar — Ryesgade 29, Aarhus C';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Brand palette (hex equivalents of the OKLCH tokens — Satori has no oklch support).
const INK = '#17120e';
const PARCHMENT = '#fbf7ef';
const EMBER = '#d9824a';
const BRASS = '#bb9466';
const STONE = '#9a938a';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: INK,
        color: PARCHMENT,
        padding: '72px 80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 16, height: 16, backgroundColor: EMBER }} />
        <div
          style={{
            fontSize: 24,
            letterSpacing: 10,
            textTransform: 'uppercase',
            color: BRASS,
          }}
        >
          Aarhus · Ryesgade 29
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 132, fontWeight: 600, lineHeight: 1 }}>Sankt Knuds</div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: EMBER,
            marginTop: 14,
          }}
        >
          Brasseri &amp; Bar
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ fontSize: 30, color: 'rgba(251, 247, 239, 0.72)' }}>
          Sanktknuds er et sted at mødes
        </div>
        <div style={{ fontSize: 24, letterSpacing: 4, color: STONE }}>sanktknuds.dk</div>
      </div>
    </div>,
    { ...size },
  );
}
