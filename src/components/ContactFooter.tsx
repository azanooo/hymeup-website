import React from 'react';
import { Instagram } from 'lucide-react';
import { HmuMonogram } from './BrandLogo';
import { LiquidButton } from './LiquidButton';
import { Language, ModalTarget, SiteContent } from '../data/siteContent';
import { BRAND_LINKS } from '../data/brandLinks';
import type { PageRoute } from '../App';

interface ContactFooterProps {
  content: SiteContent;
  currentPage: PageRoute;
  onChangeLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onOpenModal: (target: ModalTarget) => void;
}

const TikTokIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const ContactFooter: React.FC<ContactFooterProps> = ({
  content,
  onChangeLanguage,
  onNavigate,
  onOpenModal,
}) => {
  return (
    <footer id="contact" className="lg-footer" role="contentinfo">
      <div className="container lg-footer-inner liquid-glass-panel">
        <div className="lg-footer-top">
          <div className="lg-footer-brand">
            <HmuMonogram variant="dark-on-light" height={20} />
            <span className="lg-footer-copy">{content.footer.copyright}</span>
          </div>

          <nav className="lg-footer-links" aria-label="Footer navigation">
            <button type="button" className="lg-footer-link" onClick={() => onNavigate('home', 'about')}>
              {content.nav.about}
            </button>
            <button type="button" className="lg-footer-link" onClick={() => onNavigate('product')}>
              {content.nav.product}
            </button>
            <button
              type="button"
              className="lg-footer-link"
              onClick={() => onOpenModal({ kind: 'legal', id: 'contact' })}
            >
              {content.nav.contact}
            </button>
            <button
              type="button"
              className="lg-footer-link"
              onClick={() => onOpenModal({ kind: 'legal', id: 'privacy' })}
            >
              {content.nav.privacyTerms}
            </button>
          </nav>

          <div className="lg-footer-socials">
            <LiquidButton
              href={BRAND_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variant="icon"
              size="sm"
              ariaLabel="Hy·Me·Up! Instagram (@hmu.beauty)"
              title="Instagram @hmu.beauty"
              showSparkle={false}
            >
              <Instagram size={16} />
            </LiquidButton>
            <LiquidButton
              href={BRAND_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              variant="icon"
              size="sm"
              ariaLabel="Hy·Me·Up! TikTok (@hmu.beauty)"
              title="TikTok @hmu.beauty"
              showSparkle={false}
            >
              <TikTokIcon size={15} />
            </LiquidButton>
            <div className="lg-lang-toggle" role="group" aria-label="Language switcher">
              <button
                type="button"
                className={`lg-lang-btn ${content.lang === 'en' ? 'is-active' : ''}`}
                onClick={() => onChangeLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`lg-lang-btn ${content.lang === 'id' ? 'is-active' : ''}`}
                onClick={() => onChangeLanguage('id')}
              >
                ID
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
