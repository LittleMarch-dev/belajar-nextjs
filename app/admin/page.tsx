"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hapusPesanan } from "./action";
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/admin/LogoutButton"; // Impor ini

interface OrderItem {
  nama: string;
  qty: number;
  harga?: number;
}

export default function AdminPage() {
  // Prio 3: Implementasi TanStack Query
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Gagal mengambil data");
      return res.json();
    },
    refetchInterval: 5000, // Auto-update setiap 5 detik 🚀
  });

  if (isLoading) return <div className="p-10 text-center">Memuat data...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Koneksi bermasalah. Mencoba lagi...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <LogoutButton /> {/* Gunakan komponen logout di sini */}
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Pesanan</h1>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            {orders?.length || 0} Pesanan Masuk
          </div>
        </div>

        <div className="grid gap-6">
          {!orders || orders.length === 0 ? (
            <Card><CardContent className="p-10 text-center">Belum ada pesanan.</CardContent></Card>
          ) : (
            orders.map((order: any) => {
              const items: OrderItem[] = JSON.parse(order.items);
              const totalBelanja = items.reduce((acc, item) => acc + (item.harga || 0) * item.qty, 0);

              return (
                <Card key={order.id} className="overflow-hidden border-l-4 border-l-green-500 shadow-sm">
                  <CardHeader className="bg-white pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-slate-800">{order.nama}</CardTitle>
                        <p className="text-sm text-slate-500 mt-1 uppercase tracking-wide">{order.alamat}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className="text-xs font-medium bg-slate-100 px-3 py-1 rounded-md">
                          {new Date(order.createdAt).toLocaleString("id-ID")}
                        </span>
                        
                        {/* Tombol Hapus tetap menggunakan Server Action */}
                        <button 
                          onClick={async () => await hapusPesanan(order.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold"
                        >
                          Hapus Pesanan
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm py-2 border-b last:border-0">
                            <span>{item.nama} x{item.qty}</span>
                            <span>{item.harga ? `Rp ${(item.harga * item.qty).toLocaleString()}` : "NaN"}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 flex justify-between items-center border-t-2 border-dashed border-slate-200">
                        <span className="text-sm font-bold">Total Pembayaran</span>
                        <span className="text-xl font-black text-green-600">Rp {totalBelanja.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}