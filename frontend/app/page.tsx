"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground w-full">
          <div className="w-full px-6 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Premium Rice & Grains</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 text-balance">
              Sourced directly from trusted farmers, delivered to your door with quality guaranteed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" variant="secondary">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 w-full">
          <div className="w-full px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-primary">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition"
                >
                  <div className="bg-muted h-48 flex items-center justify-center">
                    <span className="text-4xl">🌾</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Premium Basmati Rice</h3>
                    <p className="text-muted-foreground mb-4">
                      High-quality long grain rice perfect for everyday cooking
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">₹450</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-muted py-16 w-full">
          <div className="w-full px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-primary">Why Choose Lotus Rice Mills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "100% Pure", desc: "No additives or preservatives" },
                { title: "Farm Fresh", desc: "Directly sourced from farmers" },
                { title: "Best Price", desc: "Competitive rates guaranteed" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
