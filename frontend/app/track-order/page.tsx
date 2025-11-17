'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingData, setTrackingData] = useState(null)

  const handleTrack = () => {
    if (trackingNumber) {
      setTrackingData({
        orderNumber: trackingNumber,
        status: 'Shipped',
        date: '2025-11-15',
        estimatedDelivery: '2025-11-20',
        steps: [
          { status: 'Order Confirmed', date: '2025-11-13', completed: true },
          { status: 'Processing', date: '2025-11-14', completed: true },
          { status: 'Shipped', date: '2025-11-15', completed: true },
          { status: 'Out for Delivery', date: '2025-11-19', completed: false },
          { status: 'Delivered', date: '2025-11-20', completed: false },
        ],
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold">Track Your Order</h1>
            <p className="mt-2 text-primary-foreground/90">Enter your order number to see the status of your shipment</p>
          </div>
        </section>

        {/* Track Order Form */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="flex gap-2 mb-8">
            <Input
              placeholder="Enter tracking number (e.g., LRM-2025-001)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTrack} className="bg-primary hover:bg-primary/90">
              Track
            </Button>
          </div>

          {/* Tracking Result */}
          {trackingData && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-muted">
                  <CardTitle>Order #{trackingData.orderNumber}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-lg font-semibold text-primary">{trackingData.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Est. Delivery</p>
                      <p className="text-lg font-semibold">{trackingData.estimatedDelivery}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingData.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              step.completed
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Clock className="w-6 h-6" />
                            )}
                          </div>
                          {idx < trackingData.steps.length - 1 && (
                            <div className={`w-1 h-8 ${step.completed ? 'bg-green-200' : 'bg-gray-200'}`} />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-semibold">{step.status}</p>
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Default Info */}
          {!trackingData && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">Enter a tracking number to view order details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
