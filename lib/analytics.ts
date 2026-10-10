// Thin wrapper over gtag.js and the Meta Pixel (both loaded in app/[locale]/layout.tsx).
//
// The events below are the ones worth marking as *key events* in the GA4 UI.
// For a restaurant, a phone tap or a directions click is a booking intent just
// as much as the reservation widget is.

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void;
    fbq?: (
      command: 'track' | 'trackCustom',
      name: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export type ConversionEvent =
  | 'book_click'
  | 'phone_click'
  | 'inquiry_click'
  | 'directions_click'
  | 'menu_pdf_download'
  | 'lunch_menu_pdf_download'
  | 'bar_snacks_pdf_download';

// Meta standard events, so ads can optimise on them. Anything else goes as a custom event.
const metaStandardEvents: Partial<Record<ConversionEvent, string>> = {
  book_click: 'Lead',
  phone_click: 'Contact',
  inquiry_click: 'Contact',
  directions_click: 'FindLocation',
};

export function trackEvent(name: ConversionEvent, params?: Record<string, unknown>) {
  // Never let a blocked/absent analytics script break a link the guest just tapped.
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
  if (typeof window.fbq === 'function') {
    const standard = metaStandardEvents[name];
    if (standard) window.fbq('track', standard, params);
    else window.fbq('trackCustom', name, params);
  }
}
