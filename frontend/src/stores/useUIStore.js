import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',
      sidebarOpen: false,
      mobileMenuOpen: false,
      searchOpen: false,
      toasts: [],
      modals: {},

      setTheme: (theme) => set({ theme }),

      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),

      toggleTheme: () =>
        set((state) => {
          const themes = ['light', 'dark', 'system'];
          const next = themes[(themes.indexOf(state.theme) + 1) % 3];
          return { theme: next };
        }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      closeSidebar: () => set({ sidebarOpen: false }),

      openSidebar: () => set({ sidebarOpen: true }),

      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

      closeMobileMenu: () => set({ mobileMenuOpen: false }),

      openMobileMenu: () => set({ mobileMenuOpen: true }),

      toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),

      closeSearch: () => set({ searchOpen: false }),

      openSearch: () => set({ searchOpen: true }),

      addToast: (toast) =>
        set((state) => ({
          toasts: [...state.toasts, { id: Date.now(), ...toast }],
        })),

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      clearToasts: () => set({ toasts: [] }),

      openModal: (key, props = {}) =>
        set((state) => ({
          modals: { ...state.modals, [key]: { open: true, ...props } },
        })),

      closeModal: (key) =>
        set((state) => {
          const { [key]: _, ...rest } = state.modals;
          return { modals: rest };
        }),

      closeAllModals: () => set({ modals: {} }),

      isModalOpen: (key) => get().modals[key]?.open ?? false,
    }),
    {
      name: 'travelindo-ui',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);