#!/bin/bash

# Docker helper scripts for dashboard.platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Help function
show_help() {
    echo "Dashboard Platform Docker Helper"
    echo ""
    echo "Usage: ./docker-scripts.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev-build    Build development Docker image"
    echo "  dev-run      Run development container with hot reload"
    echo "  dev-stop     Stop development container"
    echo "  prod-build   Build production Docker image"
    echo "  prod-run     Run production container"
    echo "  prod-stop    Stop production container"
    echo "  clean        Remove all containers and images"
    echo "  logs         Show container logs"
    echo "  help         Show this help message"
}

# Development commands
dev_build() {
    print_status "Building development Docker image..."
    docker-compose build dev
}

dev_run() {
    print_status "Starting development container..."
    docker-compose up dev
}

dev_stop() {
    print_status "Stopping development container..."
    docker-compose down
}

# Production commands
prod_build() {
    print_status "Building production Docker image..."
    docker-compose build prod
}

prod_run() {
    print_status "Starting production container..."
    docker-compose up -d prod
    print_status "Application is running at http://localhost:3000"
}

prod_stop() {
    print_status "Stopping production container..."
    docker-compose stop prod
}

# Utility commands
clean() {
    print_warning "This will remove all containers and images for this project."
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cleaning up Docker containers and images..."
        docker-compose down --rmi all --volumes --remove-orphans
        print_status "Cleanup completed."
    else
        print_status "Cleanup cancelled."
    fi
}

show_logs() {
    print_status "Showing container logs..."
    docker-compose logs -f
}

# Main script logic
case "${1:-help}" in
    "dev-build")
        dev_build
        ;;
    "dev-run")
        dev_run
        ;;
    "dev-stop")
        dev_stop
        ;;
    "prod-build")
        prod_build
        ;;
    "prod-run")
        prod_run
        ;;
    "prod-stop")
        prod_stop
        ;;
    "clean")
        clean
        ;;
    "logs")
        show_logs
        ;;
    "help"|*)
        show_help
        ;;
esac 