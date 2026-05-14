// app/login/page.tsx
"use client"

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "./action";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  // Inisialisasi state dengan null (sesuai tipe LoginState)
  const [errorMessage, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAdmin, 
    null
  );

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Login Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded border border-red-100">
                {errorMessage}
              </p>
            )}
            
            <div className="space-y-2">
              <input 
                name="username" 
                placeholder="Username" 
                className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" 
                required 
              />
            </div>

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isPending ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}