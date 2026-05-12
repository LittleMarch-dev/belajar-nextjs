"use client"; // WAJIB: Karena kita menggunakan state dan hooks

import { useKasir } from "../hooks/useKasir"; // Sesuaikan path-nya

export default function Home() {
  const kasir = useKasir();

  if (kasir.loading) return <div className="p-10">Memuat data sayur Cirebon...</div>;
  if (kasir.error) return <div className="p-10 text-red-500">Error: {kasir.error}</div>;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Startup Sayur Cirebon</h1>
      
      <div className="mb-6 p-4 bg-green-100 rounded-lg">
        <p className="font-semibold">Total Bayar: Rp {kasir.totalBayar.toLocaleString()}</p>
        <p className="text-sm text-gray-600">Jumlah Item: {kasir.keranjang.length}</p>
      </div>

      <div className="grid gap-4">
        {kasir.filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{product.detail.nama}</h3>
              <p className="text-sm text-gray-500">{product.detail.vendor}</p>
              <p className="text-green-600">Rp {product.harga.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => kasir.handleItem(product.detail.nama)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tambah
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}