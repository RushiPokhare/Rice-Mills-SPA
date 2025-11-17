'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, Clock, Package } from 'lucide-react'

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact us within 14 days of delivery with your order number and reason for return.',
      icon: AlertCircle,
    },
    {
      step: 2,
      title: 'Get Return Authorization',
      description: 'Receive a return authorization number and shipping label via email.',
      icon: Clock,
    },
    {
      step: 3,
      title: 'Ship Back',
      description: 'Pack the item in original condition and ship using the provided label.',
      icon: Package,
    },
    {
      step: 4,
      title: 'Refund Processed',
      description: 'Once received and inspected, your refund will be processed within 5-7 business days.',
      icon: CheckCircle,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold">Returns & Refunds</h1>
            <p className="mt-2 text-primary-foreground/90">Easy returns within 14 days of delivery</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          {/* Return Policy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Return Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Eligibility</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Products must be returned within 14 days of delivery</li>
                  <li>Items must be in original, unused condition</li>
                  <li>Packaging should be intact and undamaged</li>
                  <li>All original documentation must be included</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Non-Returnable Items</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Used, opened, or damaged products</li>
                  <li>Custom ordered items</li>
                  <li>Items returned after 14 days</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Return Process */}
          <h2 className="text-2xl font-bold mb-6">How to Return an Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {returnSteps.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.step}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Step {item.step}</p>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Refund Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Refund Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Refund Timeline</h4>
                <p className="text-muted-foreground">
                  Once we receive your returned item and verify its condition, we will process your refund within 5-7 business days. The refund will be credited to your original payment method.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Shipping Costs</h4>
                <p className="text-muted-foreground">
                  For defective or damaged items, we will cover the return shipping cost. For items returned due to change of mind, the customer is responsible for return shipping.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Need Help with Your Return?</h3>
              <p className="text-muted-foreground mb-4">
                Our customer support team is ready to assist you with any questions about returns and refunds.
              </p>
              <div className="flex gap-2">
                <a href="/contact">
                  <Button className="bg-primary hover:bg-primary/90">Contact Support</Button>
                </a>
                <a href="/faq">
                  <Button variant="outline">View FAQ</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
