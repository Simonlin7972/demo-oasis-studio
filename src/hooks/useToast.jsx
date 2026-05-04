// Toast notification hook — returns [show(msg), ToastElement]

const { useState, useRef, useCallback } = React;

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

window.useToast = useToast;
