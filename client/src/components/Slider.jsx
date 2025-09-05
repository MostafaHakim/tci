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

  // Autoplay
  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    if (hoveringRef.current || focusRef.current) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (loop ? (i + 1) % count : Math.min(i + 1, count - 1)));
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval, count, loop, index]);

  // Pause on hover & focus
  const onMouseEnter = () => {
    hoveringRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const onMouseLeave = () => {
    hoveringRef.current = false;
  };
  const onFocus = () => {
    focusRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const onBlur = () => {
    focusRef.current = false;
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
    >
      {/* Slides track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={trackStyle}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full relative">
            <img
              src={slide.src}
              alt={slide.alt || `Slide ${i + 1}`}
              className="block w-full h-full md:h-full object-cover"
              draggable={false}
            />
            {(slide.caption || slide.tag) && (
              <div className="absolute inset-x-0 top-40 sm:top-80 md:top-100 lg:top-150 p-4 md:p-6 bg-gradient-to-tr from-black/60 to-transparent text-white ">
                {slide.tag && (
                  <span className="inline-block mb-2 text-xl font-medium tracking-wide uppercase bg-white/10 backdrop-blur px-3 py-1 rounded-full">
                    {slide.tag}
                  </span>
                )}
                {slide.caption && (
                  <p className="text-lg md:text-sm font-semibold drop-shadow-sm">
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
            className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow active:scale-95"
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
              className="md:w-6 md:h-6"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow active:scale-95"
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
              className="md:w-6 md:h-6"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Demo Page ---

export default Slider;
