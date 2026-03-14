'use client'

import { useState } from 'react'
import styles from './shop.module.css'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: 'free' | 'premium' | 'printed'
  image: string
  stlFile?: string
  printTime?: string
  material?: string
  stock?: number
}

const products: Product[] = [
  // STL GRATIS
  {
    id: 'serpent-basic',
    name: 'Serpent Guardian Basic',
    description: 'Escultura serpiente cyberpunk - Edición básica gratuita',
    price: 0,
    category: 'free',
    image: '/models/serpent-basic.jpg',
    stlFile: 'https://github.com/neoproxy-art/stl-library/releases/download/free/serpent-basic.stl',
    printTime: '4h',
    material: 'PLA'
  },
  {
    id: 'phone-stand-free',
    name: 'Neo Stand Minimal',
    description: 'Soporte celular minimalista cyberpunk',
    price: 0,
    category: 'free',
    image: '/models/stand-free.jpg',
    stlFile: 'https://github.com/neoproxy-art/stl-library/releases/download/free/neo-stand.stl',
    printTime: '2.5h',
    material: 'PLA'
  },
  {
    id: 'keychain-neo',
    name: 'NeoProxy Keychain',
    description: 'Llavero logo NeoProxy',
    price: 0,
    category: 'free',
    image: '/models/keychain.jpg',
    stlFile: 'https://github.com/neoproxy-art/stl-library/releases/download/free/keychain.stl',
    printTime: '45min',
    material: 'PLA'
  },
  
  // STL PREMIUM
  {
    id: 'serpent-premium',
    name: 'Serpent Guardian Pro',
    description: 'Escultura detallada con texturas - Sin marcas de agua',
    price: 12,
    originalPrice: 15,
    category: 'premium',
    image: '/models/serpent-premium.jpg',
    stlFile: 'https://neoproxy.art/api/download/premium/serpent-pro',
    printTime: '6h',
    material: 'PLA Silk'
  },
  {
    id: 'lamp-network',
    name: 'Living Network Lamp',
    description: 'Lámpara nodos interconectados con LEDs - Incluye instrucciones',
    price: 8,
    category: 'premium',
    image: '/models/lamp-network.jpg',
    stlFile: 'https://neoproxy.art/api/download/premium/lamp-network',
    printTime: '8h',
    material: 'PLA Translúcido'
  },
  {
    id: 'drone-frame',
    name: 'AeroFrame Neo 5"',
    description: 'Frame drone FPV optimizado por IA - Alto rendimiento',
    price: 15,
    category: 'premium',
    image: '/models/drone-frame.jpg',
    stlFile: 'https://neoproxy.art/api/download/premium/aeroframe-5',
    printTime: '6h',
    material: 'PETG Carbon'
  },
  {
    id: 'keycaps-set',
    name: 'NeoProxy Keycap Set',
    description: '104 keycaps temática red neuronal - MX Stem',
    price: 25,
    originalPrice: 30,
    category: 'premium',
    image: '/models/keycaps.jpg',
    stlFile: 'https://neoproxy.art/api/download/premium/keycaps-set',
    printTime: '12h',
    material: 'Resina'
  },
  
  // FIGURAS IMPRESAS
  {
    id: 'serpent-gold-printed',
    name: 'Serpent Guardian Gold [Impreso]',
    description: 'Escultura impresa PLA Silk Dorado - Listo para enviar',
    price: 45,
    category: 'printed',
    image: '/models/serpent-gold-printed.jpg',
    printTime: '4h',
    material: 'PLA Silk Dorado',
    stock: 5
  },
  {
    id: 'lamp-printed',
    name: 'Living Network Lamp [Impreso]',
    description: 'Lámpara completa con LEDs RGB y controlador',
    price: 85,
    category: 'printed',
    image: '/models/lamp-printed.jpg',
    printTime: '8h',
    material: 'PLA Translúcido + LEDs',
    stock: 3
  },
  {
    id: 'stand-pro-printed',
    name: 'Neo Stand Pro [Impreso]',
    description: 'Soporte celular premium - Acabado profesional',
    price: 25,
    category: 'printed',
    image: '/models/stand-pro.jpg',
    printTime: '2.5h',
    material: 'PETG Negro',
    stock: 10
  }
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'free' | 'premium' | 'printed'>('all')
  const [cart, setCart] = useState<Product[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    shipping: 'starken'
  })

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const addToCart = (product: Product) => {
    if (product.category === 'free') {
      // Descarga directa para STL gratis
      window.open(product.stlFile, '_blank')
      return
    }
    setCart([...cart, product])
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Preparar orden
    const order = {
      items: cart,
      customer: orderForm,
      total: cartTotal,
      date: new Date().toISOString()
    }
    
    // Guardar en Supabase o enviar email
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(order)
      })
      
      if (response.ok) {
        alert('¡Pedido recibido! Te contactaremos para confirmar pago y envío.')
        setCart([])
        setShowCheckout(false)
      }
    } catch (error) {
      // Fallback: enviar email directo
      const mailtoLink = `mailto:darkproxy@neoproxy.art?subject=Pedido NeoProxy&body=${encodeURIComponent(JSON.stringify(order, null, 2))}`
      window.location.href = mailtoLink
    }
  }

  return (
    <div className={styles.shopContainer}>
      <header className={styles.shopHeader}>
        <h1 className={styles.shopTitle}>NEO PROXY STORE</h1>
        <p className={styles.shopSubtitle}>STL Gratis · Premium · Figuras Impresas</p>
        
        <div className={styles.cartSummary}>
          <button 
            className={styles.cartButton}
            onClick={() => setShowCheckout(!showCheckout)}
          >
            🛒 Carrito ({cart.length}) - ${cartTotal}
          </button>
        </div>
      </header>

      {/* Filtros */}
      <div className={styles.filters}>
        <button 
          className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.active : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          Todos
        </button>
        <button 
          className={`${styles.filterBtn} ${activeCategory === 'free' ? styles.active : ''}`}
          onClick={() => setActiveCategory('free')}
        >
          🆓 Gratis
        </button>
        <button 
          className={`${styles.filterBtn} ${activeCategory === 'premium' ? styles.active : ''}`}
          onClick={() => setActiveCategory('premium')}
        >
          💎 Premium
        </button>
        <button 
          className={`${styles.filterBtn} ${activeCategory === 'printed' ? styles.active : ''}`}
          onClick={() => setActiveCategory('printed')}
        >
          🏭 Impresos
        </button>
      </div>

      {/* Grid de productos */}
      <div className={styles.productGrid}>
        {filteredProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              {/* Placeholder - reemplazar con imagen real */}
              <div className={styles.imagePlaceholder}>
                {product.category === 'free' && <span className={styles.freeBadge}>GRATIS</span>}
                {product.category === 'premium' && <span className={styles.premiumBadge}>PREMIUM</span>}
                {product.category === 'printed' && <span className={styles.printedBadge}>IMPRESO</span>}
                {product.stock && product.stock < 5 && (
                  <span className={styles.lowStock}>¡{product.stock} disponibles!</span>
                )}
              </div>
            </div>
            
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDesc}>{product.description}</p>
              
              <div className={styles.productMeta}>
                <span>⏱️ {product.printTime}</span>
                <span>📦 {product.material}</span>
              </div>
              
              <div className={styles.productPrice}>
                {product.price === 0 ? (
                  <span className={styles.freePrice}>GRATIS</span>
                ) : (
                  <>
                    <span className={styles.currentPrice}>${product.price}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>${product.originalPrice}</span>
                    )}
                  </>
                )}
              </div>
              
              <button 
                className={`${styles.addToCartBtn} ${product.category === 'free' ? styles.downloadBtn : ''}`}
                onClick={() => addToCart(product)}
              >
                {product.category === 'free' ? '⬇️ Descargar STL' : '🛒 Agregar al Carrito'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className={styles.checkoutModal}>
          <div className={styles.checkoutContent}>
            <button 
              className={styles.closeBtn}
              onClick={() => setShowCheckout(false)}
            >
              ✕
            </button>
            
            <h2>Finalizar Pedido</h2>
            
            {cart.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map((item, index) => (
                    <div key={index} className={styles.cartItem}>
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className={styles.cartTotal}>
                    <strong>Total: ${cartTotal}</strong>
                  </div>
                </div>
                
                <form className={styles.checkoutForm} onSubmit={handleCheckout}>
                  <h3>Datos de Contacto</h3>
                  <input 
                    type="text"
                    placeholder="Nombre completo"
                    value={orderForm.name}
                    onChange={e => setOrderForm({...orderForm, name: e.target.value})}
                    required
                  />
                  <input 
                    type="email"
                    placeholder="Email"
                    value={orderForm.email}
                    onChange={e => setOrderForm({...orderForm, email: e.target.value})}
                    required
                  />
                  <input 
                    type="tel"
                    placeholder="Teléfono (+56912345678)"
                    value={orderForm.phone}
                    onChange={e => setOrderForm({...orderForm, phone: e.target.value})}
                    required
                  />
                  
                  <h3>Envío</h3>
                  <input 
                    type="text"
                    placeholder="Dirección"
                    value={orderForm.address}
                    onChange={e => setOrderForm({...orderForm, address: e.target.value})}
                    required
                  />
                  <input 
                    type="text"
                    placeholder="Ciudad"
                    value={orderForm.city}
                    onChange={e => setOrderForm({...orderForm, city: e.target.value})}
                    required
                  />
                  
                  <select 
                    value={orderForm.shipping}
                    onChange={e => setOrderForm({...orderForm, shipping: e.target.value})}
                  >
                    <option value="starken">Starken Standard - $4,500</option>
                    <option value="starken_express">Starken Express - $8,500</option>
                    <option value="blue">Blue Express - $3,500</option>
                    <option value="correos">Correos Chile - $2,500</option>
                    <option value="pickup">Retiro Santiago (Tobalaba) - Gratis</option>
                  </select>
                  
                  <div className={styles.paymentInfo}>
                    <h3>Pago</h3>
                    <p>Te contactaremos para coordinar pago:</p>
                    <ul>
                      <li>💳 Transferencia bancaria</li>
                      <li>📱 MercadoPago</li>
                      <li>💰 Efectivo (retiro en persona)</li>
                    </ul>
                  </div>
                  
                  <button type="submit" className={styles.submitOrderBtn}>
                    Enviar Pedido
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Info adicional */}
      <section className={styles.infoSection}>
        <h2>🎨 ¿Necesitas algo único?</h2>
        <p>Ofrezco diseños personalizados desde $25</p>
        <a href="mailto:darkproxy@neoproxy.art" className={styles.contactBtn}>
          Cotizar Proyecto Personalizado
        </a>
      </section>
    </div>
  )
}
