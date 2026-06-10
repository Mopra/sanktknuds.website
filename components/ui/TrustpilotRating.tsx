import { getLocale } from 'next-intl/server';
import { site } from '#content';
import { TrustpilotStars } from '@/components/ui/TrustpilotStars';
import { TrustpilotWidget } from '@/components/ui/TrustpilotWidget';

type TrustpilotRatingProps = {
  className?: string;
};

/**
 * Renders the official live TrustBox badge once `trustpilot.businessUnitId` is set
 * in site settings; until then falls back to the on-brand custom stars so the hero
 * is never empty.
 */
export async function TrustpilotRating({ className }: TrustpilotRatingProps) {
  const tp = site.trustpilot;
  if (!tp) return null;

  if (tp.businessUnitId) {
    const locale = await getLocale();
    return (
      <TrustpilotWidget
        businessUnitId={tp.businessUnitId}
        reviewUrl={tp.url}
        locale={locale}
        className={className}
      />
    );
  }

  return <TrustpilotStars className={className} />;
}
