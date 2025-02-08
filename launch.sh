#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version $(node -v) detected"

# Parse command line arguments for port
PORT=5000  # Default port
while getopts "p:" opt; do
  case $opt in
    p) PORT="$OPTARG"
      ;;
    \?) echo "Invalid option -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Validate port number
if ! [[ "$PORT" =~ ^[0-9]+$ ]] || [ "$PORT" -lt 1 ] || [ "$PORT" -gt 65535 ]; then
    echo "❌ Invalid port number. Please use a number between 1 and 65535."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server with the specified port
echo "🚀 Starting development server on port $PORT..."
PORT=$PORT npm run dev

# The script will keep running until the user stops it with Ctrl+C