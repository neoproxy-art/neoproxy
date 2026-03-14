import { NextRequest, NextResponse } from 'next/server'

interface OrderItem {
  id: string
  name: string
  price: number
  category: string
}

interface Order {
  items: OrderItem[]
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    shipping: string
  }
  total: number
  date: string
}

// Simple in-memory storage (replace with database in production)
const orders: Order[] = []

export async function POST(request: NextRequest) {
  try {
    const order: Order = await request.json()
    
    // Validate required fields
    if (!order.items || order.items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      )
    }
    
    if (!order.customer || !order.customer.email) {
      return NextResponse.json(
        { error: 'Customer email required' },
        { status: 400 }
      )
    }
    
    // Add order to storage
    orders.push(order)
    
    // Log order (for development)
    console.log('New order received:', {
      items: order.items.length,
      total: order.total,
      customer: order.customer.email,
      date: order.date
    })
    
    // Send notification email (simplified - in production use SendGrid/Nodemailer)
    const emailBody = `
NUEVO PEDIDO - NeoProxy Store

Cliente: ${order.customer.name}
Email: ${order.customer.email}
Teléfono: ${order.customer.phone}

Productos:
${order.items.map(item => `- ${item.name}: $${item.price}`).join('\n')}

Total: $${order.total}

Envío:
Dirección: ${order.customer.address}
Ciudad: ${order.customer.city}
Método: ${order.customer.shipping}

Fecha: ${order.date}
    `.trim()
    
    // For now, just log the email that would be sent
    console.log('Email to send:', emailBody)
    
    return NextResponse.json({
      success: true,
      message: 'Order received successfully',
      orderId: `NP-${Date.now()}`,
      emailBody
    })
    
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return all orders (for admin purposes)
  return NextResponse.json({
    orders: orders,
    count: orders.length
  })
}
