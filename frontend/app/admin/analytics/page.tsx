"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { useOrders } from "@/hooks/use-orders"
import { useProducts } from "@/hooks/use-products"
import { BarChart3, TrendingUp, Calendar } from "lucide-react"

export default function AdminAnalyticsPage() {
  const { orders } = useOrders()
  const { products } = useProducts()

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)
  const avgOrderValue = totalRevenue / orders.length || 0
  const outOfStockProducts = products.filter((p) => p.stock === 0).length

  const ordersByStatus = {
    delivered: orders.filter((o) => o.status === "delivered").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    pending: orders.filter((o) => o.status === "pending").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeTab="analytics" />

      <main className="md:ml-64">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="opacity-90">Track your business performance</p>
        </div>

        <div className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Total Revenue</p>
                  <p className="text-3xl font-bold text-primary">₹{totalRevenue}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-primary opacity-20" />
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Avg Order Value</p>
                  <p className="text-3xl font-bold text-primary">₹{Math.round(avgOrderValue)}</p>
                </div>
                <BarChart3 className="w-12 h-12 text-primary opacity-20" />
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <Calendar className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Out of Stock</p>
                  <p className="text-3xl font-bold text-destructive">{outOfStockProducts}</p>
                </div>
                <div className="text-3xl opacity-20">📉</div>
              </div>
            </div>
          </div>

          {/* Order Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold mb-6">Orders by Status</h3>
              <div className="space-y-4">
                {Object.entries(ordersByStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full ${
                          status === "delivered"
                            ? "bg-green-600"
                            : status === "shipped"
                              ? "bg-blue-600"
                              : "bg-yellow-600"
                        }`}
                      />
                      <span className="font-semibold capitalize">{status}</span>
                    </div>
                    <span className="text-2xl font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold mb-6">Product Categories</h3>
              <div className="space-y-4">
                {["Rice", "Grains"].map((category) => {
                  const count = products.filter((p) => p.category === category).length
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="font-semibold">{category}</span>
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
