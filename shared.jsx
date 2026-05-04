// Shared hooks + tiny components used across all variations
// Loaded as type="text/babel" so JSX works.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---------- countdown hook ---------- */
function useCountdown(targetISO) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

/* ---------- toast hook ---------- */
function useToast() {
  const [msg, setMsg] = useState(null);
  const timer = useRef(null);
  const show = useCallback((m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2400);
  }, []);
  const Toast = msg ? <div className="oasis-toast">{msg}</div> : null;
  return [show, Toast];
}

/* ---------- wishlist hook (per-variation localStorage key) ---------- */
function useWishlist(key = 'oasis-wishlist') {
  const [ids, setIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
    catch { return new Set(); }
  });
  const toggle = useCallback((id) => {
    setIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem(key, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, [key]);
  return [ids, toggle];
}

/* ---------- carousel hook ---------- */
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

/* ---------- icons (inline SVGs) ---------- */
const Icon = {
  search: (p) => <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="9" cy="9" r="6"/><path d="m14 14 4 4" strokeLinecap="round"/></svg>,
  cart: (p) => <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M3 4h2l2 10h9l2-7H6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="17" r="1.2" fill="currentColor"/><circle cx="15" cy="17" r="1.2" fill="currentColor"/></svg>,
  heart: ({ filled, ...p }) => <svg viewBox="0 0 20 20" width="18" height="18" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" {...p}><path d="M10 17s-6-3.5-6-8a3.5 3.5 0 0 1 6-2.5A3.5 3.5 0 0 1 16 9c0 4.5-6 8-6 8z" strokeLinejoin="round"/></svg>,
  arrow: (p) => <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M4 10h12m0 0-4-4m4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowL: (p) => <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M16 10H4m0 0 4-4m-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  star: (p) => <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" {...p}><path d="m10 2 2.4 5 5.6.8-4 4 1 5.6L10 14.8 4.9 17.4l1-5.6-4-4 5.6-.8z"/></svg>,
  sun: (p) => <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="10" cy="10" r="3.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.5 1.5M14 14l1.5 1.5M4.5 15.5 6 14M14 6l1.5-1.5" strokeLinecap="round"/></svg>,
  drop: (p) => <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M10 2.5s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z" strokeLinejoin="round"/></svg>,
  pet: (p) => <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" {...p}><circle cx="6" cy="7" r="1.5"/><circle cx="14" cy="7" r="1.5"/><circle cx="4" cy="11" r="1.2"/><circle cx="16" cy="11" r="1.2"/><path d="M10 11c-3 0-5 2-5 4 0 1.5 1 2 2 2 1 0 1.5-.5 3-.5s2 .5 3 .5 2-.5 2-2c0-2-2-4-5-4z"/></svg>,
  menu: (p) => <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round"/></svg>,
  play: (p) => <svg viewBox="0 0 20 20" fill="currentColor" {...p}><path d="M6 4l11 6-11 6z"/></svg>,
  leaf: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M3 17c0-7 5-13 14-14-1 9-7 14-14 14zM3 17c4-4 7-7 11-10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

/* ---------- price formatter ---------- */
const NT = (n) => 'NT$ ' + n.toLocaleString('zh-Hant');

/* ---------- SafeImg: img with onError fallback ---------- */
const PLANT_FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='xMidYMid slice'>
    <rect width='200' height='200' fill='#dde5d6'/>
    <g fill='none' stroke='#5a7158' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' opacity='.85'>
      <path d='M100 165 V95'/>
      <path d='M100 130 C70 125 55 110 55 88 C75 88 92 100 100 120'/>
      <path d='M100 110 C130 105 145 90 145 68 C125 68 108 80 100 100'/>
      <path d='M100 95 C82 92 72 80 72 64 C86 64 96 74 100 88'/>
      <path d='M100 80 C118 77 128 65 128 49 C114 49 104 59 100 73'/>
    </g>
    <ellipse cx='100' cy='168' rx='34' ry='5' fill='#a89178' opacity='.6'/>
  </svg>`
);
function SafeImg({ src, alt = '', style, fallback = PLANT_FALLBACK, ...rest }) {
  const [errored, setErrored] = useState(false);
  return (
    <img src={errored ? fallback : src} alt={alt} loading="lazy"
      onError={() => { if (!errored) setErrored(true); }}
      style={style} {...rest}/>
  );
}

/* expose */
Object.assign(window, {
  useCountdown, useToast, useWishlist, useCarousel, Icon, NT, SafeImg,
});
