"use client"

import type React from "react"
import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/use-products"
import { Plus, Trash2, Edit2, Search } from 'lucide-react'
import type { Product } from "@/lib/types"

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    brand: "company",
    category: "Rice",
    basePrice: 0,
    gst: 0,
    price: 0,
    description: "",
    stock: 0,
    rating: 0,
    reviews: 0,
    image: "",
  })

  const getCategories = () => {
    const companyBrandCategories = ["Rice"]
    const otherBrandCategories = [
      "Rice",
      "Maize",
      "Pulses",
      "Mustard",
      "Sorghum Seeds",
      "Pearl Millet",
      "Soyabean Seeds",
      "Foxnuts (Makhana)",
      "Wheat",
      "Peanuts",
      "Kidney Beans",
      "Grain Foods",
    ]

    const baseCategories = formData.brand === "company" ? companyBrandCategories : otherBrandCategories
    return [...baseCategories, ...customCategories]
  }

  const handleAddNewCategory = () => {
    if (newCategoryName.trim() && !getCategories().includes(newCategoryName.trim())) {
      const newCategory = newCategoryName.trim()
      setCustomCategories([...customCategories, newCategory])
      setFormData({ ...formData, category: newCategory })
      setNewCategoryName("")
      setShowNewCategoryInput(false)
    }
  }

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const calculateTotal = (basePrice: number, gst: number) => {
    return Math.round(basePrice + (basePrice * gst) / 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const totalPrice = calculateTotal(formData.basePrice || 0, formData.gst || 0)

    if (editingId) {
      updateProduct(editingId, {
        ...formData,
        price: totalPrice,
      })
      setEditingId(null)
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name || "",
        brand: formData.brand || "company",
        category: formData.category || "Rice",
        basePrice: formData.basePrice || 0,
        gst: formData.gst || 0,
        price: totalPrice,
        description: formData.description || "",
        stock: formData.stock || 0,
        rating: formData.rating || 0,
        reviews: formData.reviews || 0,
        image: formData.image || "/placeholder.svg",
        isCompanyBrand: formData.brand === "company",
      }
      addProduct(newProduct)
    }

    setFormData({
      name: "",
      brand: "company",
      category: "Rice",
      basePrice: 0,
      gst: 0,
      price: 0,
      description: "",
      stock: 0,
      rating: 0,
      reviews: 0,
      image: "",
    })
    setIsAddingProduct(false)
  }

  const handleEdit = (product: Product) => {
    setFormData(product)
    setEditingId(product.id)
    setIsAddingProduct(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
    }
  }

  const handleCancel = () => {
    setIsAddingProduct(false)
    setEditingId(null)
    setFormData({
      name: "",
      brand: "company",
      category: "Rice",
      basePrice: 0,
      gst: 0,
      price: 0,
      description: "",
      stock: 0,
      rating: 0,
      reviews: 0,
      image: "",
    })
    setShowNewCategoryInput(false)
    setNewCategoryName("")
  }

  const handleBrandChange = (newBrand: "company" | "other") => {
    setFormData({ ...formData, brand: newBrand, category: newBrand === "company" ? "Rice" : "Rice" })
    setShowNewCategoryInput(false)
    setNewCategoryName("")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeTab="products" />

      <main className="md:ml-64">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manage Products</h1>
            <p className="opacity-90">Add, edit, or remove products</p>
          </div>
          <Button variant="secondary" onClick={() => setIsAddingProduct(!isAddingProduct)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        <div className="p-6">
          {/* Add/Edit Form */}
          {isAddingProduct && (
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Brand Selection */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Brand</label>
                    <select
                      value={formData.brand || "company"}
                      onChange={(e) => handleBrandChange(e.target.value as "company" | "other")}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="company">Company's Brand (Lotus)</option>
                      <option value="other">Other Brands</option>
                    </select>
                  </div>

                  {/* Category Selection with Add New Option */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category</label>
                    {showNewCategoryInput ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="New category name"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          autoFocus
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleAddNewCategory}
                          className="bg-primary text-primary-foreground"
                        >
                          Add
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowNewCategoryInput(false)
                            setNewCategoryName("")
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <select
                        value={formData.category || "Rice"}
                        onChange={(e) => {
                          if (e.target.value === "add-new") {
                            setShowNewCategoryInput(true)
                          } else {
                            setFormData({ ...formData, category: e.target.value })
                          }
                        }}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select Category</option>
                        {getCategories().map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                        <option value="add-new" className="font-semibold">+ Add New Category</option>
                      </select>
                    )}
                  </div>

                  {/* Product Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Product Name</label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  {/* Base Price */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Base Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.basePrice || 0}
                      onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">GST (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.gst || 0}
                      onChange={(e) => setFormData({ ...formData, gst: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Total Price (₹)</label>
                    <div className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-primary font-bold">
                      ₹{calculateTotal(formData.basePrice || 0, formData.gst || 0).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Stock</label>
                    <input
                      type="number"
                      value={formData.stock || 0}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  {/* Product Image Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Product Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const imageUrl = URL.createObjectURL(file)
                              setFormData({ ...formData, image: imageUrl })
                            }
                          }}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        {/* Preview Image */}
                        {formData.image && (
                          <div className="mt-3">
                            <img
                              src={formData.image}
                              alt="Product Preview"
                              className="h-32 w-32 object-cover rounded-lg border"
                            />
                          </div>
                        )}
                      </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">{editingId ? "Update Product" : "Add Product"}</Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Products Table */}
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Product Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Brand</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Base Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">GST</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted transition">
                    <td className="px-6 py-4 font-semibold">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        product.brand === "company"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {product.brand === "company" ? "Lotus" : "Other"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">₹{product.basePrice?.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.gst}%</td>
                    <td className="px-6 py-4 text-primary font-bold">₹{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)} className="gap-1">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        className="text-destructive hover:bg-destructive/10 gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
