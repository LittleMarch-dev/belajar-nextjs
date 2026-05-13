"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function hapusPesanan(id: number) {
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