import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useKasirStore } from "../store/useKasirStore";

export interface Product {
  id: string;
  detail: {
    nama: string;
    vendor: string;
  };
  harga: number;
}

export interface DummyProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
}

export interface Keranjang {
  nama: string;
  qty: number;
  harga: number; // Tambahkan properti ini agar tidak NaN lagi
}

export const useKasir = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { keranjang, tambahItem, kurangiItem, hapusItem } = useKasirStore();

  // 1. Ambil data HANYA dengan useQuery (hapus useEffect & useState products)
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["products-sayur"],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/products/category/smartphones');
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();

      // Langsung format datanya di sini
      return data.products.map((p: DummyProduct) => ({
        id: String(p.id),
        detail: { nama: p.title, vendor: p.brand },
        harga: p.price * 15000 // Konversi ke Rupiah
      }));
    },
    staleTime: 1000 * 60 * 5, // Simpan di memori selama 5 menit
  });

  // 2. Logika Hitung Total
  const totalBayar = keranjang.reduce((acc, item) => {
    const hargaSatuan = products.find((o) => o.detail.nama === item.nama)?.harga || 0;
    return acc + hargaSatuan * item.qty;
  }, 0);

  // 3. Logika Filter Pencarian
  const filteredProducts = products.filter((p) =>
    p.detail.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    products,
    loading: isLoading, // Gunakan isLoading dari useQuery
    error: error instanceof Error ? error.message : null,
    keranjang,
    handleItem: tambahItem,
    KurangiItem: kurangiItem,
    HapusBaris: hapusItem,
    totalBayar,
    searchTerm,
    setSearchTerm,
    filteredProducts,
  };
};