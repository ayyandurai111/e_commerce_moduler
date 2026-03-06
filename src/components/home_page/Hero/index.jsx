// ============================================================
//  Hero/index.jsx — Fullscreen hero carousel with autoplay
// ============================================================
import React, { useState, useEffect, useCallback } from "react";
import Slide      from "./Slide";
import SliderDots from "./SliderDots";

const ChevronLeft  = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
);

/**
 * Hero — fullscreen carousel
 * @param {boolean}  props.enabled
 * @param {array}    props.slides          — slide data array
 * @param {boolean}  props.autoPlay
 * @param {number}   props.autoPlayInterval — ms (default 5000)
 * @param {string}   props.ctaText
 * @param {string}   props.ctaLink
 * @param {string}   props.ctaSecondaryText
 * @param {string}   props.ctaSecondaryLink
 * @param {object}   props.theme
 */
const Hero = ({
  enabled = true,
  slides = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  ctaText,
  ctaLink,
  ctaSecondaryText,
  ctaSecondaryLink,
  theme,
}) => {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const total = slides?.length ?? 0;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || paused || total <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, paused, autoPlayInterval, next, total]);

  if (!enabled || !total) return null;

  const hero = theme?.components?.hero ?? {};
  const c    = theme?.colors ?? {};
  const btn  = theme?.components?.button?.icon ?? {};

  const wrapperStyle = {
    position: "relative",
    width: "100%",
    minHeight: hero.minHeight ?? "90vh",
    overflow: "hidden",
    background: "#1a1a2e",
  };

  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: "24px",
    transform: "translateY(-50%)",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.25)",
    cursor: "pointer",
    transition: `background ${theme?.transitions?.normal ?? "0.25s ease"}`,
  });

  const dotsWrapStyle = {
    position: "absolute",
    bottom: "36px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  };

  // Progress bar for current slide
  const progressStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "3px",
    background: c.secondary ?? "#e94560",
    zIndex: 10,
    width: `${((current + 1) / total) * 100}%`,
    transition: "width 0.4s ease",
  };

  return (
    <section
      style={wrapperStyle}
      aria-label="Hero banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <Slide
          key={slide.id ?? i}
          slide={slide}
          active={i === current}
          ctaText={ctaText}
          ctaLink={ctaLink}
          ctaSecondaryText={ctaSecondaryText}
          ctaSecondaryLink={ctaSecondaryLink}
          theme={theme}
        />
      ))}

      {/* Navigation arrows (only if more than 1 slide) */}
      {total > 1 && (
        <>
          <button
            aria-label="Previous slide"
            style={arrowStyle("left")}
            onClick={prev}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next slide"
            style={arrowStyle("right")}
            onClick={next}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Slide dots */}
      <div style={dotsWrapStyle}>
        <SliderDots count={total} current={current} onSelect={setCurrent} theme={theme} />
      </div>

      {/* Progress bar */}
      <div style={progressStyle} aria-hidden="true" />
    </section>
  );
};

export default Hero;
