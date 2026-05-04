// Inline SVG icon set

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
  trash: (p) => <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M4 5h12M8 5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1m2 0v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5h10z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 8v6M11 8v6" strokeLinecap="round"/></svg>,
};

window.Icon = Icon;
