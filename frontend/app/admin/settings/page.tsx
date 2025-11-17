"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeTab="settings" />

      <main className="md:ml-64">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="opacity-90">Configure your store</p>
        </div>

        <div className="p-6 max-w-2xl">
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Store Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Store Name</label>
                  <input
                    type="text"
                    defaultValue="Lotus Rice Mills"
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="info@lotusricemills.com"
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-bold mb-4">Shipping Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Free Shipping Above (₹)</label>
                  <input
                    type="number"
                    defaultValue="500"
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Standard Shipping Cost (₹)</label>
                  <input type="number" defaultValue="50" className="w-full px-4 py-2 border border-border rounded-lg" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button className="gap-2">
                <Settings className="w-4 h-4" />
                Save Settings
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
