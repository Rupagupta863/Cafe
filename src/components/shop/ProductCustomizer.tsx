'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { ShoppingCart } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

type OptionChoice = { name: string; priceDelta: number }
type ParsedOption = { id: string; name: string; choices: OptionChoice[] }

export function ProductCustomizer({ product }: { product: any }) {
  const addItem = useCartStore(state => state.addItem)
  
  const parsedOptions: ParsedOption[] = product.options.map((opt: any) => ({
    ...opt,
    choices: JSON.parse(opt.choices)
  }))

  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    parsedOptions.forEach(opt => {
      initial[opt.name] = opt.choices[0]?.name
    })
    return initial
  })
  const [quantity, setQuantity] = useState(1)

  const handleSelection = (optionName: string, choiceName: string) => {
    setSelections(prev => ({ ...prev, [optionName]: choiceName }))
  }

  // Calculate dynamic price
  let currentPrice = product.price
  parsedOptions.forEach(opt => {
    const selectedChoiceName = selections[opt.name]
    const choice = opt.choices.find((c: OptionChoice) => c.name === selectedChoiceName)
    if (choice) {
      currentPrice += choice.priceDelta
    }
  })

  const handleAddToCart = () => {
    const customizationString = JSON.stringify(selections)
    const uniqueId = `${product.id}-${customizationString}`
    
    addItem({
      id: uniqueId,
      productId: product.id,
      name: product.name,
      price: currentPrice,
      image: product.image,
      quantity,
      customization: customizationString
    })
    
    toast.success(`Added ${quantity} ${product.name} to cart!`, {
      icon: '☕',
      style: { borderRadius: '12px', background: '#333', color: '#fff' }
    })
  }

  return (
    <div className="space-y-8">
      <Toaster position="top-center" />
      
      <div className="text-3xl font-bold text-coffee-dark">
        ₹{currentPrice.toFixed(2)}
      </div>

      {parsedOptions.map(opt => (
        <div key={opt.id} className="space-y-3">
          <label className="block text-sm font-bold text-gray-700">{opt.name}</label>
          <div className="flex flex-wrap gap-3">
            {opt.choices.map((choice: OptionChoice) => (
              <button
                key={choice.name}
                onClick={() => handleSelection(opt.name, choice.name)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  selections[opt.name] === choice.name 
                    ? 'border-coffee-brown bg-coffee-beige/20 text-coffee-dark shadow-sm' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {choice.name} {choice.priceDelta > 0 && `(+₹${choice.priceDelta})`}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="block text-sm font-bold text-gray-700">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-12 w-32">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
            >-</button>
            <div className="flex-1 h-full flex items-center justify-center font-bold text-gray-900 border-x border-gray-200">
              {quantity}
            </div>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
            >+</button>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={handleAddToCart}
          className="w-full h-14 bg-coffee-dark text-white rounded-xl font-bold text-lg hover:bg-coffee-brown hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center gap-3"
        >
          <ShoppingCart className="w-5 h-5" /> Add to Cart — ₹{(currentPrice * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  )
}
