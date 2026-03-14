# 🏪 NEO PROXY STORE - Sistema de E-commerce Propio
## Tienda integrada en NeoProxy - Sin Shopify, 100% control

> *"Tu propio Amazon cyberpunk - Construido, no alquilado"*

---

## 🎯 ARQUITECTURA DE LA TIENDA

### Estructura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     NEO PROXY STORE                         │
│                   (Tu propia tienda)                       │
├─────────────────────────────────────────────────────────────┤
│  FRONTEND (Next.js + React)                                 │
│  ├── Product Gallery (3D viewer)                           │
│  ├── Shopping Cart (Persistent)                            │
│  ├── Checkout Flow (Multi-step)                            │
│  ├── User Dashboard (Orders, Profile)                      │
│  └── Admin Panel (DarkProxy only)                          │
├─────────────────────────────────────────────────────────────┤
│  BACKEND API (Next.js API Routes)                           │
│  ├── Products API (CRUD)                                    │
│  ├── Orders API (Create, Update, Track)                    │
│  ├── Payments API (Stripe, PayPal, Crypto)                 │
│  ├── Inventory API (Stock management)                      │
│  ├── Shipping API (Chile: Starken, Blue Express)           │
│  └── Webhooks (Notifications, Automation)                │
├─────────────────────────────────────────────────────────────┤
│  DATABASE (PostgreSQL / Supabase)                          │
│  ├── Products (Catalog, Variants, Pricing)                │
│  ├── Orders (Status, History, Tracking)                   │
│  ├── Customers (Profiles, Addresses)                      │
│  ├── Inventory (Stock, Materials)                         │
│  └── Analytics (Sales, Views, Conversion)                │
├─────────────────────────────────────────────────────────────┤
│  INTEGRACIONES                                              │
│  ├── Print Queue (Auto-assign to printers)                │
│  ├── Email Service (SendGrid)                             │
│  ├── Payment Gateways (Stripe, MercadoPago)              │
│  ├── Shipping Labels (Auto-generate)                     │
│  └── Notification System (WhatsApp, Email)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛍️ CATÁLOGO DE PRODUCTOS (Schema)

### Modelo de Datos

```typescript
// src/types/store.ts

interface Product {
  id: string;                    // SKU único
  slug: string;                  // URL amigable
  name: string;                  // "Serpent Guardian"
  description: string;           // Descripción larga
  shortDescription: string;    // Para cards
  
  // Categorización
  category: 'art' | 'functional' | 'custom' | 'electronics';
  tags: string[];               // ['sculpture', 'cyberpunk', 'limited']
  
  // Pricing
  basePrice: number;          // Precio base
  compareAtPrice?: number;   // Precio "tachado" (descuento)
  cost: number;               // Costo de producción (privado)
  
  // Variantes
  variants: ProductVariant[];
  
  // Media
  images: ProductImage[];
  model3D?: string;           // URL modelo 3D interactivo
  video?: string;           // URL video showcase
  
  // Producción
  printerType: 'FDM' | 'RESIN' | 'HYBRID';
  printTime: number;         // Minutos estimados
  materialUsage: {           // Consumo por unidad
    pla?: number;           // gramos
    resin?: number;         // ml
    hardware?: number;      // costo extra
  };
  
  // Inventario
  inventory: {
    tracked: boolean;
    quantity: number;       // Stock disponible
    reorderPoint: number;  // Alerta reorden
  };
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  
  // Estado
  status: 'draft' | 'active' | 'archived';
  featured: boolean;         // Destacado en homepage
  createdAt: Date;
  updatedAt: Date;
}

interface ProductVariant {
  id: string;
  sku: string;              // SKU específico
  name: string;             // "Gold Silk"
  options: {               // { color: "gold", size: "15cm" }
    [key: string]: string;
  };
  price: number;           // Precio específico
  inventory: number;       // Stock de esta variante
  images: string[];        // Fotos específicas
  materialCode?: string;   // Código material para producción
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;          // Orden en gallery
  isPrimary: boolean;     // Foto principal
}
```

