import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clean existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productOption.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.deliverySetting.deleteMany()

  // 1. Create Default Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@brewspot.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log(`Created admin user: ${admin.email}`)

  // 2. Create Default Test User
  const userPassword = await bcrypt.hash('user123', 10)
  const user = await prisma.user.create({
    data: {
      name: 'Test Customer',
      email: 'customer@brewspot.com',
      password: userPassword,
      role: 'USER',
      phone: '9876543210'
    },
  })
  console.log(`Created customer user: ${user.email}`)

  // 3. Create Categories
  const catEspresso = await prisma.category.create({ data: { name: 'Espresso & Classic', description: 'Classic espresso-based drinks.' } })
  const catCold = await prisma.category.create({ data: { name: 'Cold Coffee', description: 'Refreshing cold brews and iced lattes.' } })
  const catFrappe = await prisma.category.create({ data: { name: 'Frappuccino', description: 'Blended ice coffee beverages.' } })
  const catTea = await prisma.category.create({ data: { name: 'Tea & Non-Coffee', description: 'Premium teas and hot chocolate.' } })
  const catBakery = await prisma.category.create({ data: { name: 'Bakery & Pastries', description: 'Freshly baked goods every morning.' } })
  const catDesserts = await prisma.category.create({ data: { name: 'Desserts', description: 'Sweet treats to complete your meal.' } })
  const catSandwiches = await prisma.category.create({ data: { name: 'Sandwiches & Snacks', description: 'Savory bites perfect for lunch.' } })

  console.log('Created categories')

  // Helper for product options
  const defaultCoffeeOptions = [
    { name: 'Size', choices: JSON.stringify([{ name: 'Small', priceDelta: 0 }, { name: 'Medium', priceDelta: 30 }, { name: 'Large', priceDelta: 60 }]) },
    { name: 'Extra Shot', choices: JSON.stringify([{ name: 'None', priceDelta: 0 }, { name: '1 Shot', priceDelta: 30 }, { name: '2 Shots', priceDelta: 60 }]) },
    { name: 'Milk Type', choices: JSON.stringify([{ name: 'Whole Milk', priceDelta: 0 }, { name: 'Oat Milk', priceDelta: 40 }, { name: 'Almond Milk', priceDelta: 40 }, { name: 'Soy Milk', priceDelta: 40 }]) },
    { name: 'Sugar', choices: JSON.stringify([{ name: 'None', priceDelta: 0 }, { name: 'Less Sugar', priceDelta: 0 }, { name: 'Normal', priceDelta: 0 }, { name: 'Extra Sugar', priceDelta: 0 }]) }
  ]

  // 4. Create Products
  const productsToCreate = [
    // Espresso & Classic
    { name: 'Espresso', description: 'A concentrated shot of pure coffee.', price: 120, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop', categoryId: catEspresso.id, isCoffee: false },
    { name: 'Doppio', description: 'Double shot of espresso.', price: 160, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop', categoryId: catEspresso.id, isCoffee: false },
    { name: 'Americano', description: 'Espresso shots topped with hot water.', price: 150, image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=600&auto=format&fit=crop', categoryId: catEspresso.id, isCoffee: true },
    { name: 'Cappuccino', description: 'Espresso with steamed milk and a deep layer of foam.', price: 190, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop', categoryId: catEspresso.id, isCoffee: true },
    { name: 'Latte', description: 'Espresso balanced with steamed milk and a light layer of foam.', price: 200, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=600&auto=format&fit=crop', categoryId: catEspresso.id, isCoffee: true },
    { name: 'Mocha', description: 'Espresso with bittersweet mocha sauce and steamed milk.', price: 220, image: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=600&auto=format&fit=crop', categoryId: catEspresso.id, isCoffee: true },
    { name: 'Flat White', description: 'Ristretto shots of espresso with steamed whole milk.', price: 210, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=600&auto=format&fit=crop', categoryId: catEspresso.id, isCoffee: true },
    { name: 'Macchiato', description: 'Espresso topped with a dollop of milk foam.', price: 170, image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop', categoryId: catEspresso.id, isCoffee: true },

    // Cold Coffee
    { name: 'Iced Americano', description: 'Espresso shots with cold water and ice.', price: 160, image: '/images/menu_coffee_2.jpg', categoryId: catCold.id, isCoffee: true },
    { name: 'Iced Latte', description: 'Espresso, milk and ice.', price: 210, image: '/images/menu_coffee_2.jpg', categoryId: catCold.id, isCoffee: true },
    { name: 'Cold Brew', description: 'Slow-steeped custom blend for a super smooth taste.', price: 230, image: '/images/menu_coffee_2.jpg', categoryId: catCold.id, isCoffee: true },
    { name: 'Vanilla Sweet Cream Cold Brew', description: 'Cold brew topped with vanilla sweet cream.', price: 260, image: '/images/menu_coffee_2.jpg', categoryId: catCold.id, isCoffee: true },
    { name: 'Dalgona Coffee', description: 'Whipped, frothy coffee over iced milk.', price: 240, image: '/images/menu_coffee_1.jpg', categoryId: catCold.id, isCoffee: true },
    { name: 'Iced Mocha', description: 'Espresso, bittersweet mocha sauce, milk and ice.', price: 240, image: '/images/menu_coffee_2.jpg', categoryId: catCold.id, isCoffee: true },

    // Frappuccino
    { name: 'Caramel Frappuccino', description: 'Coffee, caramel syrup, milk and ice blended.', price: 280, image: '/images/menu_coffee_1.jpg', categoryId: catFrappe.id, isCoffee: true },
    { name: 'Mocha Frappuccino', description: 'Coffee, mocha sauce, milk and ice blended.', price: 280, image: '/images/menu_coffee_1.jpg', categoryId: catFrappe.id, isCoffee: true },
    { name: 'Java Chip Frappuccino', description: 'Mocha sauce and Frappuccino chips blended with coffee.', price: 300, image: '/images/menu_coffee_1.jpg', categoryId: catFrappe.id, isCoffee: true },
    { name: 'Vanilla Bean Creme', description: 'Vanilla bean, milk and ice blended.', price: 260, image: '/images/menu_coffee_1.jpg', categoryId: catFrappe.id, isCoffee: true },

    // Tea & Non-Coffee
    { name: 'Classic Hot Chocolate', description: 'Steamed milk with chocolate syrup, topped with whipped cream.', price: 190, image: '/images/menu_coffee_3.jpg', categoryId: catTea.id, isCoffee: true }, // uses size and milk options
    { name: 'Matcha Green Tea Latte', description: 'Smooth and creamy matcha sweetened just right.', price: 220, image: '/images/menu_coffee_3.jpg', categoryId: catTea.id, isCoffee: true },
    { name: 'Chai Tea Latte', description: 'Black tea infused with cinnamon, clove and other warming spices.', price: 200, image: '/images/menu_coffee_3.jpg', categoryId: catTea.id, isCoffee: true },
    { name: 'English Breakfast Tea', description: 'Full-bodied black tea.', price: 150, image: '/images/menu_coffee_3.jpg', categoryId: catTea.id, isCoffee: false },

    // Bakery
    { name: 'Butter Croissant', description: 'Flaky, buttery, authentic French croissant.', price: 150, image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=600&auto=format&fit=crop', categoryId: catBakery.id, isCoffee: false },
    { name: 'Almond Croissant', description: 'Classic butter croissant topped with sliced almonds.', price: 190, image: 'https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=600&auto=format&fit=crop', categoryId: catBakery.id, isCoffee: false },
    { name: 'Blueberry Muffin', description: 'Moist muffin bursting with sweet blueberries.', price: 160, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=600&auto=format&fit=crop', categoryId: catBakery.id, isCoffee: false },
    { name: 'Chocolate Chip Cookie', description: 'Chewy cookie with large chocolate chunks.', price: 120, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop', categoryId: catBakery.id, isCoffee: false },

    // Desserts
    { name: 'Decadent Chocolate Cake', description: 'Rich chocolate cake with glossy ganache.', price: 250, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop', categoryId: catDesserts.id, isCoffee: false },
    { name: 'Classic Brownie', description: 'Fudgy chocolate brownie.', price: 180, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop', categoryId: catDesserts.id, isCoffee: false },
    { name: 'New York Cheesecake', description: 'Classic creamy cheesecake with graham cracker crust.', price: 280, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop', categoryId: catDesserts.id, isCoffee: false },
    { name: 'Tiramisu', description: 'Coffee-flavored Italian dessert.', price: 300, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop', categoryId: catDesserts.id, isCoffee: false },

    // Sandwiches
    { name: 'Grilled Cheese Sandwich', description: 'Melted cheddar and mozzarella on toasted sourdough.', price: 220, image: '/images/dessert_v2.jpg', categoryId: catSandwiches.id, isCoffee: false },
    { name: 'Chicken Tikka Panini', description: 'Spicy chicken tikka in a grilled panini bread.', price: 260, image: '/images/dessert_v2.jpg', categoryId: catSandwiches.id, isCoffee: false },
    { name: 'Veg Club Sandwich', description: 'Triple decker sandwich with fresh veggies and cheese.', price: 200, image: '/images/dessert_v2.jpg', categoryId: catSandwiches.id, isCoffee: false },
  ]

  let productCount = 0;
  for (const p of productsToCreate) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        categoryId: p.categoryId,
        rating: 4 + Math.random(), // 4.0 to 5.0
      }
    })
    
    if (p.isCoffee) {
      for (const opt of defaultCoffeeOptions) {
        await prisma.productOption.create({
          data: {
            productId: product.id,
            name: opt.name,
            choices: opt.choices
          }
        })
      }
    }
    productCount++;
  }
  console.log(`Created ${productCount} products`)

  // 5. Create Coupons
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrderValue: 0,
    }
  })
  
  await prisma.coupon.create({
    data: {
      code: 'COFFEE20',
      discountType: 'PERCENTAGE',
      discountValue: 20,
      minOrderValue: 500,
    }
  })

  await prisma.coupon.create({
    data: {
      code: 'FIRSTORDER',
      discountType: 'FIXED',
      discountValue: 100,
      minOrderValue: 300,
    }
  })
  console.log('Created coupons')

  // 6. Create Delivery Settings
  await prisma.deliverySetting.create({
    data: {
      baseFee: 50,
      freeDeliveryOver: 499,
      estimatedMinutes: 45,
    }
  })
  console.log('Created delivery settings')

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
