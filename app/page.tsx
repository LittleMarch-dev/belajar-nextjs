"use client";

import { useKasir } from "../hooks/useKasir";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Plus, Search } from "lucide-react"; // Ikon opsional jika sudah instal lucide-react

export default function Home() {
  const kasir = useKasir();

  if (kasir.loading)
    return (
      <div className="flex h-screen items-center justify-center font-medium text-slate-500">
        Memuat Sayur Segar Cirebon...
      </div>
    );

  return (
    <main className="min-h-screen bg-slate-50/30 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER: Navigasi & Branding */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-white p-6 rounded-2xl border shadow-sm">
          <div>
            <h1 className="text-3xl font-black text-green-700 tracking-tight">
              Cirebon Sayur
            </h1>
            <p className="text-slate-500 text-sm">
              Belanja hasil kebun lokal lebih mudah dan segar.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Bar Sederhana */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari sayur..."
                value={kasir.searchTerm}
                onChange={(e) => kasir.setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 transition-all text-sm"
              />
            </div>

            <Link href="/checkout">
              <Button
                className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100 rounded-xl px-6"
                disabled={kasir.keranjang.length === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />(
                {kasir.keranjang.length})
              </Button>
            </Link>
          </div>
        </header>

        {/* GRID PRODUK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kasir.filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-md transition-all border-slate-200 overflow-hidden flex flex-col justify-between"
            >
              <CardHeader className="p-0">
                {/* Placeholder Gambar - Bisa diganti <img> asli nanti */}
                <img
                  src={`https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400`} // Contoh gambar sayur
                  alt={product.detail.nama}
                  className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </CardHeader>

              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-bold text-slate-800 leading-tight">
                    {product.detail.nama}
                  </CardTitle>
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">
                    {product.detail.vendor}
                  </span>
                </div>
                <p className="text-xl font-black text-green-600">
                  Rp {product.harga.toLocaleString()}
                </p>
              </CardContent>

              <CardFooter className="pt-0 pb-4 px-4">
                <Button
                  onClick={() => kasir.handleItem(product.detail.nama, product.harga)}
                  className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold rounded-xl transition-all"
                >
                  <Plus className="mr-1 h-4 w-4" /> Tambah
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
