"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation" // Wajib impor ini

export type LoginState = string | null;

export async function loginAdmin(
  prevState: LoginState, 
  formData: FormData
): Promise<LoginState> {
  let isSuccess = false;

  try {
    // 1. Jalankan Sign In (Jangan redirect otomatis di sini)
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false, // Kita handle redirect manual agar lebih stabil
    })
    isSuccess = true;
  } catch (error) {
    if (error instanceof AuthError) {
      return "Username atau Password salah!";
    }
    return "Terjadi kesalahan sistem.";
  }

  // 2. Jika sukses, panggil redirect di luar try-catch
  if (isSuccess) {
    redirect("/admin");
  }

  return null;
}