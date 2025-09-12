import React, { useEffect, useMemo, useRef, useState } from "react";

function Slider({
  slides = [],
  autoPlay = true,
  interval = 3500,
  loop = true,
  showArrows = true,
  showDots = true,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);
  const focusRef = useRef(false);
  const containerRef = useRef(null);

  const count = slides.length;

  const goTo = (i) => {
    if (count === 0) return;
    if (loop) {
      setIndex((i + count) % count);
    } else {
      setIndex(Math.max(0, Math.min(i, count - 1)));
    }
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // start timer helper
  const startTimer = () => {
    if (!autoPlay || count <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (loop ? (i + 1) % count : Math.min(i + 1, count - 1)));
    }, interval);
  };

  // stop timer helper
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Autoplay effect (watches autoPlay, interval, count, loop)
  useEffect(() => {
    // only start if not hovering/focused
    if (!autoPlay || count <= 1) {
      stopTimer();
      return;
    }
    if (hoveringRef.current || focusRef.current) {
      stopTimer();
      return;
    }
    startTimer();
    return () => stopTimer();
    // intentionally not depending on `index` to avoid restarting each tick
  }, [autoPlay, interval, count, loop]);

  // Pause on hover & focus
  const onMouseEnter = () => {
    hoveringRef.current = true;
    stopTimer();
  };
  const onMouseLeave = () => {
    hoveringRef.current = false;
    // restart when leaving if allowed
    if (!focusRef.current) startTimer();
  };
  const onFocus = () => {
    focusRef.current = true;
    stopTimer();
  };
  const onBlur = () => {
    focusRef.current = false;
    if (!hoveringRef.current) startTimer();
  };

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Touch / drag swipe
  const startX = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);

  const onTouchStart = (e) => {
    dragging.current = true;
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
  };
  const onTouchMove = (e) => {
    if (!dragging.current) return;
    currentX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!dragging.current) return;
    const delta = currentX.current - startX.current;
    const threshold = 40; // px
    if (delta > threshold) prev();
    if (delta < -threshold) next();
    dragging.current = false;
  };

  // Compute offset for translateX
  const trackStyle = useMemo(() => {
    return {
      transform: `translateX(-${index * 100}%)`,
    };
  }, [index]);

  if (count === 0) {
    return (
      <div
        className={
          "w-full h-64 grid place-items-center bg-gray-50 rounded-2xl border " +
          className
        }
      >
        <p className="text-gray-500">No slides provided</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`relative w-full select-none overflow-hidden rounded-2xl shadow-lg ${className}`}
      aria-roledescription="carousel"
      aria-label="Image Slider"
    >
      {/* Slides track */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={trackStyle}
      >
        {slides.map((slide, i) => (
          <div
            key={slide._id || i}
            className="min-w-full relative h-64 md:h-96"
          >
            <img
              src={slide.slideImageUrl}
              alt={slide.alt || slide.caption || `Slide ${i + 1}`}
              className="block w-full h-full object-cover rounded-2xl"
              draggable={false}
            />

            {/* Center overlay (beautiful UI) */}
            {/* Bottom-left overlay */}
            {(slide.caption || slide.tag) && (
              <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 md:left-8 md:bottom-8 flex flex-col items-start text-left max-w-xs sm:max-w-sm md:max-w-md">
                {slide.tag && (
                  <span className="inline-block mb-2 text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase bg-black/50 text-white px-3 py-1.5 rounded-full shadow-sm">
                    {slide.tag}
                  </span>
                )}
                {slide.caption && (
                  <p className="text-white font-semibold text-sm sm:text-base md:text-lg drop-shadow-md">
                    {slide.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-5 md:h-5"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-5 md:h-5"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 md:h-2 rounded-full transition-all focus:outline-none ${
                i === index
                  ? "w-8 md:w-10 bg-white"
                  : "w-3 md:w-4 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
