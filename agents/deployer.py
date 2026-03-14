import subprocess, os
class NeoProxyDeployer:
    def sync(self):
        print("🚀 Deployer: Sincronizando con GitHub...")
        subprocess.run(["git", "add", "."], cwd="..")
        subprocess.run(["git", "commit", "-m", "NeoProxy Mobile Sync"], cwd="..")
if __name__ == "__main__":
    NeoProxyDeployer().sync()
