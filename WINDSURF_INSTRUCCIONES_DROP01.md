# INSTRUCCIONES PARA WINDSURF — DROP 01 SHOP PAGE

## Qué hay que hacer

Integrar la página DROP 01 en el sitio Next.js de NeoProxy.
Es una página nueva: `/shop/drop01` que muestra los 15 anillos del DROP 01.

---

## PASO 1 — Instalar fuentes (si no están)

En `app/layout.tsx`, agregar DM Mono y Bebas Neue de Google Fonts:

```tsx
import { DM_Mono } from 'next/font/google'

// O simplemente en globals.css:
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Bebas+Neue&display=swap');
```

---

## PASO 2 — Crear la ruta

Crear el archivo en:
```
app/shop/drop01/page.tsx
```

Pegar el contenido completo del archivo `drop01-page.tsx` que te paso.

---

## PASO 3 — Actualizar los seeds del manifest

En el archivo `drop01-page.tsx`, hay un array `DROP_01_SEEDS` con seeds de ejemplo.

Hay que reemplazarlos con los seeds reales del archivo `NP_DROP01_CORE_manifest.json`
que genera el autocurador (`np-autocurator.html`).

El array tiene esta estructura:
```ts
{ seed: 48291, archetype: 'BRUTAL', score: 88, price: 28, physical: true, edition: 3 }
```

- `seed` — el número del manifest
- `archetype` — el campo `archetype` del manifest  
- `score` — el campo `aesthetic_score` del manifest
- `price` — definir manualmente (sugerencia: HYBRID $32, BRUTAL $28, resto $18-22, MINIMAL $15)
- `physical` — true si vas a imprimir ese objeto físicamente
- `edition` — cuántas unidades físicas disponibles (null si solo STL)

---

## PASO 4 — Conectar la ruta de "VER" con np-ring

En el componente hay un link `href={'/np-ring?seed=${item.seed}'}`.

Si el generador `np-ring.html` está en `/public`, funciona directo.
Si está integrado como ruta Next.js, cambiar a la ruta correcta.

---

## PASO 5 — Agregar link en el nav principal

En el nav de la shop actual (`/shop`), agregar un link a DROP 01:

```tsx
<Link href="/shop/drop01">
  DROP 01 →
</Link>
```

O en la página `/shop`, agregar una sección hero encima de los productos actuales:

```tsx
<div style={{ padding: '32px', borderBottom: '1px solid #0d0d1a', marginBottom: '32px' }}>
  <div style={{ fontSize: 8, letterSpacing: '.2em', color: '#333355', marginBottom: 8 }}>
    NUEVA COLECCIÓN
  </div>
  <Link href="/shop/drop01" style={{ 
    fontFamily: 'Bebas Neue', fontSize: 32, color: '#b400ff', 
    textDecoration: 'none', letterSpacing: '.08em' 
  }}>
    DROP 01 — CORE →
  </Link>
  <p style={{ fontSize: 9, color: '#2a2a44', marginTop: 8 }}>
    15 instancias certificadas · Generadas por el motor paramétrico NeoProxy
  </p>
</div>
```

---

## PASO 6 — Pago (provisional)

Por ahora el botón "COMPRAR / RESERVAR" abre un mailto a `darkproxy@neoproxy.art` 
con el ID del objeto, tipo y precio pre-completados.

Cuando quieras conectar Stripe o MercadoPago, reemplazar la función `handleBuy()` 
al final del archivo.

---

## PASO 7 — Deploy

```bash
git add app/shop/drop01/page.tsx
git commit -m "feat: DROP 01 shop page — 15 certified ring instances"
git push
```

---

## Estructura final de rutas

```
/shop              → shop general (existente, agregar banner DROP 01)
/shop/drop01       → página DROP 01 CORE (nueva)
/np-ring?seed=X    → página individual de cada anillo (existente en /public)
/lab               → generador (existente)
```

---

## Notas

- El componente `RingPreview` genera la previsualización 2D del anillo directamente 
  desde el seed, sin necesidad de imágenes. Funciona igual que el generador.
- No hay dependencias adicionales — solo React + Canvas API.
- Los seeds en `DROP_01_SEEDS` determinan completamente la geometría. 
  Son reproducibles: el mismo seed siempre genera el mismo anillo.
