import React, { useEffect, useState } from 'react';

interface MapSpec {
  width: number;
  height: number;
  radius: number;
  bezel: number;
}

/**
 * Generates an optical lens-bezel normal displacement map matching crystal-clear
 * molded glass (thick curved perimeter rim + completely clear flat center).
 */
function buildLensDisplacementMap({ width, height, radius, bezel }: MapSpec): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const img = ctx.createImageData(width, height);
  const data = img.data;

  const halfW = width * 0.5;
  const halfH = height * 0.5;
  const r = Math.min(radius, halfW - 1, halfH - 1);
  const bx = halfW - r;
  const by = halfH - r;

  for (let y = 0; y < height; y++) {
    const py = y + 0.5 - halfH;
    const ay = Math.abs(py);
    for (let x = 0; x < width; x++) {
      const px = x + 0.5 - halfW;
      const ax = Math.abs(px);

      const qx = ax - bx;
      const qy = ay - by;

      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outsideLen = Math.hypot(ox, oy);
      const insideMax = Math.min(Math.max(qx, qy), 0);
      const sdf = outsideLen + insideMax - r;
      const distFromEdge = -sdf;

      let red = 128;
      let green = 128;

      if (distFromEdge >= 0 && distFromEdge < bezel) {
        let nx = 0;
        let ny = 0;
        if (outsideLen > 0.0001) {
          nx = (ox / outsideLen) * (px >= 0 ? 1 : -1);
          ny = (oy / outsideLen) * (py >= 0 ? 1 : -1);
        } else if (qx > qy) {
          nx = px >= 0 ? 1 : -1;
        } else {
          ny = py >= 0 ? 1 : -1;
        }

        const t = 1 - distFromEdge / bezel;
        const lensCurve = Math.pow(t, 1.75) * (1 - 0.12 * Math.pow(t, 4));

        red = Math.round(128 - nx * lensCurve * 126);
        green = Math.round(128 - ny * lensCurve * 126);
      }

      const idx = (y * width + x) * 4;
      data[idx] = Math.max(0, Math.min(255, red));
      data[idx + 1] = Math.max(0, Math.min(255, green));
      data[idx + 2] = 128;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}

export const LiquidGlassFilters: React.FC = () => {
  const [maps, setMaps] = useState<{ pill: string; card: string; modal: string } | null>(null);

  useEffect(() => {
    // Skip heavy SVG feDisplacementMap filters on mobile/touch GPUs for locked 60/120fps smooth scrolling
    if (window.matchMedia('(max-width: 768px), (hover: none)').matches) {
      return;
    }
    const pill = buildLensDisplacementMap({
      width: 320,
      height: 84,
      radius: 42,
      bezel: 26,
    });
    const card = buildLensDisplacementMap({
      width: 280,
      height: 280,
      radius: 34,
      bezel: 32,
    });
    const modal = buildLensDisplacementMap({
      width: 320,
      height: 240,
      radius: 28,
      bezel: 28,
    });
    setMaps({ pill, card, modal });
  }, []);

  if (!maps) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{
        position: 'fixed',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Ultra-Clear Crystal Pill Lens Refraction */}
        <filter
          id="ios-glass-pill"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={maps.pill}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="pillMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="pillMap"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />
          <feGaussianBlur in="refracted" stdDeviation="0.6" />
        </filter>

        {/* Ultra-Clear Crystal Card Lens Refraction */}
        <filter
          id="ios-glass-card"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={maps.card}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="cardMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="cardMap"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />
          <feGaussianBlur in="refracted" stdDeviation="0.8" />
        </filter>

        {/* Clear Crystal Modal Pop-up Lens Refraction */}
        <filter
          id="ios-glass-modal"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={maps.modal}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="modalMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="modalMap"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />
          <feGaussianBlur in="refracted" stdDeviation="5" />
        </filter>
      </defs>
    </svg>
  );
};
