"use client"

import { Button } from "@/components/ui/button"

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function ProductFilters({ selectedCategory, onCategoryChange, sortBy, onSortChange }: ProductFiltersProps) {
  const categories = ["All", "Company's Brand", "Other Brands"]
  const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Best Rated"]

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-bold mb-4 text-primary">Category</h3>
        <div className="space-y-2 flex flex-col">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="justify-start"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-bold mb-4 text-primary">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold mb-4 text-primary">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Min: ₹0 - Max: ₹2500</label>
            <input type="range" min="0" max="2500" className="w-full" />
          </div>
        </div>
      </div>

      {/* MOQ Info */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
        <p className="text-xs font-semibold text-primary">Minimum Order Quantity</p>
        <p className="text-xs text-muted-foreground mt-1">25 Tons required for all orders</p>
      </div>

      {/* Size Info */}
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
        <p className="text-xs font-semibold text-accent-foreground">Product Sizes</p>
        <p className="text-xs text-muted-foreground mt-1">Company Brand: Fixed sizes</p>
        <p className="text-xs text-muted-foreground">Other Brands: Variable up to 50 KG</p>
      </div>
    </div>
  )
}
