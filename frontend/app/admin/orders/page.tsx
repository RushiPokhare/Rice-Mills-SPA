"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useOrders } from "@/hooks/use-orders"
import { Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminOrdersPage() {
  const { orders } = useOrders()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-purple-100 text-purple-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeTab="orders" />

      <main className="md:ml-64">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6">
          <h1 className="text-3xl font-bold">Manage Orders</h1>
          <p className="opacity-90">View, track, and update customer orders</p>
        </div>

        <div className="p-6">
          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders by ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Orders Table */}
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-muted transition"
                  >
                    <td className="px-6 py-4 font-semibold">{order.id}</td>
                    <td className="px-6 py-4">{ "N/A"}</td>
                    <td className="px-6 py-4">{order.orderDate}</td>
                    <td className="px-6 py-4 font-bold text-primary">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Results */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No orders found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
