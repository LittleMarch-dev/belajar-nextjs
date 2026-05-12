// store/useKasirStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Keranjang } from '../hooks/useKasir';

interface KasirState {
  keranjang: Keranjang[];
  tambahItem: (namaItem: string) => void;
  kurangiItem: (namaItem: string) => void;
  hapusItem: (namaItem: string) => void;
}

export const useKasirStore = create<KasirState>()(
  persist(
    (set) => ({
      keranjang: [],

      tambahItem: (namaItem) => set((state) => {
        const isExist = state.keranjang.find((item) => item.nama === namaItem);
        if (isExist) {
          return {
            keranjang: state.keranjang.map((item) =>
              item.nama === namaItem ? { ...item, qty: item.qty + 1 } : item
            ),
          };
        }
        return { keranjang: [...state.keranjang, { nama: namaItem, qty: 1 }] };
      }),

      kurangiItem: (namaItem) => set((state) => ({
        keranjang: state.keranjang
          .map((item) => (item.nama === namaItem ? { ...item, qty: item.qty - 1 } : item))
          .filter((item) => item.qty > 0),
      })),

      hapusItem: (namaItem) => set((state) => ({
        keranjang: state.keranjang.filter((item) => item.nama !== namaItem),
      })),
    }),
    {
      name: 'keranjang-storage-cirebon', // Nama di localStorage otomatis
    }
  )
);