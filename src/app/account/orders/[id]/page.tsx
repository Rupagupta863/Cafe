import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { ChevronLeft, MapPin, Package, Clock, CheckCircle2, Receipt } from 'lucide-react'
import Image from 'next/image'

export default async function OrderDetailsPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ success?: string }> }) {
  const session = await auth()
  const { id } = await params;
  const { success } = await searchParams;
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      address: true,
      user: true,
    }
  })

  if (!order) {
    notFound()
  }

  const statuses = ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED']
  const currentStatusIndex = statuses.indexOf(order.status)

  return (
    <main className="w-full min-h-screen flex flex-col bg-[#F9FAFB] overflow-x-hidden font-inter text-gray-800">
      <Navbar />
      
      {/* Changed to max-w-3xl for a compact, receipt-like view that eliminates horizontal empty space */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        
        <Link href="/account" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to orders
        </Link>
        
        {success === 'true' && (
          <div className="bg-emerald-50 border-l-2 border-emerald-500 p-5 mb-10 flex items-start gap-4 rounded-r-xl shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-medium text-emerald-900 mb-1">Order Placed Successfully</h2>
              <p className="text-sm text-emerald-700 font-normal">
                Thank you for your order. We are currently processing it and will update you shortly.
              </p>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b border-gray-200 pb-6">
          <div>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">Order Summary</p>
            <h1 className="text-lg md:text-xl font-medium text-gray-900 mb-2">#{order.id.slice(-8).toUpperCase()}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 font-normal">
              <Clock className="w-3.5 h-3.5" /> Placed on {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
          <div className="px-3 py-1.5 bg-coffee-dark text-white rounded-md text-[10px] font-medium uppercase tracking-widest shadow-sm">
            {order.status.replace(/_/g, ' ')}
          </div>
        </div>

        {/* Order Tracking Timeline */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-8">Order Status</h3>
          <div className="relative w-full px-2">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-100 rounded-full" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-coffee-dark rounded-full transition-all duration-700"
              style={{ width: `${Math.max(0, (currentStatusIndex / (statuses.length - 1)) * 100)}%` }}
            />
            
            <div className="relative flex justify-between">
              {statuses.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                
                return (
                  <div key={status} className="flex flex-col items-center relative w-16 md:w-20">
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center relative z-10 mb-3 transition-colors shadow-sm ${
                      isCompleted ? 'bg-coffee-dark text-white ring-4 ring-white' : 'bg-white border border-gray-200 text-gray-300 ring-4 ring-white'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" /> : <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-200" />}
                    </div>
                    <span className={`text-[9px] md:text-[10px] text-center uppercase tracking-widest ${isCurrent ? 'font-medium text-coffee-dark' : isCompleted ? 'font-medium text-gray-500' : 'font-normal text-gray-400'}`}>
                      {status.replace(/_/g, ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Items - Full width of the narrow container */}
        <div className="space-y-4 mb-8">
          <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-widest pl-2">Purchased Items</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {order.items.map(item => (
                <div key={item.id} className="p-4 md:p-6 flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{item.product.name}</h4>
                    {item.customization && item.customization !== "{}" && (
                      <p className="text-[10px] text-gray-500 mb-1.5 font-normal bg-gray-50 inline-block px-1.5 py-0.5 rounded-sm">
                        {Object.entries(JSON.parse(item.customization)).map(([k,v]) => `${k}: ${v}`).join(', ')}
                      </p>
                    )}
                    <div className="text-xs font-normal text-gray-500">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="font-medium text-sm text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Grid for Address & Payment Details stacked side-by-side on md screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Delivery Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Delivery Address
            </h3>
            <div className="text-xs text-gray-600 space-y-1 font-normal">
              <p className="font-medium text-gray-900 text-sm mb-1.5">{order.user.name}</p>
              <p className="leading-relaxed">{order.address.street}</p>
              <p>{order.address.city}, {order.address.state} <span className="text-gray-900">{order.address.pincode}</span></p>
              
              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="font-medium text-gray-500 text-[10px] uppercase tracking-wider">Phone</span>
                <span className="font-medium text-gray-900">{order.user.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5" /> Payment Details
            </h3>
            
            <div className="space-y-3 text-xs mb-4 flex-1">
              <div className="flex justify-between text-gray-500 font-normal">
                <span>Subtotal</span>
                <span className="text-gray-900">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-normal">
                <span>Delivery Fee</span>
                <span className="text-gray-900">₹{order.deliveryFee.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-normal">
                  <span>Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="w-full border-t border-dashed border-gray-200 my-3" />
              
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 text-sm">Total</span>
                <span className="text-base font-medium text-gray-900">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center text-[11px]">
              <span className="text-gray-500 font-medium uppercase tracking-wider">Method</span>
              <span className="font-medium text-gray-900">{order.paymentMethod === 'ONLINE' ? 'Razorpay' : 'Cash on Delivery'}</span>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  )
}
