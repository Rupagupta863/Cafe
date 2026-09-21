'use client'

import { useCartStore } from '@/store/cart'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  
  const subtotal = getTotal()
  const deliveryFee = subtotal > 499 ? 0 : 50
  const total = subtotal + (items.length > 0 ? deliveryFee : 0)

  return (
    <main className="w-full min-h-screen flex flex-col bg-[#FDFBF7] overflow-x-hidden">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-coffee-dark mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-coffee-beige flex flex-col items-center">
            <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
            <h2 className="text-2xl font-bold text-coffee-dark mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/shop" className="px-8 py-3 bg-coffee-dark text-white rounded-xl font-bold hover:bg-coffee-brown hover:scale-105 transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                      {Object.entries(JSON.parse(item.customization)).map(([k,v]) => `${v}`).join(', ')}
                    </p>
                    <div className="font-bold text-coffee-brown mt-2">₹{item.price.toFixed(2)}</div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10 w-28">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold"
                      >-</button>
                      <div className="flex-1 h-full flex items-center justify-center font-bold text-sm text-gray-900 border-x border-gray-200 bg-white">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold"
                      >+</button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                <h3 className="text-xl font-bold text-coffee-dark mb-6">Order Summary</h3>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="text-xs text-coffee-brown italic">
                      Add ₹{(499 - subtotal).toFixed(2)} more for free delivery
                    </div>
                  )}
                  <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-xl font-extrabold text-coffee-dark">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full py-4 bg-coffee-dark text-white rounded-xl font-bold text-base hover:bg-coffee-brown hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Link>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  Taxes will be calculated at checkout
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
      
      <Footer />
    </main>
  )
}
