import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = subscribeSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const { email } = result.data

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
    }

    // Save to database
    await prisma.newsletterSubscriber.create({
      data: { email }
    })

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
