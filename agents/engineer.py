import json, os
class NeoProxyEngineer:
    def generate_listing(self, model_name, style):
        listing = {"title": f"Mascara {model_name}", "tags": ["3D", "Giger"], "description": f"Estilo {style}."}
        with open(f"../catalog/{model_name.lower()}.json", "w") as f:
            json.dump(listing, f, indent=4)
        print(f"✅ Ingeniero: {model_name} catalogado.")
if __name__ == "__main__":
    NeoProxyEngineer().generate_listing("Cyber_Oni", "Ghost in the Shell")
