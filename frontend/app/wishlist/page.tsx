"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1)
    removeFromWishlist(product.id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">{items.length} items saved</p>
          </div>
        </section>

        {/* Wishlist Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-6">Start adding items to your wishlist to save them for later</p>
                <Link href="/shop">
                  <Button size="lg">Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {items.map((product) => (
                    <div
                      key={product.id}
                      className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition"
                    >
                      <div className="bg-muted h-48 flex items-center justify-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                          <span className="text-xs font-semibold text-green-600">
                            {product.stock > 10 ? "✓ In Stock" : `Only ${product.stock} left`}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm" onClick={() => handleMoveToCart(product)}>
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Move to Cart
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeFromWishlist(product.id)}>
                            <Heart className="w-4 h-4 fill-current text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <Link href="/shop" className="flex items-center gap-2 text-primary hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                  <Button
                    variant="outline"
                    onClick={clearWishlist}
                    className="text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
                  >
                    Clear Wishlist
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
