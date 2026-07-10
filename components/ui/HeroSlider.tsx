'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

export type HeroSlide = {
  src: string;
  alt: string;
  /** Tailwind object-position utility, e.g. object-[center_40%] */
  position?: string;
};

/** How long each slide holds before the next one fades in. */
const SLIDE_MS = 6000;

type HeroSliderProps = {
  slides: HeroSlide[];
  className?: string;
};

export function HeroSlider({ slides, className }: HeroSliderProps) {
  const t = useTranslations('hero');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (paused || reduced || slides.length < 2) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduced, slides.length]);

  return (
    <section
      aria-label={t('label')}
      aria-roledescription="carousel"
      className={className}
      // Keyboard focus pauses autoplay so a dot can't move out from under the user.
      // Hover deliberately does not — the slideshow keeps running.
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[60vh] overflow-hidden bg-ink md:h-[75vh]">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none',
              i === index ? 'opacity-100' : 'opacity-0',
            )}
          >
            {/* Slow settle — the image eases down to rest while it fades in */}
            <div
              className={cn(
                'relative h-full w-full transition-transform duration-[8000ms] ease-out motion-reduce:transition-none',
                i === index ? 'scale-100' : 'scale-[1.04]',
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : 'lazy'}
                quality={90}
                sizes="100vw"
                className={cn('object-cover', slide.position ?? 'object-center')}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation sits under the photograph, on the page, aligned with the type above */}
      {slides.length > 1 ? (
        <div className="flex items-center gap-3 px-6 py-6 md:gap-4 md:px-10 md:py-7 lg:px-16">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <button
                key={slide.src}
                type="button"
                aria-label={t('dot', { n: i + 1 })}
                aria-current={active}
                onClick={() => setIndex(i)}
                className="group flex h-8 items-center focus-visible:outline-none"
              >
                <span
                  className={cn(
                    'block h-2.5 overflow-hidden rounded-full transition-all duration-500 ease-out group-focus-visible:ring-2 group-focus-visible:ring-ember group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-bone',
                    active
                      ? 'w-16 bg-ink/20 md:w-20'
                      : 'w-2.5 bg-ink/25 group-hover:bg-ink/50 group-hover:scale-110',
                  )}
                >
                  {active ? (
                    <span
                      // Restart the fill on every slide change
                      key={index}
                      className={cn(
                        'block h-full rounded-full bg-ink',
                        reduced ? 'w-full' : 'w-0 animate-hero-progress',
                      )}
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