---

## 🛒 SISTEMA DE CARRITO Y CHECKOUT

### Carrito Persistente

```typescript
// src/lib/store/cart.ts

class NeoProxyCart {
  private storage: Storage;  // localStorage / sessionStorage
  
  constructor() {
    this.storage = typeof window !== 'undefined' ? localStorage : null;
  }
  
  // Añadir producto al carrito
  async addItem(productId: string, variantId: string, quantity: number = 1) {
    const cart = this.getCart();
    
    // Verificar stock
    const stock = await this.checkStock(productId, variantId);
    if (stock < quantity) {
      throw new Error(`Solo hay ${stock} unidades disponibles`);
    }
    
    const existingItem = cart.items.find(
      item => item.productId === productId && item.variantId === variantId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        id: crypto.randomUUID(),
        productId,
        variantId,
        quantity,
        addedAt: new Date()
      });
    }
    
    cart.updatedAt = new Date();
    this.saveCart(cart);
    
    // Evento para actualizar UI
    this.emitCartUpdate(cart);
  }
  
  // Calcular totales
  calculateTotals(cart: Cart): CartTotals {
    const subtotal = cart.items.reduce((sum, item) => {
      const product = this.getProduct(item.productId);
      const variant = product.variants.find(v => v.id === item.variantId);
      return sum + (variant?.price || product.basePrice) * item.quantity;
    }, 0);
    
    // Chile: IVA 19%
    const tax = subtotal * 0.19;
    
    // Envío (calcular basado en dirección)
    const shipping = this.calculateShipping(cart);
    
    return {
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      items: cart.items.length
    };
  }
  
  // Sincronizar con servidor (para multi-device)
  async syncWithServer() {
    const cart = this.getCart();
    if (!cart.userId) return; // Solo usuarios logueados
    
    const response = await fetch('/api/cart/sync', {
      method: 'POST',
      body: JSON.stringify(cart)
    });
    
    if (response.ok) {
      const serverCart = await response.json();
      // Merge carritos (estrategia: server wins)
      this.saveCart(serverCart);
    }
  }
}
```

### Checkout Multi-Step

