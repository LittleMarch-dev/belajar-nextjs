"use client"

import { useQuery } from "@tanstack/react-query"

async function fetchOrders() {
  const res = await fetch('/api/orders') // Kita butuh API route sederhana
  return res.json()
}

export default function OrderList() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchInterval: 5000, // Ambil data otomatis setiap 5 detik! 🚀
  })

  if (isLoading) return <p>Sedang memuat pesanan...</p>

  return (
    <div>
      {/* Gunakan logika tampilan yang sama dengan dashboard admin sebelumnya */}
      {orders?.map((order: any) => (
        <div key={order.id}>{order.nama}</div>
      ))}
    </div>
  )
}