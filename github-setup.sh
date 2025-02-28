#!/bin/bash

# Function to display help
show_help() {
  echo "Portfolio Site GitHub Setup"
  echo "--------------------------"
  echo "This script helps you set up and push your portfolio site to GitHub."
  echo ""
  echo "Usage: ./github-setup.sh [repository-url]"
  echo ""
  echo "Example: ./github-setup.sh https://github.com/yourusername/portfolio-site.git"
}

# Check if repository URL is provided
if [ $# -eq 0 ]; then
  show_help
  echo ""
  echo "Please provide your GitHub repository URL."
  read -p "Repository URL: " REPO_URL
else
  REPO_URL=$1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
  echo "Git is not installed. Please install Git first."
  exit 1
fi

# Check if .git directory already exists
if [ -d ".git" ]; then
  echo "Git repository already initialized."
else
  echo "Initializing Git repository..."
  git init
fi

# Check for sensitive files
echo "Checking for sensitive files..."
if [ -f "backend/.env" ]; then
  echo "Warning: backend/.env file detected. This file contains sensitive information."
  echo "Make sure it's included in .gitignore before committing."
fi

if [ -f ".env" ]; then
  echo "Warning: .env file detected in the root directory. This file contains sensitive information."
  echo "Make sure it's included in .gitignore before committing."
fi

# Add files to Git
echo "Adding files to Git..."
git add .

# Show status
echo "Current Git status:"
git status

# Confirm commit
read -p "Do you want to commit these changes? (y/n): " CONFIRM
if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
  read -p "Enter commit message (default: 'Initial commit'): " COMMIT_MSG
  COMMIT_MSG=${COMMIT_MSG:-"Initial commit"}
  
  echo "Committing changes..."
  git commit -m "$COMMIT_MSG"
  
  # Add remote repository
  echo "Adding remote repository..."
  git remote add origin $REPO_URL
  
  # Push to GitHub
  echo "Pushing to GitHub..."
  git push -u origin main || git push -u origin master
  
  echo "Done! Your portfolio site has been pushed to GitHub."
else
  echo "Commit cancelled. You can commit manually when ready."
fi 