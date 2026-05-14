// app/checkout/action.tsx
"use server";

import prisma from "@/lib/prisma";
import { OrderSchema } from "@/lib/zod"; // Impor skema Zod

export interface FormState {
  success: boolean;
  message: string;
  errors?: {
    nama?: string[];
    alamat?: string[];
    items?: string[];
  };
}

export async function buatPesanan(prevState: FormState | null, formData: FormData): Promise<FormState> {
  // 1. Ambil data dari form
  const rawData = {
    nama: formData.get("nama") as string,
    alamat: formData.get("alamat") as string,
    items: formData.get("items") as string,
  };

  // 2. Validasi dengan Zod
  const validatedFields = OrderSchema.safeParse(rawData);

  // 3. Jika validasi GAGAL
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Data yang kamu masukkan belum lengkap.",
      // Mengambil pesan error spesifik dari Zod
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 4. Jika validasi BERHASIL, baru simpan ke Prisma
  try {
    const { nama, alamat, items } = validatedFields.data;

    await prisma.order.create({
      data: { nama, alamat, items }
    });

    return { 
      success: true, 
      message: `Mantap ${nama}, pesanan sayurmu sudah tersimpan!` 
    };
  } catch (e) {
    console.error("Database Error:", e);
    return { success: false, message: "Gagal menyimpan pesanan ke server." };
  }
}