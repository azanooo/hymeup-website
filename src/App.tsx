import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, ModalTarget, SITE_CONTENT } from './data/siteContent';
import { Header } from './components/Header';
import { HeroScrollStage } from './components/HeroScrollStage';
import { HorizontalShowcase } from './components/HorizontalShowcase';
import { ProductShowcaseSection } from './components/ProductShowcaseSection';
import { AboutStorySection } from './components/AboutStorySection';
import { ContactFooter } from './components/ContactFooter';
import { DetailModal } from './components/DetailModal';
import { LiquidGlassFilters } from './components/LiquidGlassFilters';

export type PageRoute = 'home' | 'product';

const getRouteFromPath = (pathname: string): PageRoute =>
  pathname.replace(/\/+$/, '') === '/product' ? 'product' : 'home';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [page, setPage] = useState<PageRoute>(() =>
    typeof window !== 'undefined' ? getRouteFromPath(window.location.pathname) : 'home'
  );
  const pendingSectionRef = useRef<string | null>(null);
  const [modalTarget, setModalTarget] = useState<ModalTarget | null>(null);

  const content = SITE_CONTENT[lang];

  // Keep browser <title>, meta description, and html[lang] synced with EN/ID language
  useEffect(() => {
    document.documentElement.lang = content.lang;
    document.title = content.seo.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', content.seo.description);
    }
  }, [content.lang, content.seo.title, content.seo.description]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setPage(getRouteFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll to target section or top whenever route changes
  useEffect(() => {
    if (page === 'home') {
      let raf1 = 0;
      let raf2 = 0;
      raf1 = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        raf2 = window.requestAnimationFrame(() => {
          const targetId = pendingSectionRef.current;
          pendingSectionRef.current = null;
          if (targetId) {
            const el = document.getElementById(targetId);
            if (el) {
              const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY);
              window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
              ScrollTrigger.update();
              window.dispatchEvent(new Event('scroll'));
            }
          }
        });
      });
      return () => {
        window.cancelAnimationFrame(raf1);
        window.cancelAnimationFrame(raf2);
      };
    } else {
      pendingSectionRef.current = null;
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [page]);

  const handleNavigate = useCallback(
    (targetPage: PageRoute, sectionId?: string) => {
      const targetPath = targetPage === 'product' ? '/product' : '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }

      if (targetPage === page) {
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (sectionId) {
        pendingSectionRef.current = sectionId;
      } else {
        pendingSectionRef.current = null;
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
      setPage(targetPage);
    },
    [page]
  );

  return (
    <div className="hymeup-shell">
      <LiquidGlassFilters />

      {/* Pure white studio base canvas behind every Clear Liquid Glass surface */}
      <div className="page-bg-canvas" aria-hidden="true" />

      <Header
        content={content}
        currentPage={page}
        onNavigate={handleNavigate}
        onOpenModal={(target) => setModalTarget(target)}
      />

      <main className="hymeup-main">
        {page === 'home' ? (
          <>
            {/* Stage 1-3: Blue Curtain Open -> Old Product -> Spinning New Product over BG.png */}
            <HeroScrollStage content={content} />

            {/* Stage 4: Seamless BG.png -> Scroll Down Glides Sideways (Horizontal Pin) */}
            <HorizontalShowcase
              content={content}
              onOpenModal={(target) => setModalTarget(target)}
            />

            {/* Stage 5: Vertical Scroll Resumes -> About Story (concise Home flow) */}
            <AboutStorySection
              content={content}
              onOpenModal={(target) => setModalTarget(target)}
            />
          </>
        ) : (
          /* Dedicated /product Page for Full Formula Specs, 4 Pillars & 10 Key Actives */
          <ProductShowcaseSection
            content={content}
            onOpenModal={(target) => setModalTarget(target)}
            onBackHome={() => handleNavigate('home')}
          />
        )}
      </main>

      <ContactFooter
        content={content}
        currentPage={page}
        onChangeLanguage={(nextLang) => setLang(nextLang)}
        onNavigate={handleNavigate}
        onOpenModal={(target) => setModalTarget(target)}
      />

      <DetailModal
        target={modalTarget}
        content={content}
        onClose={() => setModalTarget(null)}
        onSwitchTarget={(nextTarget) => setModalTarget(nextTarget)}
      />
    </div>
  );
};

export default App;
