"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, Heart, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"
import { useAdmin } from "@/hooks/use-admin"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn: isUserLoggedIn } = useUser()
  const { isLoggedIn: isAdminLoggedIn } = useAdmin()

  return (
    <nav className="bg-white border-b border-border">
      <div className="w-full px-0">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌾</span>
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">Lotus Rice Mills</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-foreground hover:text-primary transition">
              Shop
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link href="/wishlist" title="Wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  3
                </span>
              </Button>
            </Link>
            <Link href="/cart" title="Shopping Cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>

            {/* Customer Portal Link */}
            {isUserLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/customer-portal">
                  <Button variant="ghost" size="icon" title="Customer Portal">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="default">Sign In</Button>
              </Link>
            )}

            {/* Admin Link */}
            {isAdminLoggedIn ? (
              <Link href="/admin" title="Admin Dashboard">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            ) : (
              <Link href="/admin/login" title="Admin Login">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 px-6">
            <Link href="/" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Home
            </Link>
            <Link href="/shop" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Shop
            </Link>
            <Link href="/about" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
