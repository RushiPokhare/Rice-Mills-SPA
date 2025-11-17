"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useProducts } from "@/hooks/use-products"
import { useOrders } from "@/hooks/use-orders"
import { useAdmin } from "@/hooks/use-admin"
import { BarChart3, Package, TrendingUp, Users } from "lucide-react"

export default function AdminDashboard() {
  const { products } = useProducts()
  const { orders } = useOrders()
  const { isLoggedIn } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-primary",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      label: "Revenue",
      value: `₹${orders.reduce((sum, o) => sum + o.totalAmount, 0)}`,
      icon: BarChart3,
      color: "text-green-600",
    },
    {
      label: "Customers",
      value: "1,234",
      icon: Users,
      color: "text-blue-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeTab="dashboard" />

      <main className="md:ml-64">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="opacity-90">Welcome back, Administrator!</p>
        </div>

        {/* Stats Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-card rounded-lg border border-border p-6 hover:border-primary transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-12 h-12 opacity-20 ${stat.color}`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted transition">
                    <td className="px-6 py-4 font-semibold">{order.id}</td>
                    <td className="px-6 py-4">{order.orderDate}</td>
                    <td className="px-6 py-4 font-bold text-primary">₹{order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
