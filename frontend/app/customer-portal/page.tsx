"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"
import { useOrders } from "@/hooks/use-orders"
import { useRouter } from "next/navigation"
import { Package, Heart, FileText, User, LogOut } from "lucide-react"
import Link from "next/link"

export default function CustomerPortalPage() {
  const { user, isLoggedIn, logout } = useUser()
  const { orders } = useOrders()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Please sign in first</h2>
            <Link href="/login">
              <Button size="lg">Go to Login</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const upcomingOrders = orders.filter((o) => o.status !== "delivered")
  const completedOrders = orders.filter((o) => o.status === "delivered")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
                <p className="opacity-90 mt-1">Member since {user.registeredDate}</p>
              </div>
              <Button variant="secondary" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-card border-b border-border sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8 overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: User },
                { id: "orders", label: "My Orders", icon: Package },
                { id: "wishlist", label: "Wishlist", icon: Heart },
                { id: "profile", label: "Profile", icon: User },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-4 px-2 border-b-2 font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                    activeTab === id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Total Orders</p>
                      <p className="text-3xl font-bold text-primary">{orders.length}</p>
                    </div>
                    <Package className="w-12 h-12 text-primary opacity-20" />
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Pending Orders</p>
                      <p className="text-3xl font-bold text-orange-600">{upcomingOrders.length}</p>
                    </div>
                    <div className="text-3xl opacity-30">📦</div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Total Spent</p>
                      <p className="text-3xl font-bold text-primary">
                        ₹{orders.reduce((sum, o) => sum + o.totalAmount, 0)}
                      </p>
                    </div>
                    <div className="text-3xl opacity-30">💰</div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
                    <p className="text-muted-foreground text-lg">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-card rounded-lg border border-border p-6 hover:border-primary transition"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                            <p className="font-bold">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Date</p>
                            <p className="font-bold">{order.orderDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Total</p>
                            <p className="font-bold text-primary">₹{order.totalAmount}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Status</p>
                            <div className="inline-block">
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
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-2">Items:</p>
                          <div className="flex gap-2 flex-wrap">
                            {order.items.map((item) => (
                              <span key={item.id} className="text-sm bg-muted px-3 py-1 rounded">
                                {item.quantity}x {item.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Link href={`/order/${order.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          <Link href={`/invoice/${order.id}`}>
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              <FileText className="w-4 h-4" />
                              Download Invoice
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <p className="text-muted-foreground text-lg">View your saved wishlist</p>
                  <Link href="/wishlist" className="mt-4 inline-block">
                    <Button>Go to Wishlist</Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                <div className="bg-card rounded-lg border border-border p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                      <p className="font-semibold">{user.registeredDate}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Address</p>
                      <p className="font-semibold">
                        {user.address}, {user.city} - {user.pincode}
                      </p>
                    </div>
                  </div>

                  <Button className="mt-8 bg-transparent" variant="outline">
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
