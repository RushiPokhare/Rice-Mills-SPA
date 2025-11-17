"use client"

import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id))

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Image Container */}
      <div className="relative bg-muted h-48 overflow-hidden flex items-center justify-center group">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">{product.category}</span>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-foreground">{product.name}</h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? "" : "opacity-30"}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm line-through text-muted-foreground">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          <span className={`text-xs font-semibold ${product.stock > 10 ? "text-green-600" : "text-destructive"}`}>
            {product.stock > 10 ? "✓ In Stock" : `Only ${product.stock} left`}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            className="flex-1"
            size="sm"
            onClick={() => addToCart(product, quantity)}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
          <Button variant={isWishlisted ? "default" : "outline"} size="sm" onClick={handleWishlist}>
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}
