import type { CSSProperties } from "react";

/**
 * ShinyText
 * ---------------------------------------------------------------
 * Renders text with a subtle horizontal shimmer effect.
 *
 * IMPORTANT: this component is rendered ABOVE THE FOLD (Home hero),
 * so it sits on the critical render path. The previous implementation
 * pulled framer-motion into the main bundle just to animate a single
 * background-position value, adding ~133 KB to first paint on mobile
 * and pushing LCP past 5 s.
 *
 * This version is pure CSS:
 *   - Zero runtime JS for animation (CSS keyframes via .shiny-text in
 *     globals.css drive the sweep on the GPU).
 *   - Zero framer-motion or motion-vendor dependency on the home page
 *     critical path, so framer-motion now only loads with below-fold
 *     lazy sections.
 *   - Honours prefers-reduced-motion automatically (see globals.css).
 *
 * Props are kept backwards-compatible with the previous API so call
 * sites do not need to change.
 */

interface ShinyTextProps {
  /** Text to render with shimmer. */
  text: string;
  /** Disable animation but keep gradient text. */
  disabled?: boolean;
  /** Full sweep duration in seconds. Default 3. */
  speed?: number;
  /** Extra CSS classes for the span. */
  className?: string;
  /** Base text colour. Default soft gray. */
  color?: string;
  /** Highlight colour for the sweeping stripe. Default white. */
  shineColor?: string;
  /** Gradient angle in degrees. Default 120. */
  spread?: number;
  /** Legacy props kept for API compatibility (no-ops in CSS version). */
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
}: ShinyTextProps) {
  const style: CSSProperties & {
    [k: `--${string}`]: string;
  } = {
    "--shiny-color": color,
    "--shiny-shine": shineColor,
    "--shiny-spread": `${spread}deg`,
    "--shiny-duration": `${speed}s`,
  };

  if (disabled) {
    style.animation = "none";
    style.backgroundPosition = "50% center";
  }

  return (
    <span className={`shiny-text ${className}`} style={style}>
      {text}
    </span>
  );
}
