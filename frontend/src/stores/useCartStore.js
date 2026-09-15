import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from '@/lib/utils';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,
      isLoading: false,
      error: null,

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.id === item.id && i.type === item.type
          );

          if (existingIndex >= 0) {
            const updated = [...state.items];
            updated[existingIndex] = { ...updated[existingIndex], quantity: (updated[existingIndex].quantity || 1) + 1 };
            return { items: updated };
          }

          return { items: [...state.items, { ...item, id: item.id || generateId('cart-'), quantity: item.quantity || 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      applyPromo: (code, discount) => set({ promoCode: code, promoDiscount: discount }),

      removePromo: () => set({ promoCode: null, promoDiscount: 0 }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
      },

      getTotal: () => {
        const { items, promoDiscount } = get();
        const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
        return Math.max(0, subtotal - promoDiscount);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'travelindo-cart',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
      }),
    }
  )
);