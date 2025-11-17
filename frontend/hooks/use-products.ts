"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/types"
import { PRODUCTS } from "@/lib/products-data"

interface ProductsStore {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
}

export const useProducts = create<ProductsStore>()(
  persist(
    (set, get) => ({
      products: PRODUCTS,

      addProduct: (product: Product) => {
        set((state) => ({
          products: [...state.products, product],
        }))
      },

      updateProduct: (id: string, updates: Partial<Product>) => {
        set((state) => ({
          products: state.products.map((product) => (product.id === id ? { ...product, ...updates } : product)),
        }))
      },

      deleteProduct: (id: string) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }))
      },

      getProductById: (id: string) => {
        return get().products.find((product) => product.id === id)
      },
    }),
    {
      name: "products-storage",
    },
  ),
)
