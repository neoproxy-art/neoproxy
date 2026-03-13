# 📱 Mobile Testing Guide - NeoProxy OS

## 🔧 **Métodos para asegurar visualización correcta**

### **1️⃣ Viewport Meta Tag** ✅ IMPLEMENTADO
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### **2️⃣ CSS Reset Mobile-First** ✅ IMPLEMENTADO
- Box-sizing: border-box
- Margin/padding reset
- Safe areas para notch phones
- Font smoothing

### **3️⃣ Debug Console** ✅ IMPLEMENTADO
- Activa con `?debug` en URL
- Muestra: width, height, DPR, orientation, touch support
- Ejemplo: `https://neoproxy.art/?debug`

---

## 📋 **Testing Checklist**

### **🔍 Debug Information (con ?debug):**
```
📱 375x812px
📐 3x DPR
🔄 portrait-primary
👆 Touch: Yes
iPhone Safari
```

### **📱 Dispositivos a Probar:**

#### **iPhones:**
- **iPhone SE:** 320x568 (1x DPR)
- **iPhone 12:** 390x844 (3x DPR)
- **iPhone 12 Pro Max:** 428x926 (3x DPR)
- **iPhone 15 Pro:** 393x852 (3x DPR)

#### **Android:**
- **Samsung S21:** 384x854 (3x DPR)
- **Pixel 7:** 412x915 (2.625x DPR)
- **OnePlus 9:** 393x851 (2.75x DPR)

#### **Tablets:**
- **iPad Mini:** 768x1024 (2x DPR)
- **iPad Pro:** 1024x1366 (2x DPR)

---

## 🛠️ **Herramientas de Testing**

### **1. Chrome DevTools:**
- F12 → Toggle device toolbar
- Probar diferentes dispositivos
- Network throttling

### **2. Safari Web Inspector (iOS):**
- Conectar iPhone a Mac
- Settings → Advanced → Web Inspector
- Inspect element en Safari iOS

### **3. Android Debug:**
- `chrome://inspect` en Chrome desktop
- USB debugging activado
- Remote debugging

---

## 🎯 **Problemas Comunes y Soluciones**

### **❌ Problema:** Texto demasiado pequeño
**✅ Solución:** `clamp()` typography
```css
font-size: clamp(1rem, 2.5vw, 1.25rem);
```

### **❌ Problema:** Horizontal overflow
**✅ Solución:** `overflow-x: hidden` + `max-width: 100vw`
```css
body {
  overflow-x: hidden;
  max-width: 100vw;
}
```

### **❌ Problema:** Canvas no responsive
**✅ Solución:** `engine.resize()` on window resize
```js
window.addEventListener('resize', () => engine.resize())
```

### **❌ Problema:** Touch targets too small
**✅ Solución:** Minimum 44px targets
```css
button {
  min-height: 44px;
  min-width: 44px;
}
```

### **❌ Problema:** Notch phones content cut
**✅ Solución:** Safe area insets
```css
padding: env(safe-area-inset-top);
```

---

## 🚀 **Testing Steps**

### **Step 1: Debug Info**
1. Abrir `https://neoproxy.art/?debug`
2. Verificar viewport dimensions
3. Check DPR y orientation

### **Step 2: Visual Testing**
1. Test en portrait y landscape
2. Verificar no horizontal scroll
3. Check touch targets

### **Step 3: Functional Testing**
1. Navegación funciona
2. Links clickeables
3. Canvas responsive
4. Forms usables

### **Step 4: Performance**
1. Loading time < 3s
2. Smooth scrolling
3. No layout shifts

---

## 📊 **Expected Results**

### **✅ Bueno:**
- No horizontal scroll
- Text readable sin zoom
- Touch targets 44px+
- Canvas full-width
- Safe areas respetadas

### **❌ Malo:**
- Horizontal scroll
- Text too small
- Touch targets < 44px
- Canvas cortado
- Content detrás de notch

---

## 🔧 **Quick Fixes**

### **Si ves horizontal scroll:**
```css
* {
  overflow-x: hidden;
}
```

### **Si el texto es muy pequeño:**
```css
html {
  font-size: 16px; /* Base size */
}
```

### **Si los botones no se pueden tocar:**
```css
button {
  min-height: 44px;
  padding: 12px;
}
```

---

## 📱 **Testing URLs**

### **Con Debug:**
```
https://neoproxy.art/?debug
https://neoproxy.art/concept?debug
https://neoproxy.art/npos/lab?debug
```

### **Sin Debug:**
```
https://neoproxy.art
https://neoproxy.art/concept
https://neoproxy.art/npos/lab
```

---

*Última actualización: 2026-03-13*
*Status: Ready for mobile testing*