```typescript
// src/components/checkout/CheckoutFlow.tsx

interface CheckoutStep {
  id: 'information' | 'shipping' | 'payment' | 'review';
  title: string;
  component: React.ComponentType;
  isComplete: boolean;
}

const checkoutSteps: CheckoutStep[] = [
  {
    id: 'information',
    title: 'Información de contacto',
    component: ContactForm,
    isComplete: false
  },
  {
    id: 'shipping',
    title: 'Envío',
    component: ShippingForm,
    isComplete: false
  },
  {
    id: 'payment',
    title: 'Pago',
    component: PaymentForm,
    isComplete: false
  },
  {
    id: 'review',
    title: 'Revisar y confirmar',
    component: OrderReview,
    isComplete: false
  }
];

// Contact Form
function ContactForm({ onComplete }: { onComplete: (data: ContactData) => void }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: ''
  });
  
  // Validación en tiempo real
  const validation = useMemo(() => ({
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    phone: /^\+?56\d{9}$/.test(formData.phone), // Chileno
    firstName: formData.firstName.length > 2,
    lastName: formData.lastName.length > 2
  }), [formData]);
  
  const isValid = Object.values(validation).every(Boolean);
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (isValid) onComplete(formData);
    }}>
      <Input 
        label="Email"
        type="email"
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})}
        error={!validation.email && formData.email ? 'Email inválido' : ''}
      />
      <Input 
        label="Teléfono (Chile)"
        type="tel"
        value={formData.phone}
        placeholder="+56912345678"
        onChange={e => setFormData({...formData, phone: e.target.value})}
      />
      <div className="name-row">
        <Input 
          label="Nombre"
          value={formData.firstName}
          onChange={e => setFormData({...formData, firstName: e.target.value})}
        />
        <Input 
          label="Apellido"
          value={formData.lastName}
          onChange={e => setFormData({...formData, lastName: e.target.value})}
        />
      </div>
      <Button type="submit" disabled={!isValid}>
        Continuar al envío
      </Button>
    </form>
  );
}

// Shipping Form (Chile-specific)
function ShippingForm({ onComplete }: { onComplete: (data: ShippingData) => void }) {
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [address, setAddress] = useState('');
  
  // Opciones de envío Chile
  const shippingOptions = [
    {
      id: 'starken_standard',
      name: 'Starken Standard',
      price: 4500,
      eta: '2-3 días hábiles',
      available: true
    },
    {
      id: 'starken_express',
      name: 'Starken Express',
      price: 8500,
      eta: '1 día hábil',
      available: true
    },
    {
      id: 'blue_express',
      name: 'Blue Express',
      price: 3500,
      eta: '3-4 días hábiles',
      available: true
    },
    {
      id: 'pickup',
      name: 'Retiro en Santiago (Metro Tobalaba)',
      price: 0,
      eta: 'Coordinar',
      available: true
    }
  ];
  
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  
  return (
    <div className="shipping-form">
      <h3>Dirección de envío</h3>
      
      <Select 
        label="Región"
        options={chileanRegions}
        value={region}
        onChange={setRegion}
      />
      
      <Select 
        label="Comuna"
        options={comunasByRegion[region] || []}
        value={comuna}
        onChange={setComuna}
        disabled={!region}
      />
      
      <Input 
        label="Dirección"
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Av. Providencia 1234, Depto 502"
      />
      
      <h3>Método de envío</h3>
      <div className="shipping-options">
        {shippingOptions.map(option => (
          <ShippingOption 
            key={option.id}
            option={option}
            selected={selectedShipping.id === option.id}
            onSelect={() => setSelectedShipping(option)}
          />
        ))}
      </div>
      
      <Button onClick={() => onComplete({
        region,
        comuna,
        address,
        method: selectedShipping
      })}>
        Continuar al pago
      </Button>
    </div>
  );
}
```

---

## 💳 SISTEMA DE PAGOS

### Múltiples Gateways

```typescript
// src/lib/payments/paymentGateways.ts

interface PaymentGateway {
  name: string;
  processPayment: (order: Order, paymentData: any) => Promise<PaymentResult>;
  refund?: (transactionId: string, amount: number) => Promise<boolean>;
}

const paymentGateways: Record<string, PaymentGateway> = {
  stripe: {
    name: 'Stripe',
    processPayment: async (order, paymentData) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.total * 100), // Centavos
        currency: 'clp',
        automatic_payment_methods: { enabled: true },
        metadata: {
          orderId: order.id,
          customerEmail: order.customer.email
        }
      });
      
      return {
        success: true,
        transactionId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret
      };
    },
    refund: async (transactionId, amount) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      await stripe.refunds.create({
        payment_intent: transactionId,
        amount: Math.round(amount * 100)
      });
      return true;
    }
  },
  
  mercadopago: {
    name: 'MercadoPago',
    processPayment: async (order, paymentData) => {
      // MercadoPago Chile integration
      const mp = new MercadoPago(process.env.MP_ACCESS_TOKEN);
      
      const preference = {
        items: [{
          title: `NeoProxy Order #${order.id}`,
          quantity: 1,
          unit_price: order.total
        }],
        payer: {
          email: order.customer.email
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_URL}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_URL}/checkout/pending`
        }
      };
      
      const response = await mp.preferences.create(preference);
      
      return {
        success: true,
        transactionId: response.body.id,
        redirectUrl: response.body.init_point
      };
    }
  },
  
  crypto: {
    name: 'Crypto (USDC/ETH)',
    processPayment: async (order, paymentData) => {
      // Web3 integration
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Convert CLP to USDC (usar oracle de precio)
      const usdcAmount = await convertCLPToUSDC(order.total);
      
      const tx = await signer.sendTransaction({
        to: process.env.NEO_PROXY_WALLET,
        value: usdcAmount
      });
      
      return {
        success: true,
        transactionId: tx.hash,
        confirmations: await tx.wait()
      };
    }
  },
  
  transferencia: {
    name: 'Transferencia Bancaria',
    processPayment: async (order, paymentData) => {
      // Marcar como "pending" hasta confirmar
      return {
        success: true,
        status: 'pending',
        instructions: {
          bank: 'Banco de Chile',
          account: '12-345-678-900',
          name: 'NEOPROXY FABRICATION',
          rut: '12.345.678-9',
          reference: `NP-${order.id}`,
          amount: order.total
        }
      };
    }
  }
};
```

