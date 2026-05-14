"use client";

import { useKasir } from "../../hooks/useKasir";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buatPesanan, type FormState } from "./action";
import { useActionState } from "react"; // Hook baru

export default function CheckoutPage() {
  const kasir = useKasir();
  const { keranjang, totalBayar, handleItem, KurangiItem, HapusBaris } = kasir;
  const [state, formAction, isPending] = useActionState<
    FormState | null,
    FormData
  >(buatPesanan, null);

  return (
    // Mengubah max-w-2xl menjadi 5xl agar lebih lebar
    <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen bg-slate-50/30">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="text-sm font-medium text-green-600 hover:underline flex items-center gap-2"
        >
          <span>←</span> Kembali Belanja Sayur
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() =>
            confirm("Kosongkan keranjang?") &&
            keranjang.forEach((i) => HapusBaris(i.nama))
          }
        >
          Reset Keranjang
        </Button>
      </div>

      <h1 className="text-3xl font-black text-slate-900 mb-8">
        Checkout Pesanan
      </h1>

      {/* Grid System: Berdampingan di Desktop (md:grid-cols-2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* KOLOM KIRI: Ringkasan Belanja */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b bg-white">
            <CardTitle className="text-lg font-bold text-slate-700">
              Ringkasan Keranjang
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 bg-white">
            {keranjang.length === 0 ? (
              <p className="text-center text-slate-400 py-10">
                Keranjang kosong.
              </p>
            ) : (
              keranjang.map((item) => (
                <div
                  key={item.nama}
                  className="flex justify-between items-center pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 block">
                      {item.nama}
                    </span>
                    <button
                      onClick={() => HapusBaris(item.nama)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-lg">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 bg-white"
                      onClick={() => KurangiItem(item.nama)}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center font-bold text-xs">
                      {item.qty}
                    </span>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 bg-white"
                      onClick={() => handleItem(item.nama, item.harga)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter className="bg-green-50 flex justify-between items-center py-6 border-t rounded-b-xl">
            <span className="font-bold text-slate-700">Total:</span>
            <span className="text-xl font-black text-green-700">
              Rp {totalBayar.toLocaleString()}
            </span>
          </CardFooter>
        </Card>

        {/* KOLOM KANAN: Data Pengiriman */}
        {/* KOLOM KANAN: Data Pengiriman */}
        <form action={formAction} className="space-y-4">
          {/* Input Nama */}
          <div className="space-y-1">
            <input
              name="nama"
              type="text"
              placeholder="Nama Penerima"
              className={`w-full border p-3 rounded-xl outline-green-500 ${
                state?.errors?.nama ? "border-red-500" : "border-slate-200"
              }`}
            />
            {state?.errors?.nama && (
              <p className="text-red-500 text-xs ml-1">
                {state.errors.nama[0]}
              </p>
            )}
          </div>

          {/* Input Alamat */}
          <div className="space-y-1">
            <textarea
              name="alamat"
              placeholder="Alamat Lengkap di Cirebon"
              className={`w-full border p-3 rounded-xl h-24 outline-green-500 ${
                state?.errors?.alamat ? "border-red-500" : "border-slate-200"
              }`}
            ></textarea>
            {state?.errors?.alamat && (
              <p className="text-red-500 text-xs ml-1">
                {state.errors.alamat[0]}
              </p>
            )}
          </div>

          {/* Input tersembunyi untuk mengirim data keranjang */}
          <input type="hidden" name="items" value={JSON.stringify(keranjang)} />

          {/* Pesan Error Umum untuk Keranjang */}
          {state?.errors?.items && (
            <p className="text-red-500 text-sm font-bold text-center bg-red-50 p-2 rounded">
              {state.errors.items[0]}
            </p>
          )}

          {/* Pesan Sukses */}
          {state?.success && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center font-bold animate-bounce">
              {state.message}
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending || keranjang.length === 0}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg font-bold"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">🌀</span> Sedang Memproses...
              </span>
            ) : (
              "Konfirmasi Pesanan ➔"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
