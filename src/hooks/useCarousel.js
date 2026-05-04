// Carousel hook — auto-rotating index with pause/resume

const { useState, useEffect, useRef } = React;

function useCarousel(length, autoMs = 6000) {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  useEffect(() => {
    if (!autoMs) return;
    const t = setInterval(() => {
      if (!paused.current) setI(p => (p + 1) % length);
    }, autoMs);
    return () => clearInterval(t);
  }, [length, autoMs]);
  return {
    i,
    set: setI,
    next: () => setI(p => (p + 1) % length),
    prev: () => setI(p => (p - 1 + length) % length),
    pause: () => { paused.current = true; },
    resume: () => { paused.current = false; },
  };
}

window.useCarousel = useCarousel;
