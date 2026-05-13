// app/checkout/action.tsx
"use server";

import prisma from "@/lib/prisma";


// 1. Definisikan dan EKSPOR di sini
export interface FormState {
  success: boolean;
  message: string;
}

// 2. Hapus baris 'import { FormState } from "./action"' jika ada di file ini!
export async function buatPesanan(prevState: FormState | null, formData: FormData) {
  if (!formData) return { success: false, message: "Data tidak ditemukan" };

  const nama = formData.get("nama") as string;
  const alamat = formData.get("alamat") as string;
  const items = formData.get("items") as string;

  try {
    await prisma.order.create({
      data: { nama, alamat, items }
    });

    return { 
      success: true, 
      message: `Mantap ${nama}, pesanan sayurmu sudah tersimpan di database!` 
    };
  } catch (e) {
    console.error("Database Error:", e);
    return { success: false, message: "Gagal menyimpan pesanan." };
  }
}