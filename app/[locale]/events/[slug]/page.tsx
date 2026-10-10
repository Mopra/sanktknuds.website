import {
  type LandingProps,
  LandingTemplate,
  landingMetadata,
  landingStaticParams,
} from '@/components/content/LandingTemplate';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams('events');
}

export function generateMetadata(props: LandingProps) {
  return landingMetadata('events', props);
}

export default function Page(props: LandingProps) {
  return <LandingTemplate hub="events" {...props} />;
}
