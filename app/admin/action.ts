"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"

export async function hapusPesanan(id: number) {
  const session = await auth()
  if (!session) throw new Error("Akses ditolak! Kamu bukan admin.")
  try {
    await prisma.order.delete({
      where: { id: id },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus:", error);
    return { success: false };
  }
}