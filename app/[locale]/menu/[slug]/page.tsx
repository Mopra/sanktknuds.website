import {
  type LandingProps,
  LandingTemplate,
  landingMetadata,
  landingStaticParams,
} from '@/components/content/LandingTemplate';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams('menu');
}

export function generateMetadata(props: LandingProps) {
  return landingMetadata('menu', props);
}

export default function Page(props: LandingProps) {
  return <LandingTemplate hub="menu" {...props} />;
}