---

## 📦 GESTIÓN DE PEDIDOS

### Order Lifecycle

```typescript
// src/lib/orders/orderManager.ts

class OrderManager {
  async createOrder(cart: Cart, customer: Customer, payment: Payment): Promise<Order> {
    const order: Order = {
      id: generateOrderId(),  // NP-2024-001
      customer,
      items: cart.items,
      totals: cart.totals,
      payment,
      status: 'pending',  // Estado inicial
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Guardar en DB
    await db.orders.create(order);
    
    // Asignar a fila de impresión
    await this.assignToPrintQueue(order);
    
    // Enviar confirmación
    await this.sendOrderConfirmation(order);
    
    return order;
  }
  
  // FSM (Finite State Machine) para estados
  async updateStatus(orderId: string, newStatus: OrderStatus) {
    const order = await db.orders.findById(orderId);
    
    // Validar transición de estado
    if (!this.isValidStatusTransition(order.status, newStatus)) {
      throw new Error(`No se puede cambiar de ${order.status} a ${newStatus}`);
    }
    
    order.status = newStatus;
    order.updatedAt = new Date();
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date(),
      note: this.getStatusNote(newStatus)
    });
    
    await db.orders.update(order);
    
    // Notificar cliente
    await this.notifyStatusChange(order);
    
    // Acciones automáticas según estado
    await this.handleStatusActions(order);
  }
  
  private async handleStatusActions(order: Order) {
    switch (order.status) {
      case 'confirmed':
        // Iniciar pre-calentamiento impresoras
        await this.warmupPrinters(order);
        break;
        
      case 'printing':
        // Iniciar monitoreo con ESP32-cam
        await this.startPrintMonitoring(order);
        break;
        
      case 'quality_check':
        // IA verifica calidad
        const quality = await this.aiQualityCheck(order);
        if (quality.passed) {
          await this.updateStatus(order.id, 'packing');
        } else {
          await this.handleQualityFailure(order, quality);
        }
        break;
        
      case 'shipped':
        // Enviar tracking al cliente
        await this.sendTrackingInfo(order);
        break;
        
      case 'delivered':
        // Solicitar review después de 7 días
        await this.scheduleReviewRequest(order);
        break;
    }
  }
}

// Estados del pedido
const orderStatuses = [
  'pending',           // Esperando pago
  'confirmed',       // Pago recibido, preparando
  'designing',       // IA optimizando diseño
  'printing',        // En impresora
  'cooling',         // Enfriando pieza
  'post_processing', // Limpieza/soportes
  'quality_check',   // Verificación calidad
  'packing',         // Empacando
  'shipped',         // Enviado
  'delivered',       // Entregado
  'completed',       // Pedido finalizado
  'cancelled',       // Cancelado
  'refunded'         // Reembolsado
] as const;
```

---

## 🎨 UI/UX DE LA TIENDA

### Diseño Cyberpunk

