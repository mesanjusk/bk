'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import MediaFrame from '../ui/MediaFrame.jsx';
import { content } from '../../data/content.js';
import { fetchSettings } from '../../api/client.js';

const HeroScene = dynamic(() => import('../three/HeroScene.jsx'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-xl2 bg-sage-100/40" />,
});

export default function Hero() {
  const { eyebrow, title, subtitle, ctaPrimary, ctaSecondary } = content.hero;
  const [heroMedia, setHeroMedia] = useState(null);
  const textRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    fetchSettings()
      .then((settings) => {
        if (isMounted && settings.heroMediaUrl) {
          setHeroMedia({ type: settings.heroMediaType, src: settings.heroMediaUrl });
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!textRef.current) return undefined;
    const targets = textRef.current.querySelectorAll('[data-reveal]');
    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
    );
    return () => tween.kill();
  }, []);

  return (
    <section className="flex min-h-[90vh] items-center bg-gradient-to-b from-sand to-cream">
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div ref={textRef}>
            <p data-reveal className="text-sm font-medium uppercase tracking-[0.3em] text-gold-600">
              {eyebrow}
            </p>
            <span data-reveal className="mt-4 block h-px w-16 bg-gold-400/60" />
            <h1 data-reveal className="mt-6 max-w-xl text-4xl font-semibold leading-tight text-sage-900 sm:text-5xl">
              {title}
            </h1>
            <p data-reveal className="mt-6 max-w-md text-base text-sage-700">{subtitle}</p>
            <div data-reveal className="mt-10 flex gap-4">
              <Button to={ctaPrimary.to}>{ctaPrimary.label}</Button>
              <Button to={ctaSecondary.to} variant="secondary">
                {ctaSecondary.label}
              </Button>
            </div>
          </div>

          {heroMedia ? (
            <MediaFrame
              type={heroMedia.type}
              src={heroMedia.src}
              alt={title}
              aspect="aspect-[4/3]"
              className="hidden ring-1 ring-gold-400/30 md:block"
            />
          ) : (
            <div className="hidden aspect-[4/3] w-full md:block">
              <HeroScene />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
