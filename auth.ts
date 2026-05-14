// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Ganti dengan username & password admin startup kamu
        if (credentials.username === "admin" && credentials.password === "cirebon_maju") {
          return { id: "1", name: "Admin Cirebon" }
        }
        return null
      },
    }),
  ],
})