// Wishlist hook — localStorage-backed Set with toggle

const { useState, useCallback } = React;

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

window.useWishlist = useWishlist;
