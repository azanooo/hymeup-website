import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Instagram, Sparkles, X } from 'lucide-react';
import { HmuMonogram, HyMeUpWordmark } from './BrandLogo';
import { LiquidButton } from './LiquidButton';
import { ModalTarget, SiteContent } from '../data/siteContent';
import { BRAND_LINKS } from '../data/brandLinks';

interface DetailModalProps {
  target: ModalTarget | null;
  content: SiteContent;
  onClose: () => void;
  onSwitchTarget: (target: ModalTarget) => void;
}

const TikTokIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const DetailModal: React.FC<DetailModalProps> = ({
  target,
  content,
  onClose,
  onSwitchTarget,
}) => {
  const [renderedTarget, setRenderedTarget] = useState<ModalTarget | null>(target);
  const [phase, setPhase] = useState<'closed' | 'entering' | 'open' | 'closing'>(
    target ? 'open' : 'closed'
  );
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const closeTimerRef = useRef<number | null>(null);
  const modalCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (target) {
      setRenderedTarget(target);
      if (phaseRef.current === 'closed' || phaseRef.current === 'closing') {
        setPhase('entering');
        let raf1 = 0;
        let raf2 = 0;
        raf1 = window.requestAnimationFrame(() => {
          raf2 = window.requestAnimationFrame(() => {
            setPhase('open');
          });
        });
        return () => {
          window.cancelAnimationFrame(raf1);
          window.cancelAnimationFrame(raf2);
        };
      }
    } else if (phaseRef.current !== 'closed') {
      setPhase('closing');
      closeTimerRef.current = window.setTimeout(() => {
        setRenderedTarget(null);
        setPhase('closed');
        closeTimerRef.current = null;
      }, 300);
    }
  }, [target]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!renderedTarget) return;

    const SCROLL_KEYS = new Set([
      'Space',
      ' ',
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
    ]);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (SCROLL_KEYS.has(e.key)) {
        const card = modalCardRef.current;
        const canModalScroll = !!card && card.scrollHeight > card.clientHeight + 1;
        if (!canModalScroll || !card.contains(document.activeElement)) {
          e.preventDefault();
        }
      }
    };

    // Non-destructive scroll lock: NEVER mutate body.style.overflow (which detaches
    // position:sticky on the Hero video and flashes a blank white screen behind modals!)
    const onWheel = (e: WheelEvent) => {
      const card = modalCardRef.current;
      if (!card || !card.contains(e.target as Node)) {
        e.preventDefault();
        return;
      }
      const canScroll = card.scrollHeight > card.clientHeight + 1;
      if (!canScroll) {
        e.preventDefault();
        return;
      }
      const atTop = card.scrollTop <= 0 && e.deltaY < 0;
      const atBottom = card.scrollTop + card.clientHeight >= card.scrollHeight - 1 && e.deltaY > 0;
      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const card = modalCardRef.current;
      if (!card || !card.contains(e.target as Node) || card.scrollHeight <= card.clientHeight + 1) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [renderedTarget, onClose]);

  if (!renderedTarget) return null;

  const activeTarget = renderedTarget;
  const isContact = activeTarget.kind === 'legal' && activeTarget.id === 'contact';
  const stateClass = phase === 'open' ? 'is-open' : phase === 'closing' ? 'is-closing' : '';
  const m = content.modals;

  const renderBody = () => {
    if (activeTarget.kind === 'product') {
      const p = content.debutProduct;
      return (
        <div>
          <div className="modal-split-grid">
            <div className="modal-media-box liquid-glass-card">
              <img src={p.cutoutImage} alt={p.name} className="modal-cutout-img" />
              <div className="modal-badge-row">
                <span className="lg-chip lg-chip--strong">{p.spfRating}</span>
                <span className="lg-chip">{p.volume}</span>
              </div>
            </div>

            <div>
              <HyMeUpWordmark variant="dark-on-light" height={20} />
              <h2 className="modal-title">{p.name}</h2>
              <span className="script-accent modal-script">{p.tagline}</span>
              <p className="modal-support">{p.supportLine}</p>
              <p className="modal-copy">{p.summary}</p>

              <div className="modal-highlight-bar liquid-glass-card">
                <div className="modal-highlight-label">{p.conceptLabel}</div>
                <div className="modal-highlight-val">{p.routineEquation}</div>
              </div>

              <div className="modal-actions-row">
                <LiquidButton
                  href={BRAND_LINKS.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                >
                  <span>{m.shopNow}</span>
                  <ArrowUpRight size={14} />
                </LiquidButton>
                <LiquidButton
                  variant="glass"
                  size="sm"
                  showSparkle={false}
                  onClick={() => onSwitchTarget({ kind: 'all-ingredients', id: 'full-sheet' })}
                >
                  <span>{m.tenKeyIngredients}</span>
                </LiquidButton>
                <LiquidButton
                  variant="glass"
                  size="sm"
                  showSparkle={false}
                  onClick={() => onSwitchTarget({ kind: 'positioning', id: 'quadrant' })}
                >
                  <span>{m.whereWeStand}</span>
                </LiquidButton>
              </div>
            </div>
          </div>

          <div className="modal-spec-grid">
            {p.specs.map((row) => (
              <div key={row.label} className="modal-spec-card liquid-glass-card">
                <div className="modal-spec-label">{row.label}</div>
                <div className="modal-spec-val">{row.value}</div>
              </div>
            ))}
          </div>

          <div className="modal-howto-box liquid-glass-card">
            <h3 className="modal-subhead">{content.productPage.howToUseTitle}</h3>
            <div className="modal-steps-list">
              {p.howToUse.map((step, i) => (
                <div key={i} className="modal-step-row">
                  <span className="modal-step-num">{i + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <p className="product-patch-note">{content.productPage.patchTestNote}</p>
          </div>

          <p className="modal-disclaimer">{p.disclaimer}</p>
        </div>
      );
    }

    if (activeTarget.kind === 'pillar') {
      const pillar =
        content.pillarSlides.find((s) => s.id === activeTarget.id) || content.pillarSlides[0];
      return (
        <div>
          <div className="modal-badge-row modal-badge-row--left">
            <span className="lg-chip">{pillar.eyebrow}</span>
            <span className="lg-chip lg-chip--strong">{pillar.pillarBadge}</span>
          </div>
          <h2 className="modal-title">{pillar.leftTitle}</h2>
          <p className="modal-support">{pillar.supportLine}</p>

          <div className="modal-split-grid">
            <div className="modal-media-box liquid-glass-card">
              <img src={pillar.rightVisual} alt={pillar.rightTitle} className="modal-cutout-img" />
            </div>

            <div>
              <h3 className="modal-mid-title">{pillar.rightTitle}</h3>
              <p className="modal-copy">{pillar.mechanism}</p>
              <p className="modal-copy modal-copy--muted">{pillar.clinicalNote}</p>
              {pillar.clinicalNote.includes('7') && (
                <p className="modal-disclaimer" style={{ marginTop: 0, marginBottom: '14px' }}>
                  {content.debutProduct.disclaimer}
                </p>
              )}

              <div className="modal-spec-label" style={{ marginBottom: '8px' }}>
                {m.featuredIngredients}
              </div>
              <div className="modal-badge-row modal-badge-row--left" style={{ marginBottom: '20px' }}>
                {pillar.actives.map((act) => (
                  <span key={act} className="lg-tag-pill">
                    {act}
                  </span>
                ))}
              </div>

              <div className="modal-actions-row">
                <LiquidButton
                  href={BRAND_LINKS.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                >
                  <span>{m.shopNow}</span>
                  <ArrowUpRight size={14} />
                </LiquidButton>
                <LiquidButton
                  variant="glass"
                  size="sm"
                  showSparkle={false}
                  onClick={() => onSwitchTarget({ kind: 'product', id: 'debut-sku' })}
                >
                  <span>{m.productSpecs}</span>
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTarget.kind === 'ingredient') {
      const card = content.tubeCards.find((c) => c.id === activeTarget.id) || content.tubeCards[0];
      return (
        <div className="modal-split-grid">
          <div className="modal-media-box modal-media-box--square liquid-glass-card">
            <img
              src={card.image}
              alt={card.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: card.isTransparentCutout ? 'contain' : 'cover',
                borderRadius: '14px',
              }}
            />
          </div>

          <div>
            <span className="lg-chip lg-chip--strong">{card.pillarRef}</span>
            <h2 className="modal-title">{card.title}</h2>
            <p className="modal-lead">{card.roleSummary}</p>
            <p className="modal-copy">{card.mechanismDetail}</p>

            <div className="modal-steps-list" style={{ marginBottom: '18px' }}>
              {card.benefits.map((b) => (
                <div key={b} className="modal-step-row">
                  <span className="modal-step-check">
                    <Check size={13} strokeWidth={2.6} />
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="modal-badge-row modal-badge-row--left" style={{ marginBottom: '18px' }}>
              {card.tags.map((t) => (
                <span key={t} className="lg-tag-pill">
                  {t}
                </span>
              ))}
            </div>

            <div className="modal-actions-row">
              <LiquidButton
                href={BRAND_LINKS.shopee}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
              >
                <span>{m.shopNow}</span>
                <ArrowUpRight size={14} />
              </LiquidButton>
              <LiquidButton
                variant="glass"
                size="sm"
                showSparkle={false}
                onClick={() => onSwitchTarget({ kind: 'all-ingredients', id: 'full-sheet' })}
              >
                <span>{m.tenKeyIngredients}</span>
              </LiquidButton>
            </div>
          </div>
        </div>
      );
    }

    if (activeTarget.kind === 'all-ingredients') {
      return (
        <div>
          <div className="modal-badge-row modal-badge-row--left">
            <HmuMonogram variant="dark-on-light" height={16} />
            <span className="lg-chip lg-chip--strong">SPF 50+ PA++++ · 4-IN-1</span>
          </div>
          <h2 className="modal-title">{m.allIngredientsTitle}</h2>
          <p className="modal-support">
            {content.debutProduct.supportLine} · {content.debutProduct.tagline}
          </p>

          <div className="modal-actives-grid">
            {content.allActives.map((act) => (
              <div key={act.id} className="modal-active-card liquid-glass-card">
                <div className="modal-active-top">
                  <span className="modal-spec-label">{act.pillar}</span>
                  <Sparkles size={13} color="#0A7CC1" />
                </div>
                <h3 className="modal-active-name">{act.name}</h3>
                <div className="modal-active-benefit">{act.benefit}</div>
                <p className="modal-active-detail">{act.detail}</p>
              </div>
            ))}
          </div>

          <p className="modal-disclaimer">{content.debutProduct.disclaimer}</p>
        </div>
      );
    }

    if (activeTarget.kind === 'routine') {
      const p = content.debutProduct;
      return (
        <div>
          <span className="lg-chip lg-chip--strong">{p.conceptLabel}</span>
          <h2 className="modal-title">{m.whyItExistsTitle}</h2>
          <p className="modal-copy">{m.whyItExistsCopy}</p>

          <div className="modal-equation-pill">{p.routineEquation}</div>

          <div className="modal-spec-grid" style={{ marginBottom: '22px' }}>
            <div className="modal-spec-card liquid-glass-card">
              <div className="modal-spec-label">{p.valueScript}</div>
              <div className="modal-spec-val">{p.valueText}</div>
            </div>
            <div className="modal-spec-card liquid-glass-card">
              <div className="modal-spec-label">{p.promiseScript}</div>
              <div className="modal-spec-val">{p.promiseText}</div>
            </div>
          </div>

          <div className="modal-footer-bar">
            <div>
              <span className="script-accent modal-script">{p.tagline}</span>
              <div className="modal-support" style={{ margin: 0 }}>
                {p.supportLine}
              </div>
            </div>
            <LiquidButton
              href={BRAND_LINKS.shopee}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              <span>{m.shopNow}</span>
              <ArrowUpRight size={14} />
            </LiquidButton>
          </div>
        </div>
      );
    }

    if (activeTarget.kind === 'positioning') {
      const pos = content.positioningData;
      return (
        <div>
          <span className="lg-chip lg-chip--strong">{m.brandPositioningEyebrow}</span>
          <h2 className="modal-title">{pos.title}</h2>
          <p className="modal-lead">{pos.subtitle}</p>

          <div className="quadrant-box liquid-glass-card">
            <div className="quadrant-ring quadrant-ring--outer" />
            <div className="quadrant-ring quadrant-ring--inner" />
            <div className="quadrant-center">
              <strong>{pos.axes.centerLabel}</strong>
              <span>{pos.axes.centerSub}</span>
            </div>

            <div className="quadrant-axis-v" />
            <div className="quadrant-axis-h" />

            <span className="quadrant-label quadrant-label--top">{pos.axes.top}</span>
            <span className="quadrant-label quadrant-label--bottom">{pos.axes.bottom}</span>
            <span className="quadrant-label quadrant-label--left">{pos.axes.left}</span>
            <span className="quadrant-label quadrant-label--right">{pos.axes.right}</span>

            {pos.peers.map((peer) => (
              <div
                key={peer.name}
                className="quadrant-peer"
                style={{ left: `${peer.x}%`, top: `${peer.y}%` }}
              >
                <div className="quadrant-peer-dot" />
                <div className="quadrant-peer-name">{peer.name}</div>
                <div className="quadrant-peer-spec">{peer.spec}</div>
              </div>
            ))}

            <div className="quadrant-brand liquid-glass-panel">
              <HmuMonogram variant="dark-on-light" height={20} />
              <div className="quadrant-brand-spec">{pos.brandPoint.spec}</div>
              <div className="quadrant-brand-detail">{pos.brandPoint.detail}</div>
            </div>
          </div>

          <p className="modal-disclaimer">{pos.positionStatement}</p>
        </div>
      );
    }

    if (activeTarget.kind === 'legal') {
      if (activeTarget.id === 'contact') {
        return (
          <div className="modal-contact-body">
            <HyMeUpWordmark variant="dark-on-light" height={20} />
            <h2 className="modal-title">{m.contactTitle}</h2>
            <p className="modal-lead">{m.contactSubtitle}</p>
            <p className="modal-copy">{m.contactBody}</p>
            <div className="modal-actions-row" style={{ marginTop: '22px' }}>
              <LiquidButton
                href={BRAND_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variant="glass"
                size="md"
              >
                <Instagram size={16} />
                <span>@hmu.beauty</span>
              </LiquidButton>
              <LiquidButton
                href={BRAND_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                variant="glass"
                size="md"
              >
                <TikTokIcon size={15} />
                <span>@hmu.beauty</span>
              </LiquidButton>
            </div>
          </div>
        );
      }

      const legal = content.legalContent[activeTarget.id] || content.legalContent.privacy;
      return (
        <div>
          <HyMeUpWordmark variant="dark-on-light" height={20} />
          <h2 className="modal-title">{legal.title}</h2>
          <p className="modal-lead">{legal.subtitle}</p>
          <div className="modal-steps-list">
            {legal.paragraphs.map((para, i) => (
              <p key={i} className="modal-copy">
                {para}
              </p>
            ))}
          </div>
        </div>
      );
    }

    const story = content.storyTabs.find((s) => s.id === activeTarget.id) || content.storyTabs[0];
    return (
      <div>
        <div className="modal-story-banner">
          <img
            src={story.image}
            alt={story.headline}
            style={{ objectPosition: story.objectPosition }}
          />
          <div className="modal-story-overlay">
            {story.scriptAccent ? (
              <span className="script-accent modal-story-script">{story.scriptAccent}</span>
            ) : (
              <h2 className="modal-story-heading">{story.headline}</h2>
            )}
            {story.supportLine && <span className="modal-story-support">{story.supportLine}</span>}
          </div>
        </div>

        <div className="modal-steps-list" style={{ marginBottom: '20px' }}>
          {story.bodyParagraphs.map((para, idx) => (
            <p key={idx} className="modal-copy">
              {para}
            </p>
          ))}
        </div>

        <div className="modal-spec-grid">
          {story.highlights.map((hl) => (
            <div key={hl.label} className="modal-spec-card liquid-glass-card">
              <div className="modal-spec-label">{hl.label}</div>
              <div className="modal-spec-val">{hl.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`modal-backdrop ${stateClass}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalCardRef}
        className={`modal-card liquid-glass-modal ${isContact ? 'liquid-glass-modal--contact' : ''} ${stateClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-glass-sheen" aria-hidden="true" />
        <LiquidButton
          variant="icon"
          size="sm"
          className="modal-close-btn"
          ariaLabel="Close modal"
          showSparkle={false}
          onClick={onClose}
        >
          <X size={16} />
        </LiquidButton>
        {renderBody()}
      </div>
    </div>
  );
};
