// Container-based responsive viewport provider (ResizeObserver, not window)

const ViewportCtx = React.createContext({ bp: 'desktop', w: 1440 });
function useViewport() { return React.useContext(ViewportCtx); }

function ViewportProvider({ children }) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0].contentRect.width;
      if (cw > 0) setW(cw);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const bp = w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <ViewportCtx.Provider value={{ bp, w }}>{children}</ViewportCtx.Provider>
    </div>
  );
}

// Shorthand helpers
const isM = (bp) => bp === 'mobile';
const isT = (bp) => bp === 'tablet';
const isD = (bp) => bp === 'desktop';
const notD = (bp) => bp !== 'desktop';
const pad = (bp) => isM(bp) ? '20px' : isT(bp) ? '32px' : '56px';

Object.assign(window, { ViewportCtx, useViewport, ViewportProvider, isM, isT, isD, notD, pad });
