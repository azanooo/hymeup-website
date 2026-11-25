import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { LiquidButton } from './LiquidButton';
import { BRAND_IMAGES, ModalTarget, SiteContent } from '../data/siteContent';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalShowcaseProps {
  content: SiteContent;
  onOpenModal: (target: ModalTarget) => void;
}

interface HorizontalCardData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isCutout?: boolean;
  tags: string[];
  metrics: { label: string; value: number }[];
  modal: ModalTarget;
}

export const HorizontalShowcase: React.FC<HorizontalShowcaseProps> = ({
  content,
  onOpenModal,
}) => {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  const hs = content.horizontalSection;
  const [m1, m2, m3] = hs.pillarMetrics;

  const cards: HorizontalCardData[] = [
    ...content.pillarSlides.map((pillar, i) => ({
      id: pillar.id,
      title: pillar.leftTitle,
      subtitle: pillar.cardDesc,
      image: pillar.leftImage,
      tags: pillar.cardTags,
      metrics: [
        { label: m1, value: i === 0 ? 100 : 88 },
        { label: m2, value: i === 1 || i === 3 ? 96 : 86 },
        { label: m3, value: 94 },
      ],
      modal: { kind: 'pillar', id: pillar.id } as ModalTarget,
    })),
    {
      id: '3in1-morning-step',
      title: hs.routineCard.title,
      subtitle: hs.routineCard.desc,
      image: BRAND_IMAGES.flatlayTubes,
      tags: hs.routineCard.tags,
      metrics: [
        { label: hs.routineCard.metrics[0], value: 100 },
        { label: hs.routineCard.metrics[1], value: 95 },
        { label: hs.routineCard.metrics[2], value: 98 },
      ],
      modal: { kind: 'routine', id: '3in1' },
    },
    {
      id: 'cream-gel-sensory',
      title: hs.textureCard.title,
      subtitle: hs.textureCard.desc,
      image: BRAND_IMAGES.handCreamDrop,
      isCutout: true,
      tags: hs.textureCard.tags,
      metrics: [
        { label: hs.textureCard.metrics[0], value: 98 },
        { label: hs.textureCard.metrics[1], value: 100 },
        { label: hs.textureCard.metrics[2], value: 94 },
      ],
      modal: { kind: 'ingredient', id: 'cream-gel-sensory' },
    },
    {
      id: 'full-10-actives',
      title: hs.formulaCard.title,
      subtitle: hs.formulaCard.desc,
      image: BRAND_IMAGES.smilingGlowTube,
      tags: hs.formulaCard.tags,
      metrics: [
        { label: hs.formulaCard.metrics[0], value: 96 },
        { label: hs.formulaCard.metrics[1], value: 94 },
        { label: hs.formulaCard.metrics[2], value: 97 },
      ],
      modal: { kind: 'all-ingredients', id: 'full-sheet' },
    },
  ];

  useEffect(() => {
    const pinEl = pinRef.current;
    const trackEl = trackRef.current;
    if (!pinEl || !trackEl) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const getDistance = () =>
        Math.max(trackEl.scrollWidth - window.innerWidth + 96, 200);

      const tween = gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          start: 'top top',
          end: () => `+=${Math.round(getDistance() * 1.4)}`,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${Math.max(self.progress, 0.04)})`;
            }
            const idx = Math.min(
              cards.length - 1,
              Math.max(0, Math.round(self.progress * (cards.length - 1)))
            );
            setActiveCardIdx(idx);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add('(max-width: 768px)', () => {
      const onTrackScroll = () => {
        const maxScroll = Math.max(trackEl.scrollWidth - trackEl.clientWidth, 1);
        const progress = Math.min(1, Math.max(0, trackEl.scrollLeft / maxScroll));
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${Math.max(progress, 0.04)})`;
        }
        const idx = Math.min(
          cards.length - 1,
          Math.max(0, Math.round(progress * (cards.length - 1)))
        );
        setActiveCardIdx(idx);
      };

      onTrackScroll();
      trackEl.addEventListener('scroll', onTrackScroll, { passive: true });
      return () => {
        trackEl.removeEventListener('scroll', onTrackScroll);
      };
    });

    return () => {
      mm.revert();
    };
  }, [cards.length, content.lang]);

  return (
    <section
      id="spectrum"
      className="hscroll-section sky-limbo-continuation"
      aria-label={hs.heading}
    >
      {/* PINNED HORIZONTAL STAGE — Heading sits snugly right above the photo cards */}
      <div ref={pinRef} className="hscroll-pin-wrap">
        <div className="hscroll-stage-header container">
          <h2 className="hscroll-heading">{hs.heading}</h2>
          <span className="hscroll-stage-count" aria-live="polite">
            0{activeCardIdx + 1} / 0{cards.length}
          </span>
        </div>

        <div ref={trackRef} className="hscroll-track">
          {cards.map((card) => (
            <article
              key={card.id}
              className="hscroll-card liquid-glass-card"
              onClick={() => onOpenModal(card.modal)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenModal(card.modal);
                }
              }}
            >
              <div className={`hscroll-card-media ${card.isCutout ? 'is-cutout' : ''}`}>
                <img src={card.image} alt={card.title} />
              </div>

              <div className="hscroll-card-body">
                <h3 className="hscroll-card-title">{card.title}</h3>
                <p className="hscroll-card-sub">{card.subtitle}</p>

                <div className="hscroll-metrics">
                  {card.metrics.map((m) => (
                    <div key={m.label} className="hscroll-metric-row">
                      <span className="hscroll-metric-label">{m.label}</span>
                      <div className="hscroll-metric-track">
                        <div
                          className="hscroll-metric-fill"
                          style={{ width: `${m.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hscroll-card-footer">
                  <div className="hscroll-card-tags">
                    {card.tags.map((tag) => (
                      <span key={tag} className="lg-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <LiquidButton
                    variant="glass"
                    size="sm"
                    showSparkle={false}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(card.modal);
                    }}
                  >
                    <span>{content.sectionTitles.viewDetail}</span>
                    <ArrowRight size={13} />
                  </LiquidButton>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hscroll-progress-wrap container">
          <div className="hscroll-progress-track">
            <div ref={progressBarRef} className="hscroll-progress-bar" />
          </div>
        </div>
      </div>
    </section>
  );
};
