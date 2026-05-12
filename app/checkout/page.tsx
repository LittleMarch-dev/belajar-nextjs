// app/checkout/page.tsx
"use client";

import { useKasir } from "../../hooks/useKasir";
import Link from "next/link";

export default function CheckoutPage() {
  const kasir = useKasir();

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <Link href="/" className="text-blue-500 mb-4 inline-block">← Kembali Belanja</Link>
      
      <h1 className="text-2xl font-bold mb-6">Detail Pesanan</h1>

      {/* Ringkasan Belanja dari Zustand */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
        <h2 className="font-semibold mb-2">Item yang dipesan:</h2>
        {kasir.keranjang.map((item) => (
          <div key={item.nama} className="flex justify-between border-b py-2">
            <span>{item.nama} x{item.qty}</span>
          </div>
        ))}
        <div className="mt-4 font-bold text-lg text-green-700">
          Total Bayar: Rp {kasir.totalBayar.toLocaleString()}
        </div>
      </div>

      {/* Area Form Checkout kamu (Kita akan integrasikan nanti) */}
      <div className="bg-white p-6 border rounded-xl shadow-sm">
        <h2 className="font-semibold mb-4 text-gray-700">Alamat Pengiriman di Cirebon</h2>
        <p className="text-sm text-gray-500 mb-4">Silakan masukkan detail pengiriman agar sayur segera meluncur!</p>
        
        {/* Kamu bisa memindahkan isi FormCheckout.tsx ke sini nanti */}
        <div className="space-y-4">
           <input className="w-full border p-2 rounded" placeholder="Nama Lengkap" />
           <textarea className="w-full border p-2 rounded" placeholder="Alamat Lengkap di Cirebon" />
           <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">
             Konfirmasi Pesanan
           </button>
        </div>
      </div>
    </div>
  );
}