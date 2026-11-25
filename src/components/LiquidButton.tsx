import React, { useRef, useState } from 'react';

interface SparkleBurst {
  id: number;
  x: number;
  y: number;
}

type LiquidButtonVariant = 'primary' | 'glass' | 'dark-glass' | 'icon';
type LiquidButtonSize = 'sm' | 'md' | 'lg';

interface LiquidButtonBaseProps {
  variant?: LiquidButtonVariant;
  size?: LiquidButtonSize;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  title?: string;
  showSparkle?: boolean;
}

type LiquidButtonAsButton = LiquidButtonBaseProps & {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

type LiquidButtonAsAnchor = LiquidButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type LiquidButtonProps = LiquidButtonAsButton | LiquidButtonAsAnchor;

/**
 * Interactive Morphing Liquid Glass CTA:
 * - Surface-tension elastic morphing (--dx, --dy, --angle) following cursor
 * - Rotating optical Fresnel specular rim highlight
 * - Diagonal shimmer sweep + 4-point sparkle + click caustic ripple
 */
export const LiquidButton: React.FC<LiquidButtonProps> = (props) => {
  const {
    variant = 'glass',
    size = 'md',
    className = '',
    children,
    ariaLabel,
    title,
    showSparkle = variant === 'primary',
  } = props;

  const elRef = useRef<HTMLElement | null>(null);
  const [bursts, setBursts] = useState<SparkleBurst[]>([]);
  const burstId = useRef(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / Math.max(rect.width, 1);
    const relY = (e.clientY - rect.top) / Math.max(rect.height, 1);
    const dx = (relX - 0.5) * 2;
    const dy = (relY - 0.5) * 2;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    el.style.setProperty('--mx', `${(relX * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(relY * 100).toFixed(1)}%`);
    el.style.setProperty('--dx', dx.toFixed(3));
    el.style.setProperty('--dy', dy.toFixed(3));
    el.style.setProperty('--angle', `${angle.toFixed(1)}deg`);
  };

  const handlePointerLeave = () => {
    const el = elRef.current;
    if (!el) return;
    el.style.setProperty('--dx', '0');
    el.style.setProperty('--dy', '0');
  };

  const triggerBurst = (e: React.MouseEvent<HTMLElement>) => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
    const id = ++burstId.current;
    setBursts((prev) => [...prev.slice(-3), { id, x, y }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((item) => item.id !== id));
    }, 760);
  };

  const classes = [
    'liquid-cta',
    'morphing-glass',
    `liquid-cta--${variant}`,
    `liquid-cta--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const innerContent = (
    <>
      <span className="liquid-cta__sheen" aria-hidden="true" />
      <span className="liquid-cta__glint" aria-hidden="true" />
      <span className="liquid-cta__content">
        {children}
        {showSparkle && (
          <svg
            className="liquid-cta__sparkle"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 1.5C12.7 7.6 16.4 11.3 22.5 12C16.4 12.7 12.7 16.4 12 22.5C11.3 16.4 7.6 12.7 1.5 12C7.6 11.3 11.3 7.6 12 1.5Z" />
          </svg>
        )}
      </span>
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="liquid-cta__burst"
          style={{ left: `${burst.x}px`, top: `${burst.y}px` }}
          aria-hidden="true"
        >
          <span className="liquid-cta__burst-ring" />
          <svg
            className="liquid-cta__burst-star"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 1C12.8 7.6 16.4 11.2 23 12C16.4 12.8 12.8 16.4 12 23C11.2 16.4 7.6 12.8 1 12C7.6 11.2 11.2 7.6 12 1Z" />
          </svg>
        </span>
      ))}
    </>
  );

  if (props.href !== undefined) {
    return (
      <a
        ref={(node) => {
          elRef.current = node;
        }}
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={classes}
        aria-label={ariaLabel}
        title={title}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={(e) => {
          triggerBurst(e);
          props.onClick?.(e);
        }}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={(node) => {
        elRef.current = node;
      }}
      type={props.type ?? 'button'}
      disabled={props.disabled}
      className={classes}
      aria-label={ariaLabel}
      title={title}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={(e) => {
        triggerBurst(e);
        props.onClick?.(e);
      }}
    >
      {innerContent}
    </button>
  );
};
