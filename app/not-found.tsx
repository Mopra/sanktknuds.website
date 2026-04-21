import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="da">
      <body>
        <main style={{ padding: '4rem', fontFamily: 'system-ui' }}>
          <h1>404</h1>
          <p>Siden blev ikke fundet. / Page not found.</p>
          <p>
            <Link href="/da">Til forsiden</Link> · <Link href="/en">Home</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