```typescript
// src/app/shop/layout.tsx

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="neo-store">
      <StoreHeader />
      <main className="store-content">
        {children}
      </main>
      <StoreFooter />
      <CartDrawer />  {/* Carrito lateral */}
      <NotificationCenter />  {/* Toasts, alerts */}
    </div>
  );
}

// Header de la tienda
function StoreHeader() {
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="store-header">
      <Link href="/shop" className="store-logo">
        <Logo />
        <span>NEO STORE</span>
      </Link>
      
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Buscar productos..."
      />
      
      <nav className="store-nav">
        <Link href="/shop/products">Productos</Link>
        <Link href="/shop/categories">Categorías</Link>
        <Link href="/shop/about">Nosotros</Link>
        <Link href="/shop/contact">Contacto</Link>
      </nav>
      
      <div className="store-actions">
        <button className="cart-button" onClick={toggleCart}>
          <CartIcon />
          {items.length > 0 && (
            <span className="cart-badge">{items.length}</span>
          )}
        </button>
        
        <UserMenu />
      </div>
    </header>
  );
}

// Grid de productos
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <article 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <Image 
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          className={`product-image ${isHovered ? 'zoomed' : ''}`}
        />
        
        {product.inventory.quantity < 5 && (
          <span className="low-stock-badge">¡Quedan pocas!</span>
        )}
        
        {product.compareAtPrice && (
          <span className="sale-badge">
            -{Math.round((1 - product.basePrice/product.compareAtPrice) * 100)}%
          </span>
        )}
        
        {isHovered && (
          <div className="product-overlay">
            <QuickAddButton product={product} />
            <ViewDetailsButton product={product} />
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.shortDescription}</p>
        
        <div className="product-price">
          <span className="current-price">
            ${product.basePrice.toLocaleString('es-CL')}
          </span>
          {product.compareAtPrice && (
            <span className="original-price">
              ${product.compareAtPrice.toLocaleString('es-CL')}
            </span>
          )}
        </div>
        
        {product.variants.length > 1 && (
          <div className="product-variants">
            {product.variants.slice(0, 3).map(variant => (
              <VariantSwatch key={variant.id} variant={variant} />
            ))}
            {product.variants.length > 3 && (
              <span>+{product.variants.length - 3} más</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
```

---

## 📊 PANEL DE ADMINISTRACIÓN (DarkProxy Only)

### Dashboard de Control

```typescript
// src/app/admin/dashboard/page.tsx

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>();
  const [recentOrders, setRecentOrders] = useState<Order[]>();
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  return (
    <div className="admin-dashboard">
      <h1>NeoProxy Store Control Center</h1>
      
      <div className="stats-grid">
        <StatCard 
          title="Ventas Hoy"
          value={stats?.todaySales}
          change={stats?.salesChange}
          icon={<SalesIcon />}
        />
        <StatCard 
          title="Pedidos Pendientes"
          value={stats?.pendingOrders}
          urgent={stats?.pendingOrders > 10}
          icon={<OrdersIcon />}
        />
        <StatCard 
          title="Productos Stock Bajo"
          value={stats?.lowStockProducts}
          warning={stats?.lowStockProducts > 3}
          icon={<InventoryIcon />}
        />
        <StatCard 
          title="Ingresos Mes"
          value={stats?.monthRevenue}
          change={stats?.revenueChange}
          icon={<RevenueIcon />}
        />
      </div>
      
      <div className="dashboard-sections">
        <section className="print-queue">
          <h2>Cola de Impresión</h2>
          <PrintQueueManager />
        </section>
        
        <section className="recent-orders">
          <h2>Últimos Pedidos</h2>
          <OrdersTable orders={recentOrders} />
        </section>
        
        <section className="analytics">
          <h2>Análisis de Ventas</h2>
          <SalesChart period="30d" />
        </section>
      </div>
    </div>
  );
}

// Gestión de cola de impresión
function PrintQueueManager() {
  const [queue, setQueue] = useState<PrintJob[]>();
  
  return (
    <div className="print-queue-manager">
      <div className="printers-status">
        <PrinterStatus printerId="ender3_1" />
        <PrinterStatus printerId="ender3_2" />
        <PrinterStatus printerId="anycubic_photon" />
      </div>
      
      <div className="queue-list">
        {queue?.map(job => (
          <PrintJobCard 
            key={job.id} 
            job={job}
            onAssign={() => assignToPrinter(job)}
            onPrioritize={() => prioritizeJob(job)}
          />
        ))}
      </div>
      
      <div className="queue-actions">
        <Button onClick={autoOptimize}>Optimizar Automáticamente</Button>
        <Button onClick={manualSchedule}>Agenda Manual</Button>
      </div>
    </div>
  );
}
```

