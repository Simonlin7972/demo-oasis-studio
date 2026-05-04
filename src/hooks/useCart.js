// Cart hook — localStorage-backed cart state

const { useState, useCallback } = React;

function useCart(key = 'oasis-cart') {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch { return []; }
  });
  const save = (next) => {
    setItems(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  const add = useCallback((product, size = 'M', qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id && i.size === size);
      let next;
      if (idx >= 0) {
        next = prev.map((item, i) => i === idx ? { ...item, qty: item.qty + qty } : item);
      } else {
        next = [...prev, { id: product.id, name: product.name, price: product.price, img: product.img, size, qty }];
      }
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  const updateQty = useCallback((id, size, qty) => {
    setItems(prev => {
      const next = qty <= 0
        ? prev.filter(i => !(i.id === id && i.size === size))
        : prev.map(i => (i.id === id && i.size === size) ? { ...i, qty } : i);
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  const remove = useCallback((id, size) => {
    setItems(prev => {
      const next = prev.filter(i => !(i.id === id && i.size === size));
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
  return { items, add, updateQty, remove, totalItems, totalPrice };
}

window.useCart = useCart;
