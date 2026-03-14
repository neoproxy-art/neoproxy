import json
import os

class NeoProxyEngineer:
    def update_fabrication_gallery(self):
        gallery_file = "../public/data/fabrication.json" # Ruta estándar en tu repo
        os.makedirs(os.path.dirname(gallery_file), exist_ok=True)
        
        # Simulamos el escaneo de la carpeta de imágenes
        images = [f for f in os.listdir("../public/gallery") if f.endswith(('.jpg', '.png'))]
        
        new_gallery = []
        for img in images:
            name = img.split('.')[0].replace("_", " ").title()
            new_gallery.append({
                "id": img.split('.')[0],
                "title": name,
                "src": f"gallery/{img}",
                "description": "Pieza biomecánica NeoProxy - Resina Alta Definición",
                "category": "3D Printing"
            })
            
        with open(gallery_file, "w") as f:
            json.dump(new_gallery, f, indent=4)
        print(f"📊 Galería actualizada: {len(new_gallery)} piezas listas.")

if __name__ == "__main__":
    NeoProxyEngineer().update_fabrication_gallery()
