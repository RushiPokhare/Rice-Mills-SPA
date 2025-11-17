"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Package, BarChart3, Settings, Menu, X, LogOut ,Truck,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/use-admin"

interface AdminSidebarProps {
  activeTab: string
}

export function AdminSidebar({ activeTab }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { admin, logout } = useAdmin()

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { id: "products", label: "Products", icon: Package, href: "/admin/products" },
    { id: "orders", label: "Orders", icon: Truck, href: "/admin/orders" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-sidebar border-r border-sidebar-border transition-transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground font-bold">
              LR
            </div>
            <span className="font-bold text-sidebar-foreground">Lotus Admin</span>
          </Link>
        </div>

        <div className="px-6 py-4 border-b border-sidebar-border">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="text-sm font-semibold text-sidebar-foreground truncate">{admin?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{admin?.email}</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Link key={item.id} href={item.href} onClick={() => setIsOpen(false)}>
                <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-3">
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-2 bg-transparent hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            Exit Admin
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
