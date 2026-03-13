#!/bin/bash
# NeoProxy 3D Network Installation Script

echo "🌀 Installing NeoProxy 3D Network Dependencies..."
echo "==============================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the neoproxy-repo directory."
    exit 1
fi

# Check Node.js and npm
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Install core dependencies
print_status "Installing core 3D dependencies..."
npm install three @react-three/fiber @react-three/drei @types/three

if [ $? -eq 0 ]; then
    print_success "Core 3D dependencies installed"
else
    print_error "Failed to install core 3D dependencies"
    exit 1
fi

# Install animation libraries
print_status "Installing animation libraries..."
npm install gsap framer-motion

if [ $? -eq 0 ]; then
    print_success "Animation libraries installed"
else
    print_error "Failed to install animation libraries"
    exit 1
fi

# Install development dependencies
print_status "Installing development dependencies..."
npm install --save-dev raw-loader @types/node

if [ $? -eq 0 ]; then
    print_success "Development dependencies installed"
else
    print_warning "Some development dependencies failed to install"
fi

# Install additional utilities
print_status "Installing additional utilities..."
npm install zustand clsx tailwind-merge

if [ $? -eq 0 ]; then
    print_success "Additional utilities installed"
else
    print_warning "Some utilities failed to install"
fi

# Install fonts (if available via npm)
print_status "Installing font packages..."
npm install @fontsource/space-grotesk @fontsource/jetbrains-mono

if [ $? -eq 0 ]; then
    print_success "Font packages installed"
else
    print_warning "Font packages not available via npm (will use web fonts)"
fi

# Create necessary directories
print_status "Creating component directories..."
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/utils

# Update package.json scripts if needed
print_status "Checking package.json configuration..."

if ! grep -q '"dev":' package.json; then
    print_warning "Adding dev script to package.json"
    # This would require more complex JSON editing, so we'll just warn
fi

print_success "NeoProxy 3D Network dependencies installed successfully!"
echo ""
echo "🚀 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Visit http://localhost:3000/network to see the 3D network"
echo "3. Visit http://localhost:3000/dashboard for the data kernel dashboard"
echo ""
echo "📚 Available components:"
echo "- NeoProxyNetwork: Main 3D network component"
echo "- Network nodes with magnetic interactions"
echo "- Data pulse animations"
echo "- Camera controller with cinematic transitions"
echo ""
print_status "Ready to explore The Living Network! 🗺️✨"</content>
<parameter name="filePath">/home/darkproxy/neoproxy-repo/install_3d_network.sh