import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { HyMeUpWordmark } from './BrandLogo';
import { LiquidButton } from './LiquidButton';
import { BRAND_LINKS } from '../data/brandLinks';
import { ModalTarget, SiteContent } from '../data/siteContent';
import type { PageRoute } from '../App';

interface HeaderProps {
  content: SiteContent;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onOpenModal: (target: ModalTarget) => void;
}

export const Header: React.FC<HeaderProps> = ({
  content,
  currentPage,
  onNavigate,
  onOpenModal,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(currentPage !== 'home');

  useEffect(() => {
    const onScroll = () => {
      if (currentPage !== 'home') {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        setScrolled(y > 24);
        setHeaderVisible(true);
        return;
      }

      const homeEl = document.getElementById('home');
      const y = homeEl
        ? Math.max(0, -homeEl.getBoundingClientRect().top)
        : window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const curtainOpened = y >= window.innerHeight * 0.68;
      setHeaderVisible(curtainOpened);
      setScrolled(y > window.innerHeight * 0.8);
      if (!curtainOpened) {
        setMobileOpen(false);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll, true);
    };
  }, [currentPage]);

  const handleNav = (page: PageRoute, sectionId?: string) => {
    setMobileOpen(false);
    onNavigate(page, sectionId);
  };

  const handleOpenContact = () => {
    setMobileOpen(false);
    onOpenModal({ kind: 'legal', id: 'contact' });
  };

  return (
    <header
      className={`lg-header ${headerVisible ? 'is-visible' : 'is-hidden'}`}
      role="banner"
      aria-hidden={!headerVisible}
    >
      <div className={`lg-nav-pill ${scrolled ? 'is-scrolled' : ''}`}>
        <a
          href="/"
          className="lg-nav-logo"
          aria-label="Hy·Me·Up! Home"
          tabIndex={headerVisible ? 0 : -1}
          onClick={(e) => {
            e.preventDefault();
            handleNav('home');
          }}
        >
          <HyMeUpWordmark variant="dark-on-light" height={20} />
        </a>

        <nav className="lg-nav-links" aria-label="Main navigation">
          <button
            type="button"
            className="lg-nav-link"
            onClick={() => handleNav('home', 'about')}
          >
            {content.nav.about}
          </button>
          <button
            type="button"
            className={`lg-nav-link ${currentPage === 'product' ? 'is-active' : ''}`}
            aria-current={currentPage === 'product' ? 'page' : undefined}
            onClick={() => handleNav('product')}
          >
            {content.nav.product}
          </button>
          <button
            type="button"
            className="lg-nav-link"
            onClick={handleOpenContact}
          >
            {content.nav.contact}
          </button>
        </nav>

        <div className="lg-nav-actions">
          <LiquidButton
            href={BRAND_LINKS.shopee}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            className="lg-nav-cta"
          >
            <span>{content.nav.shopNow}</span>
            <span className="lg-cta-dot" aria-hidden="true">
              <ArrowUpRight size={13} strokeWidth={2.3} />
            </span>
          </LiquidButton>

          <LiquidButton
            variant="icon"
            size="sm"
            className="lg-mobile-toggle"
            ariaLabel={mobileOpen ? 'Close menu' : 'Open menu'}
            showSparkle={false}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </LiquidButton>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg-mobile-drawer" role="dialog" aria-label="Mobile menu">
          <button
            type="button"
            className="lg-mobile-link"
            onClick={() => handleNav('home', 'about')}
          >
            {content.nav.about}
          </button>
          <button
            type="button"
            className="lg-mobile-link"
            onClick={() => handleNav('product')}
          >
            {content.nav.product}
          </button>
          <button
            type="button"
            className="lg-mobile-link"
            onClick={handleOpenContact}
          >
            {content.nav.contact}
          </button>
          <div className="lg-mobile-cta-wrap">
            <LiquidButton
              href={BRAND_LINKS.shopee}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
              className="lg-mobile-shop-btn"
              onClick={() => setMobileOpen(false)}
            >
              <span>{content.nav.shopNow}</span>
              <ArrowUpRight size={15} />
            </LiquidButton>
          </div>
        </div>
      )}
    </header>
  );
};
