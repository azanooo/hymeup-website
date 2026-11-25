import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Feather,
  FlaskConical,
  Flower2,
  Heart,
  type LucideIcon,
  MonitorSmartphone,
  Orbit,
  Package,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  Sprout,
  Sun,
  Waves,
  Wind,
} from 'lucide-react';
import { LiquidButton } from './LiquidButton';
import { ModalTarget, SiteContent } from '../data/siteContent';
import { BRAND_LINKS } from '../data/brandLinks';
import productTubeFront from '../assets/product-tube-front.jpg';
import productTubeBack from '../assets/product-tube-back.jpg';

interface ProductShowcaseSectionProps {
  content: SiteContent;
  onOpenModal: (target: ModalTarget) => void;
  onBackHome: () => void;
}

const SPEC_ICONS = [Droplets, ShieldCheck, Feather, Sparkles, Wind, Package];

const PILLAR_ICONS: Record<string, LucideIcon> = {
  protection: ShieldCheck,
  restore: ShieldPlus,
  brightening: Sparkles,
  hydration: Droplets,
};

const ACTIVE_ICONS: Record<string, LucideIcon> = {
  'hybrid-uv-filters': ShieldCheck,
  'lumicease-blue': MonitorSmartphone,
  'helichrysum-artemisia': Flower2,
  'rice-pdrn': Sprout,
  'postbiotic-microbiome': Orbit,
  'panthenol-allantoin': Heart,
  cybright: Sparkles,
  'vitamin-c-hyaluronate': Sun,
  'hyaluronate-16x': Droplets,
  'glycerin-trehalose': Waves,
};

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  content,
  onOpenModal,
  onBackHome,
}) => {
  const [selectedPillarIdx, setSelectedPillarIdx] = useState(0);
  const [photoSide, setPhotoSide] = useState<0 | 1>(0);
  const swipeStartX = useRef<number | null>(null);

  const activePillar = content.pillarSlides[selectedPillarIdx] ?? content.pillarSlides[0];
  const p = content.debutProduct;
  const pp = content.productPage;
  const isId = content.lang === 'id';

  const slides = [
    {
      id: 'front',
      label: isId ? 'Tampak Depan' : 'Front View',
      shortLabel: isId ? 'Depan' : 'Front',
      src: productTubeFront,
      alt: 'Hy·Me·Up! Hybrid Complete Sunscreen — Front Packaging',
    },
    {
      id: 'back',
      label: isId ? 'Tampak Belakang' : 'Back View',
      shortLabel: isId ? 'Belakang' : 'Back',
      src: productTubeBack,
      alt: 'Hy·Me·Up! Hybrid Complete Sunscreen — Back Packaging',
    },
  ];

  const ActivePillarIcon = PILLAR_ICONS[activePillar.id] ?? Sparkles;

  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (swipeStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? swipeStartX.current;
    const delta = endX - swipeStartX.current;
    if (Math.abs(delta) > 36) {
      setPhotoSide(delta < 0 ? 1 : 0);
    }
    swipeStartX.current = null;
  };

  return (
    <section
      id="product"
      className="product-section product-page-wrap"
      aria-label="Hybrid Complete Sunscreen Product Details"
    >
      <div className="container">
        <div className="product-back-row">
          <LiquidButton
            variant="glass"
            size="sm"
            showSparkle={false}
            onClick={onBackHome}
          >
            <ArrowLeft size={14} />
            <span>{pp.backToHome}</span>
          </LiquidButton>
        </div>

        <div className="section-head">
          <span className="lg-chip lg-chip--strong">
            <FlaskConical size={12} />
            <span>{pp.eyebrow}</span>
          </span>
          <h1 className="section-title">{p.name}</h1>
          <p className="section-subtitle">{p.summary}</p>
        </div>

        <div className="product-lab-grid">
          {/* LEFT COLUMN: INTERACTIVE FORMULA EXPLORER WITH ICONS */}
          <div className="product-lab-left">
            {/* 3-in-1 Formula Equation Glass Card */}
            <div className="liquid-glass-card product-equation-card">
              <div className="product-equation-top">
                <span className="lg-chip">{p.conceptLabel}</span>
                <span className="lg-chip lg-chip--strong">{p.spfRating}</span>
              </div>
              <h3 className="product-equation-title">{p.routineEquation}</h3>
              <p className="product-equation-note">{pp.equationNote}</p>
              <div className="product-spec-pills">
                {p.specs.map((spec, idx) => {
                  const SpecIcon = SPEC_ICONS[idx % SPEC_ICONS.length];
                  return (
                    <div key={spec.label} className="product-spec-item">
                      <div className="product-item-head">
                        <span className="product-item-icon" aria-hidden="true">
                          <SpecIcon size={15} strokeWidth={2.2} />
                        </span>
                        <span className="product-spec-label">{spec.label}</span>
                      </div>
                      <span className="product-spec-value">{spec.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4 Core Pillars Switcher */}
            <div className="product-block">
              <div className="product-block-head">
                <h3 className="product-block-title">{pp.choosePillarTitle}</h3>
                <span className="product-block-sub">{p.supportLine}</span>
              </div>

              <div className="pillar-switch-grid" role="tablist" aria-label="4 Core Formula Pillars">
                {content.pillarSlides.map((pillar, idx) => {
                  const isActive = idx === selectedPillarIdx;
                  const PillarIcon = PILLAR_ICONS[pillar.id] ?? Sparkles;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`pillar-switch-card liquid-glass-card ${isActive ? 'is-selected' : ''}`}
                      onClick={() => setSelectedPillarIdx(idx)}
                    >
                      <div className="pillar-switch-top">
                        <div className="product-item-head">
                          <span className="product-item-icon" aria-hidden="true">
                            <PillarIcon size={15} strokeWidth={2.2} />
                          </span>
                          <span className="pillar-switch-eyebrow">{pillar.eyebrow}</span>
                        </div>
                        <span className="pillar-switch-badge">{pillar.pillarBadge}</span>
                      </div>
                      <div className="pillar-switch-title">{pillar.leftTitle}</div>
                      <div className="pillar-switch-desc">{pillar.cardDesc}</div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Selected Pillar Detail Card */}
              <div className="pillar-detail-card liquid-glass-card" role="tabpanel">
                <div className="pillar-detail-top">
                  <div className="product-item-head">
                    <span className="product-item-icon product-item-icon--lg" aria-hidden="true">
                      <ActivePillarIcon size={17} strokeWidth={2.2} />
                    </span>
                    <div>
                      <span className="pillar-switch-eyebrow">{activePillar.eyebrow} · {activePillar.pillarBadge}</span>
                      <h4 className="pillar-detail-title">{activePillar.rightTitle}</h4>
                    </div>
                  </div>
                </div>
                <p className="product-sticky-mech">{activePillar.mechanism}</p>
                <div className="product-sticky-tags">
                  {activePillar.actives.map((act) => (
                    <span key={act} className="lg-tag-pill">
                      {act}
                    </span>
                  ))}
                </div>
                <p className="product-sticky-clinical">{activePillar.clinicalNote}</p>
                {activePillar.clinicalNote.includes('7') && (
                  <p className="product-disclaimer" style={{ marginBottom: '14px' }}>
                    {p.disclaimer}
                  </p>
                )}
                <div className="product-sticky-actions">
                  <LiquidButton
                    href={BRAND_LINKS.shopee}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="sm"
                  >
                    <span>{content.modals.shopNow}</span>
                    <ArrowUpRight size={14} />
                  </LiquidButton>
                  <LiquidButton
                    variant="glass"
                    size="sm"
                    onClick={() => onOpenModal({ kind: 'product', id: 'hybrid-complete-sunscreen' })}
                  >
                    <span>{content.sectionTitles.viewDetail}</span>
                    <ChevronRight size={14} />
                  </LiquidButton>
                </div>
              </div>
            </div>

            {/* Complete 10 Key Ingredients with Icons */}
            <div className="product-block">
              <div className="product-block-head">
                <h3 className="product-block-title">{pp.keyIngredientsTitle}</h3>
                <LiquidButton
                  variant="glass"
                  size="sm"
                  showSparkle={false}
                  onClick={() => onOpenModal({ kind: 'all-ingredients', id: 'full-sheet' })}
                >
                  <span>{pp.seeAll}</span>
                  <ChevronRight size={14} />
                </LiquidButton>
              </div>

              <div className="actives-glass-grid">
                {content.allActives.map((active) => {
                  const ActiveIcon = ACTIVE_ICONS[active.id] ?? Sparkles;
                  return (
                    <button
                      key={active.id}
                      type="button"
                      className="active-mini-card liquid-glass-card"
                      onClick={() => onOpenModal({ kind: 'all-ingredients', id: 'full-sheet' })}
                    >
                      <div className="product-item-head">
                        <span className="product-item-icon" aria-hidden="true">
                          <ActiveIcon size={14} strokeWidth={2.2} />
                        </span>
                        <span className="active-mini-pillar">{active.pillar}</span>
                      </div>
                      <span className="active-mini-name">{active.name}</span>
                      <span className="active-mini-benefit">{active.benefit}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* How To Use */}
            <div className="liquid-glass-card product-howto-card">
              <h3 className="product-block-title">{pp.howToUseTitle}</h3>
              <ul className="product-howto-list">
                {p.howToUse.map((step) => (
                  <li key={step} className="product-howto-item">
                    <span className="product-howto-check" aria-hidden="true">
                      <Check size={13} strokeWidth={2.6} />
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <p className="product-patch-note">{pp.patchTestNote}</p>
              <p className="product-disclaimer">{p.disclaimer}</p>
            </div>
          </div>

          {/* RIGHT COLUMN: PURE PHOTO-ONLY 3:4 FRONT / BACK PACKAGING SWIPER */}
          <div className="product-lab-right">
            <div
              className="product-photo-card liquid-glass-panel"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="product-photo-viewport">
                <div
                  className="product-photo-track"
                  style={{ transform: `translate3d(-${photoSide * 50}%, 0, 0)` }}
                >
                  {slides.map((slide) => (
                    <div key={slide.id} className="product-photo-slide">
                      <img src={slide.src} alt={slide.alt} className="product-photo-img" />
                    </div>
                  ))}
                </div>

                <LiquidButton
                  variant="icon"
                  size="sm"
                  className="product-swipe-arrow product-swipe-arrow--prev"
                  ariaLabel={isId ? 'Foto sebelumnya' : 'Previous photo'}
                  showSparkle={false}
                  onClick={() => setPhotoSide((prev) => (prev === 0 ? 1 : 0))}
                >
                  <ChevronLeft size={18} />
                </LiquidButton>

                <LiquidButton
                  variant="icon"
                  size="sm"
                  className="product-swipe-arrow product-swipe-arrow--next"
                  ariaLabel={isId ? 'Foto berikutnya' : 'Next photo'}
                  showSparkle={false}
                  onClick={() => setPhotoSide((prev) => (prev === 0 ? 1 : 0))}
                >
                  <ChevronRight size={18} />
                </LiquidButton>

                <div className="product-photo-switcher liquid-glass-bar" role="tablist" aria-label="Packaging side view">
                  {slides.map((slide, i) => (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={photoSide === i}
                      className={`product-photo-pill ${photoSide === i ? 'is-active' : ''}`}
                      onClick={() => setPhotoSide(i as 0 | 1)}
                    >
                      {slide.shortLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
