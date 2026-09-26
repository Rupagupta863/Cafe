'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react'
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
      
      <div className="flex items-baseline gap-2 pb-4">
        <span className="text-2xl font-semibold text-coffee-dark">₹{currentPrice.toFixed(2)}</span>
        <span className="text-xs font-medium text-coffee-dark/60">Tax included</span>
      </div>

      <div className="space-y-4">
        {parsedOptions.map(opt => (
          <div key={opt.id} className="space-y-2">
            <label className="block text-sm font-medium text-coffee-dark">{opt.name}</label>
            <div className="flex flex-wrap gap-2">
              {opt.choices.map((choice: OptionChoice) => {
                const isSelected = selections[opt.name] === choice.name;
                return (
                  <button
                    key={choice.name}
                    onClick={() => handleSelection(opt.name, choice.name)}
                    className={`inline-flex items-center px-4 py-1.5 text-sm rounded-md border ${
                      isSelected 
                        ? 'border-coffee-brown bg-coffee-brown text-white' 
                        : 'border-coffee-beige/30 bg-white text-coffee-dark/80 hover:border-coffee-brown/60 hover:bg-coffee-beige/5'
                    } transition-colors`}
                  >
                    {choice.name} 
                    {choice.priceDelta > 0 && <span className={`${isSelected ? 'text-white/70' : 'text-coffee-dark/50'} ml-1.5 text-xs`}>+₹{choice.priceDelta}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="space-y-2 pt-2 border-t border-coffee-beige/10">
          <label className="block text-sm font-medium text-coffee-dark">Quantity</label>
          <div className="flex items-center w-28 border border-coffee-beige/30 rounded-md overflow-hidden bg-white">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex-1 h-8 flex items-center justify-center text-coffee-dark/60 hover:bg-coffee-beige/10 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <div className="flex items-center justify-center font-medium text-sm text-coffee-dark w-10 h-8 border-x border-coffee-beige/30">
              {quantity}
            </div>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="flex-1 h-8 flex items-center justify-center text-coffee-dark/60 hover:bg-coffee-beige/10 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-md shadow-sm text-white bg-coffee-dark hover:bg-coffee-brown transition-colors gap-2"
        >
          <ShoppingCart className="w-4 h-4" /> 
          <span>Add to Order &mdash; ₹{(currentPrice * quantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  )
}
