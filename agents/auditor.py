import os
class NeoProxyAuditor:
    def audit(self):
        files = os.listdir("../catalog")
        print(f"🔍 Auditoría: {len(files)} archivos encontrados.")
if __name__ == "__main__":
    NeoProxyAuditor().audit()
