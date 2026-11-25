import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { LiquidButton } from './LiquidButton';
import { BRAND_IMAGES, ModalTarget, SiteContent } from '../data/siteContent';

interface AboutStorySectionProps {
  content: SiteContent;
  onOpenModal: (target: ModalTarget) => void;
}

export const AboutStorySection: React.FC<AboutStorySectionProps> = ({
  content,
  onOpenModal,
}) => {
  const storyTab = content.storyTabs[0];
  const whereWeStand = content.positioningData;
  const p = content.debutProduct;
  const about = content.aboutSection;

  return (
    <section id="about" className="about-section" aria-label={about.eyebrow}>
      <div className="container">
        <div className="section-head">
          <span className="lg-chip lg-chip--strong">
            <Sparkles size={12} />
            <span>{about.eyebrow}</span>
          </span>
          <h2 className="section-title">{about.heading}</h2>
        </div>

        {/* TOP BENTO: STORY + VALUE & PROMISE */}
        <div className="about-bento-grid">
          <article className="about-story-card liquid-glass-panel">
            <div className="about-story-media">
              <img
                src={BRAND_IMAGES.heroBeachTube}
                alt="Hy·Me·Up! Clear Sky Clear Skin"
              />
            </div>
            <div className="about-story-copy">
              <span className="lg-chip">{storyTab.tabLabel}</span>
              <h3 className="about-card-title">{storyTab.headline}</h3>
              {storyTab.bodyParagraphs.map((para, i) => (
                <p key={i} className="about-card-text">
                  {para}
                </p>
              ))}
              <div className="about-value-pair">
                <div className="about-value-box liquid-glass-card">
                  <span className="about-value-heading">{p.valueScript}</span>
                  <strong>{p.valueText}</strong>
                </div>
                <div className="about-value-box liquid-glass-card">
                  <span className="about-value-heading">{p.promiseScript}</span>
                  <strong>{p.promiseText}</strong>
                </div>
              </div>
            </div>
          </article>

          {/* WHERE WE STAND CARD */}
          <article className="about-positioning-card liquid-glass-panel">
            <div className="about-pos-top">
              <span className="lg-chip lg-chip--strong">
                <Compass size={12} />
                <span>{whereWeStand.title}</span>
              </span>
              <h3 className="about-card-title">{whereWeStand.positionStatement}</h3>
              <p className="about-card-text">{whereWeStand.subtitle}</p>
            </div>

            <div className="about-pos-mini-grid">
              {about.whereWeStandStats.map((stat) => (
                <div key={stat.label} className="about-pos-stat liquid-glass-card">
                  <span className="about-pos-stat-label">{stat.label}</span>
                  <strong className="about-pos-stat-val">{stat.value}</strong>
                </div>
              ))}
            </div>

            <div className="about-pos-actions">
              <LiquidButton
                variant="glass"
                size="md"
                onClick={() => onOpenModal({ kind: 'positioning', id: 'quadrant' })}
              >
                <span>{about.whereWeStandCta}</span>
                <ArrowRight size={15} />
              </LiquidButton>
            </div>
          </article>
        </div>

        {/* CLEAR SKY, CLEAR SKIN PHOTO DIRECTION GALLERY */}
        <div className="about-gallery-band">
          <div className="about-gallery-head">
            <div>
              <h3 className="about-gallery-title">{about.clearSkyTitle}</h3>
              <p className="about-gallery-sub">{about.clearSkyDesc}</p>
            </div>
            <LiquidButton
              variant="glass"
              size="sm"
              showSparkle={false}
              onClick={() => onOpenModal({ kind: 'story', id: 'clear-sky-skin' })}
            >
              <span>{content.sectionTitles.viewDetail}</span>
              <ArrowRight size={14} />
            </LiquidButton>
          </div>

          <div className="about-gallery-grid">
            <figure className="about-gallery-item liquid-glass-card">
              <img src={BRAND_IMAGES.clearSkyWoman1} alt="Clear sky protection portrait" />
            </figure>
            <figure className="about-gallery-item liquid-glass-card">
              <img src={BRAND_IMAGES.clearSkyMan} alt="Effortless daily skincare outdoors" />
            </figure>
            <figure className="about-gallery-item liquid-glass-card">
              <img src={BRAND_IMAGES.clearSkyWoman2} alt="Sunlit skin protection" />
            </figure>
            <figure className="about-gallery-item liquid-glass-card">
              <img src={BRAND_IMAGES.heroGardenNature} alt="Hy·Me·Up! Hybrid Complete Sunscreen outdoors" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
