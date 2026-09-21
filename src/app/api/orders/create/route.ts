import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    // For this demo, we allow guest checkout by connecting to the default customer user if not logged in
    let userId = session?.user?.id

    // Check if the user actually exists (in case DB was reset but session cookie remained)
    if (userId) {
      const userExists = await prisma.user.findUnique({ where: { id: userId } })
      if (!userExists) {
        userId = undefined
      }
    }

    if (!userId) {
      const defaultUser = await prisma.user.findFirst({ where: { email: 'customer@brewspot.com' }})
      if (defaultUser) userId = defaultUser.id
    }

    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    const body = await req.json()
    const { items, totalAmount, subtotal, deliveryFee, discount, paymentMethod, shippingAddress, customerInfo } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Use Prisma transaction to create Address, Order, and OrderItems
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create or find address
      const address = await tx.address.create({
        data: {
          userId,
          title: 'Delivery Address',
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.pincode,
        }
      })

      // 2. Create Order
      const newOrder = await tx.order.create({
        data: {
          userId,
          addressId: address.id,
          totalAmount,
          subtotal,
          deliveryFee,
          discount,
          paymentMethod,
          paymentStatus: paymentMethod === 'ONLINE' ? 'PAID' : 'PENDING',
          status: 'CONFIRMED', // Automatically confirmed for this demo
        }
      })

      // 3. Create Order Items
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            customization: item.customization,
          }
        })
      }

      return newOrder
    })

    return NextResponse.json({ message: 'Order created successfully', orderId: order.id }, { status: 201 })
    
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}
