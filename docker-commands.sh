#!/bin/bash

# Function to display help
show_help() {
  echo "Portfolio Site Docker Commands"
  echo "------------------------------"
  echo "Usage: ./docker-commands.sh [command]"
  echo ""
  echo "Commands:"
  echo "  start       - Start all containers"
  echo "  stop        - Stop all containers"
  echo "  restart     - Restart all containers"
  echo "  build       - Rebuild all containers"
  echo "  logs        - Show logs from all containers"
  echo "  seed        - Run the database seed script"
  echo "  clean       - Remove all containers, volumes, and images"
  echo "  help        - Show this help message"
}

# Check if command is provided
if [ $# -eq 0 ]; then
  show_help
  exit 1
fi

# Process commands
case "$1" in
  start)
    echo "Starting containers..."
    docker-compose up -d
    ;;
  stop)
    echo "Stopping containers..."
    docker-compose down
    ;;
  restart)
    echo "Restarting containers..."
    docker-compose down
    docker-compose up -d
    ;;
  build)
    echo "Rebuilding containers..."
    docker-compose up -d --build
    ;;
  logs)
    echo "Showing logs..."
    docker-compose logs -f
    ;;
  seed)
    echo "Running seed script..."
    docker-compose exec backend npm run seed
    ;;
  clean)
    echo "Cleaning up Docker resources..."
    docker-compose down -v
    docker rmi $(docker images -q portfolio-site_frontend portfolio-site_backend)
    ;;
  help)
    show_help
    ;;
  *)
    echo "Unknown command: $1"
    show_help
    exit 1
    ;;
esac 