'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState([0])

  const faqs = [
    {
      question: 'What is the Minimum Order Quantity (MOQ)?',
      answer:
        'The minimum order quantity is fixed at 25 tons for all products. This applies to both Company brand and other brand products.',
    },
    {
      question: 'What sizes are available for products?',
      answer:
        'Company Brand (Lotus) products come in fixed sizes (1 KG, 5 KG, 25 KG, 30 KG). Other brand products offer variable sizes up to a maximum of 50 KG per pack, allowing customization based on your requirements.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Standard delivery typically takes 5-7 business days from the order confirmation. We also offer expedited delivery options. Delivery time may vary based on location and product availability.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, bank transfers, and digital payment methods. For bulk orders, we also offer customized payment terms.',
    },
    {
      question: 'Can I place orders online?',
      answer:
        'Yes, you can place orders directly through our website. Simply browse products, add items to cart, and proceed to checkout. For bulk orders exceeding MOQ, you can also contact our sales team for personalized assistance.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We accept returns within 14 days of delivery for damaged or defective products. Items must be in original condition. Please visit our Returns page for detailed instructions.',
    },
    {
      question: 'How can I track my order?',
      answer:
        'Once your order is shipped, you will receive a tracking number via email. You can use this number on our Track Order page to monitor your shipment in real-time.',
    },
    {
      question: 'Do you offer bulk discounts?',
      answer:
        'Yes, we offer competitive pricing for bulk orders. As your order quantity increases, you may qualify for volume discounts. Contact our sales team at info@lotusricemills.com for custom quotes.',
    },
  ]

  const toggleItem = (idx) => {
    setOpenItems((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="mt-2 text-primary-foreground/90">Find answers to common questions about our products and services</p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => toggleItem(idx)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {faq.question}
                    </CardTitle>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform ${
                        openItems.includes(idx) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </CardHeader>
                {openItems.includes(idx) && (
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Didn't find your answer?</h3>
              <p className="text-muted-foreground mb-4">
                Contact our customer support team for assistance.
              </p>
              <a href="/contact">
                <Button className="bg-primary hover:bg-primary/90">Contact Us</Button>
              </a>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
