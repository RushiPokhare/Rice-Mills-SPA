"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Order } from "@/lib/types"

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrderById: (orderId: string) => Order | undefined
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
}

export const useOrders = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: "ORD-001",
          orderDate: "2025-01-15",
          totalAmount: 1250,
          status: "delivered",
          items: [
            {
              id: "1",
              name: "Premium Basmati Rice",
              category: "Rice",
              price: 450,
              description: "Long grain, aromatic basmati rice",
              image: "/placeholder.svg",
              stock: 150,
              rating: 4.8,
              reviews: 234,
              quantity: 2,
            },
          ],
          shippingAddress: "123 Main Street, New York, NY 10001",
        },
        {
          id: "ORD-002",
          orderDate: "2025-01-10",
          totalAmount: 680,
          status: "shipped",
          items: [
            {
              id: "3",
              name: "Jasmine Rice",
              category: "Rice",
              price: 320,
              description: "Fragrant jasmine rice",
              image: "/placeholder.svg",
              stock: 120,
              rating: 4.7,
              reviews: 189,
              quantity: 2,
            },
          ],
          shippingAddress: "123 Main Street, New York, NY 10001",
        },
        {
          id: "ORD-003",
          orderDate: "2025-01-05",
          totalAmount: 520,
          status: "pending",
          items: [
            {
              id: "5",
              name: "Quinoa Seeds",
              category: "Grains",
              price: 520,
              description: "Premium quinoa seeds",
              image: "/placeholder.svg",
              stock: 45,
              rating: 4.9,
              reviews: 178,
              quantity: 1,
            },
          ],
          shippingAddress: "123 Main Street, New York, NY 10001",
        },
      ],

      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },

      getOrderById: (orderId: string) => {
        return get().orders.find((order) => order.id === orderId)
      },

      updateOrderStatus: (orderId: string, status: Order["status"]) => {
        set((state) => ({
          orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
        }))
      },
    }),
    {
      name: "orders-storage",
    },
  ),
)
