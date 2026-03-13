#!/bin/bash
# NeoProxy Complete System Launcher

echo "🌀 NEO PROXY - THE LIVING NETWORK"
echo "=================================="
echo ""
echo "Initializing complete NeoProxy ecosystem..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[SYSTEM]${NC} $1"
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
if [ ! -f "package.json" ] || [ ! -f "master.py" ]; then
    print_error "Please run this script from the neoproxy-repo directory"
    exit 1
fi

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# 1. Install 3D Network Dependencies
print_status "Installing 3D Network dependencies..."
if [ -f "install_3d_network.sh" ]; then
    ./install_3d_network.sh
    if [ $? -eq 0 ]; then
        print_success "3D Network dependencies installed"
    else
        print_warning "3D Network installation had issues"
    fi
else
    print_warning "3D Network installer not found, skipping..."
fi

echo ""

# 2. Start Data Kernel
print_status "Starting NeoProxy Data Kernel..."
python3 master.py start &
KERNEL_PID=$!

sleep 2

if ps -p $KERNEL_PID > /dev/null; then
    print_success "Data Kernel started (PID: $KERNEL_PID)"
else
    print_error "Failed to start Data Kernel"
fi

echo ""

# 3. Start Next.js Development Server
print_status "Starting Next.js development server..."

# Check if port 3000 is available
if check_port 3000; then
    print_warning "Port 3000 is in use, trying 3001..."
    PORT=3001
else
    PORT=3000
fi

npm run dev -- --port $PORT &
NEXTJS_PID=$!

# Wait for server to start
sleep 5

if check_port $PORT; then
    print_success "Next.js server started on port $PORT (PID: $NEXTJS_PID)"
else
    print_error "Failed to start Next.js server"
fi

echo ""
echo "🎉 NEO PROXY SYSTEM ONLINE"
echo "=========================="
echo ""
print_success "🌐 Web Interface: http://localhost:$PORT"
echo ""
echo "📍 Available Routes:"
echo "   /              - Landing page"
echo "   /network       - 3D Living Network"
echo "   /dashboard     - Data Kernel Dashboard"
echo "   /agents        - AI Agent Profiles"
echo ""
echo "🔧 System Controls:"
echo "   Data Kernel:   python3 master.py status"
echo "   Stop All:      python3 master.py stop"
echo "   Restart:       python3 master.py restart"
echo ""
echo "📊 Monitoring:"
echo "   Kernel Logs:  python3 master.py status"
echo "   Web Logs:     Check terminal output"
echo ""
print_status "The Living Network is active. Explore responsibly. 🗺️✨"
echo ""

# Keep script running to show status
trap 'echo ""; print_status "Shutting down NeoProxy..."; kill $KERNEL_PID 2>/dev/null; kill $NEXTJS_PID 2>/dev/null; exit 0' INT TERM

# Monitor processes
while true; do
    if ! ps -p $KERNEL_PID > /dev/null 2>&1; then
        print_error "Data Kernel process died!"
        break
    fi

    if ! ps -p $NEXTJS_PID > /dev/null 2>&1; then
        print_error "Next.js server process died!"
        break
    fi

    sleep 10
done

# Cleanup on exit
kill $KERNEL_PID 2>/dev/null
kill $NEXTJS_PID 2>/dev/null
print_status "NeoProxy system shutdown complete."</content>
<parameter name="filePath">/home/darkproxy/neoproxy-repo/launch_neoproxy.sh