---

## 🚀 IMPLEMENTACIÓN PASO A PASO

### Fase 1: Setup Base (Días 1-3)

```bash
# 1. Crear estructura de archivos
mkdir -p src/app/shop/{products,cart,checkout,admin}
mkdir -p src/lib/{store,payments,orders}
mkdir -p src/components/shop

# 2. Instalar dependencias
npm install @stripe/stripe-js @stripe/react-stripe-js
npm install @supabase/supabase-js  # Database
npm install mercadopago
npm install ethers  # Web3
npm install zustand  # State management

# 3. Setup variables de entorno
cp .env.example .env.local
```

```
# .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
MP_ACCESS_TOKEN=...
NEO_PROXY_WALLET=0x...
```

### Fase 2: Core Functionality (Días 4-7)

1. **Database Schema** (Supabase)
2. **Product Catalog** API + UI
3. **Shopping Cart** (zustand + persist)
4. **Checkout Flow** (multi-step form)
5. **Payment Integration** (Stripe primary)

### Fase 3: Integration (Días 8-10)

1. **Print Queue** integration
2. **Order Management** system
3. **Email Notifications** (SendGrid)
4. **Admin Dashboard** (DarkProxy only)
5. **Analytics** (sales, inventory)

### Fase 4: Launch (Días 11-14)

1. **Testing** completo
2. **Product Photography**
3. **SEO Optimization**
4. **Soft Launch** (amigos)
5. **Public Launch**

---

## 💰 COSTOS Y BENEFICIOS

### Costo de Implementación

| Item | Costo | Notas |
|------|-------|-------|
| **Desarrollo** (tu tiempo) | $0 | Tú lo construyes |
| **Hosting (Vercel Pro)** | $20/mes | Para producción |
| **Database (Supabase)** | $25/mes | 8GB storage |
| **Stripe Fees** | 2.9% + $0.30 | Por transacción |
| **SendGrid** | $14.95/mes | 40k emails |
| **Dominio** | $12/año | shop.neoproxy.art |
| **SSL Certificate** | $0 | Incluido en Vercel |
| **Total Mensual** | **~$60** | Sin contar fees de transacción |

### VS Shopify

| Aspecto | NeoProxy Store | Shopify |
|---------|---------------|---------|
| **Costo mensual** | $60 | $29 + 2% transacciones |
| **Control** | 100% | Limitado |
| **Customización** | Infinita | Templates |
| **Integración impresoras** | Nativa | Apps de terceros |
| **Fees transacción** | 2.9% Stripe | 2.9% + 2% Shopify |
| **Escalabilidad** | Ilimitada | Planes limitados |
| **Brand** | Tuya | "Powered by Shopify" |
| **Datos** | Tuyos | De Shopify |

**Ganancia con NeoProxy Store:** ~$200-500/mes ahorrados en fees a los 6 meses

---

## 🎯 PROXIMOS PASOS

**¿Empezamos a construir tu tienda ahora?**

1. **Setup inicial** (30 min): Database + estructura
2. **Product catalog** (2 horas): 3 productos iniciales
3. **Checkout flow** (4 horas): Carrito + pagos
4. **Admin panel** (3 horas): Gestión de pedidos

**Total: ~10 horas para tienda funcional**

**Primera venta posible: Día 3-4**

¿Comenzamos con el setup de Supabase y la estructura de archivos? 🚀
