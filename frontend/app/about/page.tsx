import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Lotus Rice Mills</h1>
              <p className="text-lg text-muted-foreground">
                Delivering premium quality rice and grains with integrity, tradition, and innovation since our founding.
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded with a passion for quality and excellence, Lotus Rice Mills has been at the forefront of the
                  agricultural industry for decades. We pride ourselves on our commitment to sustainable farming
                  practices and premium product quality.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our state-of-the-art facilities and experienced team ensure that every grain meets our strict quality
                  standards. From farm to table, we maintain complete control over the production process.
                </p>
              </div>
              <div className="bg-muted rounded-lg h-64 md:h-80 flex items-center justify-center">
                <div className="text-6xl">🌾</div>
              </div>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We maintain the highest quality standards in every aspect of our operations, ensuring only the best
                  reaches our customers.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  Our commitment to sustainable practices helps preserve the environment for future generations while
                  supporting local farming communities.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Customer Care</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We offer reliable delivery, excellent customer service, and
                  competitive pricing.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-12 bg-primary/5 rounded-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Experience Premium Quality?</h2>
              <p className="text-muted-foreground mb-6">Browse our full collection of premium rice and grains today.</p>
              <Link href="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
