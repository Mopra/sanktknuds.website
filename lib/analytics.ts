// Thin wrapper over gtag.js (loaded in app/[locale]/layout.tsx).
//
// The events below are the ones worth marking as *key events* in the GA4 UI —
// for a restaurant, a phone tap or a directions click is a booking intent just
// as much as the reservation widget is.

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void;
  }
}

export type ConversionEvent =
  | 'book_click'
  | 'phone_click'
  | 'directions_click'
  | 'menu_pdf_download'
  | 'lunch_menu_pdf_download';

export function trackEvent(name: ConversionEvent, params?: Record<string, unknown>) {
  // Never let a blocked/absent analytics script break a link the guest just tapped.
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
