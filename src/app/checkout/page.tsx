'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle2, CreditCard, Banknote, MapPin, Package, ArrowRight } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

type CheckoutStep = 'INFO' | 'ADDRESS' | 'PAYMENT' | 'SUMMARY'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  
  const [step, setStep] = useState<CheckoutStep>('INFO')
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'COD'
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getTotal()
  const deliveryFee = subtotal > 499 ? 0 : 50
  const total = subtotal + deliveryFee

  if (items.length === 0 && !isProcessing && step !== 'SUMMARY') {
    router.push('/cart')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    
    try {
      // Create the order in the backend
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount: total,
          subtotal,
          deliveryFee,
          discount: 0,
          paymentMethod: formData.paymentMethod,
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          },
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          }
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      if (formData.paymentMethod === 'ONLINE') {
        throw new Error('Online payments are currently disabled. Please use Cash on Delivery.')
      }

      // Order Success
      clearCart()
      toast.success('Order placed successfully!', { icon: '🎉' })
      router.push(`/account/orders/${data.orderId}?success=true`)
      
    } catch (error: any) {
      toast.error(error.message)
      setIsProcessing(false)
    }
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {['INFO', 'ADDRESS', 'PAYMENT'].map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step === s ? 'bg-coffee-dark text-white' : 'bg-gray-200 text-gray-500'}`}>
            {i + 1}
          </div>
          {i < 2 && (
            <div className={`w-12 h-1 mx-2 rounded ${step === 'ADDRESS' && i === 0 ? 'bg-coffee-dark' : step === 'PAYMENT' ? 'bg-coffee-dark' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <main className="w-full min-h-screen flex flex-col bg-[#FDFBF7] overflow-x-hidden">
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Toaster position="top-center" />
        <h1 className="text-3xl font-extrabold text-coffee-dark mb-8 text-center">Secure Checkout</h1>
        
        <StepIndicator />

        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-coffee-beige">
          
          {step === 'INFO' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold text-coffee-dark flex items-center gap-2">
                <UserIcon /> Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-coffee-brown focus:border-coffee-brown" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-coffee-brown focus:border-coffee-brown" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-coffee-brown focus:border-coffee-brown" />
                </div>
              </div>
              <button 
                onClick={() => setStep('ADDRESS')}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="w-full py-4 bg-coffee-dark text-white rounded-xl font-bold hover:bg-coffee-brown transition-colors disabled:opacity-50 mt-6"
              >
                Continue to Delivery
              </button>
            </div>
          )}

          {step === 'ADDRESS' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold text-coffee-dark flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input type="text" name="street" value={formData.street} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-coffee-brown focus:border-coffee-brown" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-coffee-brown focus:border-coffee-brown" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-coffee-brown focus:border-coffee-brown" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-coffee-brown focus:border-coffee-brown" />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setStep('INFO')} className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                  Back
                </button>
                <button 
                  onClick={() => setStep('PAYMENT')}
                  disabled={!formData.street || !formData.city || !formData.state || !formData.pincode}
                  className="flex-1 py-4 bg-coffee-dark text-white rounded-xl font-bold hover:bg-coffee-brown transition-colors disabled:opacity-50"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 'PAYMENT' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold text-coffee-dark flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Payment Method
              </h2>
              
              <div className="space-y-4">
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'COD' }))}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all border-coffee-dark bg-[#FDFBF7]`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-6 h-6 text-coffee-dark" />
                    <div>
                      <h4 className="font-bold text-gray-900">Cash on Delivery</h4>
                      <p className="text-sm text-gray-500">Pay when your order arrives</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg text-sm">
                  Online payments are currently disabled for maintenance.
                </div>
              </div>

              {/* Order Summary Mini */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total to Pay</span>
                  <span className="text-2xl font-extrabold text-coffee-dark">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep('ADDRESS')} disabled={isProcessing} className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-coffee-dark text-white rounded-xl font-bold hover:bg-coffee-brown transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'} 
                    {!isProcessing && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
      
      <Footer />
    </main>
  )
}

function UserIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
