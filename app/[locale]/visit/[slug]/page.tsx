import {
  type LandingProps,
  LandingTemplate,
  landingMetadata,
  landingStaticParams,
} from '@/components/content/LandingTemplate';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams('visit');
}

export function generateMetadata(props: LandingProps) {
  return landingMetadata('visit', props);
}

export default function Page(props: LandingProps) {
  return <LandingTemplate hub="visit" {...props} />;
}
