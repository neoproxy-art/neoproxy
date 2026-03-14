#!/usr/bin/env python3
"""
NeoProxy Instagram Automation
Automatización completa para publicación de contenido 3D/IA
"""

import os
import json
import time
import random
from datetime import datetime, timedelta
from instagrapi import Client
from PIL import Image, ImageDraw, ImageFont
import requests
from typing import List, Dict, Any

class NeoProxyInstagramBot:
    def __init__(self):
        self.username = os.getenv('INSTAGRAM_USER')
        self.password = os.getenv('INSTAGRAM_PASS')
        self.client = None
        
        # Configuración NeoProxy
        self.config = {
            'hashtags': {
                'primary': ['#3Dprinting', '#cyberpunk', '#AIart', '#NeoProxy'],
                'secondary': ['#functionalprint', '#design', '#tech', '#future'],
                'niche': ['#chile3d', '#impresion3d', '#arte3d'],
                'trending': []  # Se actualiza diariamente
            },
            'posting_times': ['08:00', '13:00', '20:00'],  # Hora Chile
            'caption_templates': {
                'new_design': [
                    "🔥 Nuevo diseño: {title}\n\n{description}\n\n¿Te gustaría imprimirlo? STL disponible 👆\n\n{hashtags}",
                    "✨ Creando {title}\n\nDesde concepto IA hasta objeto físico en 24h\n\n¿Qué opinas? 👇\n\n{hashtags}",
                    "🎨 {title} - Edición limitada\n\n{description}\n\nSolo {stock} unidades disponibles 🏃‍♂️\n\n{hashtags}"
                ],
                'process': [
                    "⏱️ Time-lapse: {title}\n\n{hours} horas de impresión en 60 segundos\n\n¿Te gustaría ver el proceso completo?\n\n{hashtags}",
                    "🔧 Behind the scenes: {title}\n\nDesde el archivo STL hasta la pieza terminada\n\n{hashtags}"
                ],
                'viral_hook': [
                    "POV: Le pides a la IA que diseñe un {object} cyberpunk 🐍\n\nEl resultado: 👆\n\n{hashtags}",
                    "Este diseño IA tardó 2 minutos en crear\nLa impresión: 6 horas\nTu reacción cuando lo veas: priceless 😱\n\n{hashtags}"
                ]
            }
        }
        
    def login(self):
        """Iniciar sesión en Instagram"""
        try:
            self.client = Client()
            self.client.login(self.username, self.password)
            print("✅ Login exitoso a Instagram")
            return True
        except Exception as e:
            print(f"❌ Error en login: {e}")
            return False
    
    def generate_caption(self, product_data: Dict, template_type: str = 'new_design') -> str:
        """Generar caption automático basado en template"""
        template = random.choice(self.config['caption_templates'][template_type])
        
        # Seleccionar hashtags relevantes
        hashtags = ' '.join(
            self.config['hashtags']['primary'] + 
            self.config['hashtags']['secondary'][:5] +
            self.config['hashtags']['niche'][:3]
        )
        
        # Reemplazar placeholders
        caption = template.format(
            title=product_data.get('title', 'Nuevo Diseño'),
            description=product_data.get('description', ''),
            stock=product_data.get('stock', 'limitado'),
            hours=product_data.get('print_time', '6'),
            object=product_data.get('category', 'objeto'),
            hashtags=hashtags
        )
        
        return caption
    
    def create_carousel_images(self, product_data: Dict) -> List[str]:
        """Crear imágenes para carousel (concept + render + foto)"""
        images = []
        
        # Imagen 1: Concepto IA
        if 'concept_image' in product_data:
            concept_img = self.add_text_overlay(
                product_data['concept_image'],
                "CONCEPTO IA",
                position='top'
            )
            images.append(concept_img)
        
        # Imagen 2: Render 3D
        if 'render_image' in product_data:
            render_img = self.add_text_overlay(
                product_data['render_image'],
                "DISEÑO 3D",
                position='middle'
            )
            images.append(render_img)
        
        # Imagen 3: Foto impresa
        if 'printed_photo' in product_data:
            printed_img = self.add_text_overlay(
                product_data['printed_photo'],
                "RESULTADO FINAL",
                position='bottom'
            )
            images.append(printed_img)
        
        return images
    
    def add_text_overlay(self, image_path: str, text: str, position: str = 'top') -> str:
        """Agregar texto overlay a imagen"""
        img = Image.open(image_path)
        
        # Crear overlay
        draw = ImageDraw.Draw(img)
        
        # Intentar cargar fuente (fallback a default)
        try:
            font = ImageFont.truetype("arial.ttf", 40)
        except:
            font = ImageFont.load_default()
        
        # Calcular posición
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        img_width, img_height = img.size
        
        if position == 'top':
            x = (img_width - text_width) // 2
            y = 20
        elif position == 'middle':
            x = (img_width - text_width) // 2
            y = (img_height - text_height) // 2
        else:  # bottom
            x = (img_width - text_width) // 2
            y = img_height - text_height - 20
        
        # Agregar rectángulo de fondo
        padding = 10
        draw.rectangle(
            [x - padding, y - padding, x + text_width + padding, y + text_height + padding],
            fill=(0, 0, 0, 180)
        )
        
        # Agregar texto
        draw.text((x, y), text, fill=(255, 255, 0), font=font)
        
        # Guardar imagen temporal
        output_path = f"temp_{int(time.time())}.jpg"
        img.save(output_path)
        
        return output_path
    
    def post_single_image(self, image_path: str, caption: str) -> bool:
        """Publicar imagen simple"""
        try:
            media = self.client.photo_upload(
                path=image_path,
                caption=caption
            )
            print(f"✅ Imagen publicada: {media.pk}")
            return True
        except Exception as e:
            print(f"❌ Error publicando imagen: {e}")
            return False
    
    def post_carousel(self, image_paths: List[str], caption: str) -> bool:
        """Publicar carousel de múltiples imágenes"""
        try:
            media = self.client.album_upload(
                paths=image_paths,
                caption=caption
            )
            print(f"✅ Carousel publicado: {media.pk}")
            return True
        except Exception as e:
            print(f"❌ Error publicando carousel: {e}")
            return False
    
    def post_reel(self, video_path: str, caption: str, cover_image: str = None) -> bool:
        """Publicar Reel"""
        try:
            media = self.client.clip_upload(
                path=video_path,
                caption=caption,
                thumbnail=cover_image
            )
            print(f"✅ Reel publicado: {media.pk}")
            return True
        except Exception as e:
            print(f"❌ Error publicando reel: {e}")
            return False
    
    def schedule_posts(self, products: List[Dict]):
        """Programar posts para el día"""
        for i, product in enumerate(products[:3]):  # Max 3 posts por día
            # Generar contenido
            caption = self.generate_caption(product)
            
            # Decidir tipo de post
            if i == 0 and 'concept_image' in product:
                # Primer post: Carousel completo
                images = self.create_carousel_images(product)
                self.post_carousel(images, caption)
            elif 'video_path' in product:
                # Si hay video: Reel
                self.post_reel(product['video_path'], caption)
            else:
                # Post simple
                image = product.get('image', list(product.values())[1])
                self.post_single_image(image, caption)
            
            # Esperar entre posts (simular horario)
            if i < len(products) - 1:
                wait_time = random.randint(1800, 3600)  # 30-60 min
                print(f"⏰ Esperando {wait_time//60} minutos antes del siguiente post...")
                time.sleep(wait_time)
    
    def engage_with_comments(self, media_pk: str):
        """Responder automáticamente a comentarios"""
        try:
            comments = self.client.media_comments(media_pk)
            
            for comment in comments:
                # Auto-responder a keywords
                text = comment.text.lower()
                
                if any(keyword in text for keyword in ['stl', 'archivo', 'link', 'comprar']):
                    reply = "¡Hola! 👋 Gracias por tu interés. Te dejo los links:\n\n🆓 STL Gratis: neoproxy.art/gallery/free\n💎 STL Premium: neoproxy.art/shop\n🏭 Figuras Impresas: neoproxy.art/shop/printed\n\n¿Alguna duda? Estoy aquí para ayudarte!"
                    
                    self.client.comment(media_pk, reply)
                    print(f"💬 Auto-reply enviado a: {comment.user.username}")
                    
        except Exception as e:
            print(f"❌ Error en engagement: {e}")
    
    def post_story(self, image_path: str, text: str = None):
        """Publicar Story"""
        try:
            if text:
                # Agregar texto a imagen
                img = Image.open(image_path)
                draw = ImageDraw.Draw(img)
                
                try:
                    font = ImageFont.truetype("arial.ttf", 30)
                except:
                    font = ImageFont.load_default()
                
                # Fondo semi-transparente para texto
                img_width, img_height = img.size
                draw.rectangle([0, img_height-100, img_width, img_height], fill=(0, 0, 0, 200))
                draw.text((20, img_height-80), text, fill=(255, 255, 255), font=font)
                
                story_path = f"story_{int(time.time())}.jpg"
                img.save(story_path)
                image_path = story_path
            
            media = self.client.photo_upload(
                path=image_path,
                usertags=[],
                configure_to_story=True
            )
            print(f"✅ Story publicado: {media.pk}")
            return True
            
        except Exception as e:
            print(f"❌ Error publicando story: {e}")
            return False
    
    def run_daily_routine(self):
        """Rutina diaria completa"""
        print("🚀 Iniciando rutina diaria de Instagram...")
        
        # Cargar productos del día
        products = self.load_daily_products()
        
        if not products:
            print("⚠️ No hay productos para publicar hoy")
            return
        
        # Login
        if not self.login():
            return
        
        # Publicar contenido programado
        self.schedule_posts(products)
        
        # Publicar stories del día
        for product in products[:2]:
            story_text = f"¿Qué les parece este {product.get('category', 'diseño')}?"
            self.post_story(
                product.get('image', ''),
                story_text
            )
            time.sleep(900)  # 15 min entre stories
        
        print("✅ Rutina diaria completada")
    
    def load_daily_products(self) -> List[Dict]:
        """Cargar productos para publicar hoy"""
        # Esto podría conectar a tu API o base de datos
        # Por ahora, datos de ejemplo
        
        return [
            {
                'title': 'Serpent Guardian Pro',
                'description': 'Escultura biomecánica con detalles cyberpunk',
                'category': 'criatura mecánica',
                'concept_image': '/media/concepts/serpent_concept.jpg',
                'render_image': '/media/renders/serpent_render.jpg',
                'printed_photo': '/media/photos/serpent_printed.jpg',
                'stock': '5',
                'print_time': '6',
                'video_path': '/media/videos/serpent_timelapse.mp4'
            },
            {
                'title': 'Neo Stand Minimal',
                'description': 'Soporte celular funcional con estética neo',
                'category': 'objeto funcional',
                'image': '/media/photos/stand_final.jpg',
                'stock': '10',
                'print_time': '2.5'
            }
        ]

# Configuración y ejecución
if __name__ == "__main__":
    bot = NeoProxyInstagramBot()
    
    # Ejecutar rutina diaria
    bot.run_daily_routine()
    
    # Programar para ejecución automática (crontab)
    print("\n📅 Para automatización completa, agrega a tu crontab:")
    print("0 8 * * * /usr/bin/python3 /ruta/al/instagram_bot.py")
    print("0 13 * * * /usr/bin/python3 /ruta/al/instagram_bot.py")
    print("0 20 * * * /usr/bin/python3 /ruta/al/instagram_bot.py")
