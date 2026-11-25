import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { LiquidButton } from './LiquidButton';
import { SiteContent } from '../data/siteContent';
import { BRAND_LINKS, HERO_MEDIA } from '../data/brandLinks';
import doLessFullBlessImg from '../assets/do-less-full-bless.png';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollStageProps {
  content: SiteContent;
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const norm = (v: number, start: number, end: number) => clamp((v - start) / (end - start));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export const HeroScrollStage: React.FC<HeroScrollStageProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const curtainIntroRef = useRef<HTMLDivElement | null>(null);
  const scrollCueRef = useRef<HTMLButtonElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);

  const [isMobileVideo] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const section = sectionRef.current;
    const vid = videoRef.current;
    if (!section) return;

    const isMobile = window.matchMedia('(max-width: 768px), (hover: none)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let targetProgress = reducedMotion ? 0.96 : 0;
    let shownProgress = targetProgress;
    let lastSeekTime = 0;
    let inView = true;

    const syncVideoTime = (p: number, force = false) => {
      if (!vid) return;
      if (vid.readyState >= 1 && vid.duration && Number.isFinite(vid.duration)) {
        const now = performance.now();
        if (!force && isMobile && now - lastSeekTime < 28) return;
        const desired = clamp(p, 0, 1) * Math.max(vid.duration - 0.04, 0.1);
        const minDelta = isMobile ? 0.025 : 0.014;
        if ((force || !vid.seeking) && Math.abs(vid.currentTime - desired) > minDelta) {
          try {
            vid.currentTime = desired;
            lastSeekTime = now;
          } catch {
            // ignore transient seek exceptions while buffering
          }
        }
      }
    };

    const applyVisuals = (p: number, forceSeek = false) => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clamp(p, 0.015, 1)})`;
      }

      syncVideoTime(p, forceSeek);

      const curtainFade = 1 - smoothstep(norm(p, 0.01, 0.13));
      const cueFade = 1 - smoothstep(norm(p, 0.005, 0.10));
      if (curtainIntroRef.current) {
        curtainIntroRef.current.style.opacity = `${curtainFade}`;
        curtainIntroRef.current.style.transform = `translate3d(0, ${-(1 - curtainFade) * 32}px, 0)`;
        curtainIntroRef.current.style.pointerEvents = curtainFade > 0.25 ? 'auto' : 'none';
      }
      if (scrollCueRef.current) {
        scrollCueRef.current.style.opacity = `${cueFade}`;
        scrollCueRef.current.style.transform = `translate3d(-50%, ${(1 - cueFade) * 20}px, 0)`;
        scrollCueRef.current.style.pointerEvents = cueFade > 0.25 ? 'auto' : 'none';
      }

      if (heroOverlayRef.current) {
        const reveal = smoothstep(norm(p, 0.78, 0.92));
        heroOverlayRef.current.style.opacity = `${reveal}`;
        heroOverlayRef.current.style.transform = `translate3d(0, ${(1 - reveal) * 24}px, 0)`;
        heroOverlayRef.current.style.pointerEvents = reveal > 0.45 ? 'auto' : 'none';
      }
    };

    const onVideoReady = () => {
      applyVisuals(shownProgress, true);
    };

    if (vid) {
      vid.pause();
      vid.addEventListener('loadedmetadata', onVideoReady);
      vid.addEventListener('loadeddata', onVideoReady);
    }

    applyVisuals(shownProgress, true);

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onToggle: (self) => {
        inView = self.isActive || self.progress < 1;
      },
      onUpdate: (self) => {
        inView = true;
        targetProgress = reducedMotion ? 0.96 : self.progress;
      },
    });

    const lerpFactor = isMobile ? 0.24 : 0.15;

    const tick = () => {
      const diff = targetProgress - shownProgress;
      if (Math.abs(diff) > 0.0005) {
        shownProgress += diff * lerpFactor;
        applyVisuals(shownProgress);
      } else if (inView && vid && !vid.seeking && vid.readyState >= 1 && vid.duration) {
        const desired = clamp(shownProgress, 0, 1) * Math.max(vid.duration - 0.04, 0.1);
        if (Math.abs(vid.currentTime - desired) > 0.04) {
          syncVideoTime(shownProgress, true);
        } else if (targetProgress >= 1) {
          inView = false;
        }
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      if (vid) {
        vid.removeEventListener('loadedmetadata', onVideoReady);
        vid.removeEventListener('loadeddata', onVideoReady);
      }
    };
  }, []);

  const scrollPastCurtain = () => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.offsetTop;
    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    window.scrollTo({
      top: top + scrollable * 0.28,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-scroll-track"
      aria-label="Hy·Me·Up! Curtain Reveal and Product Evolution"
    >
      <div className="hero-scroll-stage">
        <div className="hero-video-layer">
          <video
            ref={videoRef}
            className="hero-scrub-video"
            src={isMobileVideo ? HERO_MEDIA.mobileVideoSrc : HERO_MEDIA.videoSrc}
            poster={HERO_MEDIA.posterSrc}
            muted
            playsInline
            preload="auto"
          />
        </div>

        <div ref={curtainIntroRef} className="hero-curtain-intro">
          <div className="hero-curtain-clean">
            <h1 className="hero-curtain-heading">{content.hero.curtainTitle}</h1>
          </div>
        </div>

        <button
          ref={scrollCueRef}
          type="button"
          className="hero-scroll-cue"
          onClick={scrollPastCurtain}
        >
          <span>{content.hero.scrollCue}</span>
          <ArrowDown size={14} />
        </button>

        <div ref={heroOverlayRef} className="hero-final-overlay">
          <div className="hero-final-clean">
            <p className="hero-final-eyebrow">{content.debutProduct.supportLine}</p>
            <h2 className="hero-final-title">
              HYBRID COMPLETE
              <br />
              SUNSCREEN
            </h2>
            <img
              src={doLessFullBlessImg}
              alt={content.debutProduct.tagline}
              className="hero-final-tagline-img"
              draggable={false}
            />
            <div className="hero-final-actions">
              <LiquidButton
                href={BRAND_LINKS.shopee}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                <span>{content.hero.shopNow}</span>
                <ArrowUpRight size={17} />
              </LiquidButton>
            </div>
          </div>
        </div>

        <div className="hero-timeline-track" aria-hidden="true">
          <div ref={barRef} className="hero-timeline-bar" />
        </div>
      </div>
    </section>
  );
};
