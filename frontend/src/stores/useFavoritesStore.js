import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      destinations: [],
      culinary: [],
      hotels: [],

      toggleDestination: (destination) =>
        set((state) => {
          const exists = state.destinations.some((d) => d.id === destination.id);
          if (exists) {
            return { destinations: state.destinations.filter((d) => d.id !== destination.id) };
          }
          return { destinations: [...state.destinations, { ...destination, favoritedAt: Date.now() }] };
        }),

      toggleCulinary: (place) =>
        set((state) => {
          const exists = state.culinary.some((c) => c.id === place.id);
          if (exists) {
            return { culinary: state.culinary.filter((c) => c.id !== place.id) };
          }
          return { culinary: [...state.culinary, { ...place, favoritedAt: Date.now() }] };
        }),

      toggleHotel: (hotel) =>
        set((state) => {
          const exists = state.hotels.some((h) => h.id === hotel.id);
          if (exists) {
            return { hotels: state.hotels.filter((h) => h.id !== hotel.id) };
          }
          return { hotels: [...state.hotels, { ...hotel, favoritedAt: Date.now() }] };
        }),

      isDestinationFavorite: (id) => get().destinations.some((d) => d.id === id),

      isCulinaryFavorite: (id) => get().culinary.some((c) => c.id === id),

      isHotelFavorite: (id) => get().hotels.some((h) => h.id === id),

      clearAll: () => set({ destinations: [], culinary: [], hotels: [] }),

      getAllFavorites: () => {
        const { destinations, culinary, hotels } = get();
        return { destinations, culinary, hotels };
      },

      getFavoriteCount: () => {
        const { destinations, culinary, hotels } = get();
        return destinations.length + culinary.length + hotels.length;
      },
    }),
    {
      name: 'travelindo-favorites',
      partialize: (state) => ({
        destinations: state.destinations,
        culinary: state.culinary,
        hotels: state.hotels,
      }),
    }
  )
);