"use client"

import { useParams } from "next/navigation"
import { useOrders } from "@/hooks/use-orders"
import { useUser } from "@/hooks/use-user"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export default function InvoicePage() {
  const params = useParams()
  const { getOrderById } = useOrders()
  const { user } = useUser()
  const invoiceRef = useRef<HTMLDivElement>(null)
  const orderId = params.id as string
  const order = getOrderById(orderId)

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Order not found</h2>
            <Link href="/customer-portal">
              <Button>Back to Portal</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handlePrint = () => {
    if (invoiceRef.current) {
      const printWindow = window.open("", "", "height=600,width=800")
      if (printWindow) {
        printWindow.document.write(invoiceRef.current.innerHTML)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const tax = Math.round(order.totalAmount * 0.1)
  const subtotal = order.totalAmount - tax

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-muted border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-primary">Invoice</h1>
              <Button onClick={handlePrint} className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={invoiceRef} className="bg-white p-12 rounded-lg border-2 border-primary">
              {/* Header */}
              <div className="mb-8 pb-8 border-b-2 border-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Lotus Rice Mills</h2>
                    <p className="text-gray-600">Premium Rice & Grains</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">INVOICE</p>
                    <p className="text-gray-600">{order.id}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-primary mb-2">BILL TO:</h3>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-gray-600">{user?.phone}</p>
                  <p className="text-gray-600">{order.shippingAddress}</p>
                </div>
                <div className="text-right">
                  <div className="mb-4">
                    <p className="text-gray-600">Invoice Date</p>
                    <p className="font-bold">{order.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-bold capitalize text-primary">{order.status}</p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full mb-8 border-t border-b border-gray-300">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-3 text-left">Item</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-300">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right">₹{item.price}</td>
                      <td className="p-3 text-right">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-64">
                  <div className="flex justify-between mb-2 pb-2 border-b border-gray-300">
                    <p>Subtotal:</p>
                    <p>₹{subtotal}</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p>Tax (10%):</p>
                    <p>₹{tax}</p>
                  </div>
                  <div className="flex justify-between text-lg font-bold bg-primary text-white p-3 rounded">
                    <p>Total:</p>
                    <p>₹{order.totalAmount}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t border-gray-300 pt-8 text-gray-600 text-sm">
                <p>Thank you for your business!</p>
                <p>Lotus Rice Mills | info@lotusricemills.com | +1 (555) 123-4567</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Link href="/customer-portal">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Portal
                </Button>
              </Link>
              <Button onClick={handlePrint} className="gap-2">
                <Download className="w-4 h-4" />
                Download as PDF
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
