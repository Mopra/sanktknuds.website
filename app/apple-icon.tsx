import { ImageResponse } from 'next/og';

// iOS ignores SVG/manifest icons for the home-screen, so generate a 180×180 PNG.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const INK = '#17120e';
const EMBER = '#d9824a';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: INK,
        color: EMBER,
        fontSize: 96,
        fontWeight: 600,
        letterSpacing: -2,
      }}
    >
      SK
    </div>,
    { ...size },
  );
}
