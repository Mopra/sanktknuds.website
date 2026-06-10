'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

// Official TrustBox "Micro Star" template — stars only, no surrounding chrome.
// Other templates: Micro Combo 5419b6ffb0d04a076446a9af · Micro TrustScore 5419b637fa0340045cd0c936.
const TEMPLATE_ID = '5419b732fbfb950b10de65e5';
const BOOTSTRAP_SRC = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (el: HTMLElement | null, forceReload?: boolean) => void;
    };
  }
}

type TrustpilotWidgetProps = {
  businessUnitId: string;
  reviewUrl: string;
  /** App locale ('da' | 'en'); mapped to a Trustpilot locale tag. */
  locale: string;
  className?: string;
};

export function TrustpilotWidget({
  businessUnitId,
  reviewUrl,
  locale,
  className,
}: TrustpilotWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);

  // The bootstrap script auto-renders any `.trustpilot-widget` present at load,
  // but on client navigation it won't re-scan — so render explicitly on mount.
  useEffect(() => {
    if (window.Trustpilot && ref.current) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  const tpLocale = locale === 'da' ? 'da-DK' : 'en-US';

  return (
    <>
      <Script src={BOOTSTRAP_SRC} strategy="afterInteractive" />
      <div
        ref={ref}
        className={cn('trustpilot-widget', className)}
        data-locale={tpLocale}
        data-template-id={TEMPLATE_ID}
        data-businessunit-id={businessUnitId}
        data-style-height="24px"
        data-style-width="100%"
        data-theme="light"
      >
        <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
          Trustpilot
        </a>
      </div>
    </>
  );
}
