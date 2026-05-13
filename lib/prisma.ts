// lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const dbUrl = "file:./prisma/dev.db";

const adapter = new PrismaLibSql({
  url: dbUrl
});

// Mengganti 'any' dengan tipe data yang spesifik
const globalForPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

// Mengekspor instance prisma
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ 
    adapter 
  });

// Simpan ke global jika bukan di production agar tidak kelebihan koneksi saat reload
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;