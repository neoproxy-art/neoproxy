# NeoProxy Instagram Automation Setup

## 🛠️ Instalación

```bash
# Instalar dependencias
pip install instagrapi pillow requests python-dotenv

# Crear variables de entorno
echo "INSTAGRAM_USER=tu_usuario" > .env
echo "INSTAGRAM_PASS=tu_contraseña" >> .env
```

## 🤖 Uso

### Opción 1: Ejecución Manual
```bash
python scripts/instagram_bot.py
```

### Opción 2: Automatización Total (Recomendado)
```bash
# Editar crontab
crontab -e

# Agregar líneas:
0 8 * * * cd /ruta/neoproxy-repo && /usr/bin/python3 scripts/instagram_bot.py
0 13 * * * cd /ruta/neoproxy-repo && /usr/bin/python3 scripts/instagram_bot.py
0 20 * * * cd /ruta/neoproxy-repo && /usr/bin/python3 scripts/instagram_bot.py
```

## 📁 Estructura de Media

Crea carpetas para contenido:
```
media/
├── concepts/     # Imágenes IA originales
├── renders/       # Renders 3D
├── photos/        # Fotos de piezas impresas
└── videos/        # Time-lapses de impresión
```

## ⚠️ Importante

1. **Seguridad**: Usa app de Instagram dedicada, no tu personal
2. **Límites**: No más de 3 posts por día para evitar shadowban
3. **Calidad**: Siempre usa imágenes de alta calidad (1080x1080 mínimo)
4. **Engagement**: Responde a todos los comentarios en < 2 horas

## 🔄 Integración con Workflow NeoProxy

El bot se integra con:
- `load_daily_products()` → Conectar a tu API de productos
- `generate_caption()` → Usa templates del workflow
- `schedule_posts()` → Publica en horarios óptimos
- `engage_with_comments()` → Auto-responde con links a tu tienda

## 📊 Métricas Automáticas

El bot puede trackear:
- Posts publicados por día
- Engagement rate
- Mejores horarios
- Hashtags más efectivos

## 🚀 Próximo Nivel

Para automatización avanzada:
1. Conectar a IA para generar captions personalizadas
2. Integrar con TikTok API
3. Auto-generar time-lapses desde archivos STL
4. Análisis de competencia automático
