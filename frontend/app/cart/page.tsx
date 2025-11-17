"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [isCheckout, setIsCheckout] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 500 ? 0 : 50
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
                <Link href="/shop">
                  <Button size="lg">Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 border border-border rounded-lg hover:border-primary transition"
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-bold text-lg mb-1 hover:text-primary">{item.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-3">{item.category}</p>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                className="px-2 py-1 border border-border rounded hover:bg-muted"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                −
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button
                                className="px-2 py-1 border border-border rounded hover:bg-muted"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Continue Shopping */}
                  <Link href="/shop" className="flex items-center gap-2 mt-6 text-primary hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-muted rounded-lg p-6 border border-border sticky top-20">
                    <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-semibold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="font-semibold">₹{tax}</span>
                      </div>
                    </div>

                    <div className="flex justify-between mb-6">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">₹{total}</span>
                    </div>

                    {!isCheckout ? (
                      <Button className="w-full mb-3" size="lg" onClick={() => setIsCheckout(true)}>
                        Proceed to Checkout
                      </Button>
                    ) : (
                      <>
                        <Button className="w-full mb-3" size="lg" disabled>
                          Complete Payment (Backend)
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => setIsCheckout(false)}
                        >
                          Continue Shopping
                        </Button>
                      </>
                    )}

                    <button
                      onClick={clearCart}
                      className="text-sm text-destructive hover:underline mt-4 w-full text-center"
                    >
                      Clear Cart
                    </button>

                    {subtotal > 500 && (
                      <p className="text-xs text-green-600 mt-4 p-2 bg-green-50 rounded">
                        ✓ Free shipping available for orders above ₹500
                      </p>
                    )}
                  </div>
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
