import Image from 'next/image';
import { cn } from '@/lib/cn';

type FigureProps = {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio utility for the frame, e.g. 'aspect-[4/3]'. */
  aspect?: string;
  /** next/image `sizes` hint — keep in sync with the layout width. */
  sizes?: string;
  priority?: boolean;
  /** CSS object-position, e.g. '50% 35%', when the crop needs nudging. */
  position?: string;
  /** Classes for the frame (margins, aspect overrides, ordering). */
  className?: string;
};

/**
 * Editorial image frame — sharp-cornered to match the hairline aesthetic.
 * Holds a warm placeholder tone while the photo loads.
 */
export function Figure({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  sizes = '100vw',
  priority = false,
  position,
  className,
}: FigureProps) {
  return (
    <div className={cn('relative overflow-hidden bg-ink-soft', aspect, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
