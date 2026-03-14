import subprocess, os
class NeoProxyDeployer:
    def sync(self):
        print("🚀 Deployer: Empujando cambios a GitHub...")
        # Intentamos subir a la rama master del repositorio neoproxy
        subprocess.run(["git", "add", "."], cwd="..")
        subprocess.run(["git", "commit", "-m", "NeoProxy Mobile Sync"], cwd="..")
        result = subprocess.run(["git", "push", "origin", "master"], cwd="..")
        
        if result.returncode == 0:
            print("✅ ¡Nodo sincronizado con la nube con éxito!")
        else:
            print("⚠️ El commit fue local, pero el push falló. Verifica tu conexión o llave SSH.")

if __name__ == "__main__":
    NeoProxyDeployer().sync()
