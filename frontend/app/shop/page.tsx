"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { PRODUCTS } from "@/lib/products-data"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Featured")

  const filteredProducts = useMemo(() => {
    let results = PRODUCTS

    if (selectedCategory !== "All") {
      results = results.filter((p) => p.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case "Price: Low to High":
        results.sort((a, b) => a.price - b.price)
        break
      case "Price: High to Low":
        results.sort((a, b) => b.price - a.price)
        break
      case "Best Rated":
        results.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return results
  }, [selectedCategory, sortBy])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted border-b border-border">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Our Products</h1>
            <p className="text-muted-foreground mt-2">Browse our premium selection of rice and grains</p>
          </div>
        </section>

        {/* Shop Content */}
        <section className="py-12 bg-background">
          <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-20">
                    <ProductFilters
                      selectedCategory={selectedCategory}
                      onCategoryChange={setSelectedCategory}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                  </div>
                </div>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                  <div className="mb-6 text-muted-foreground">Showing {filteredProducts.length} products</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">No products found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
