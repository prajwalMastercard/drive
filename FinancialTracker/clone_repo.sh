#!/bin/bash

# Script to clone and analyze the FinancialMomentumTracker 2 repository

echo "=== Starting Financial Momentum Tracker 2 Repository Setup ==="

# Define repository URL
REPO_URL="https://github.com/prajwalMastercard/drive"
REPO_DIR="financial-momentum-tracker"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed. Please install git and try again."
    exit 1
fi

echo "Cloning repository from $REPO_URL..."

# Clone the repository
if [ -d "$REPO_DIR" ]; then
    echo "Directory $REPO_DIR already exists. Removing and re-cloning..."
    rm -rf "$REPO_DIR"
fi

git clone "$REPO_URL" "$REPO_DIR"

# Check if the clone was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to clone the repository. Please check the URL and your internet connection."
    exit 1
fi

echo "Repository cloned successfully to $REPO_DIR"

# Change to the repository directory
cd "$REPO_DIR" || exit 1

echo "=== Repository Structure ==="
ls -la

# Check for README or setup instructions
if [ -f "README.md" ]; then
    echo "=== README Contents ==="
    cat README.md
elif [ -f "readme.md" ]; then
    echo "=== README Contents ==="
    cat readme.md
else
    echo "No README file found."
fi

# Check for package.json (Node.js) or requirements.txt (Python)
if [ -f "package.json" ]; then
    echo "=== Node.js Project Detected ==="
    echo "Installing dependencies..."
    npm install
elif [ -f "requirements.txt" ]; then
    echo "=== Python Project Detected ==="
    echo "It's recommended to create a virtual environment before installing dependencies."
    echo "Run the following commands to set up:"
    echo "python -m venv venv"
    echo "source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
    echo "pip install -r requirements.txt"
else
    echo "No standard dependency files found (package.json or requirements.txt)."
fi

echo "=== Running Python code analyzer ==="
python ../analyze_codebase.py "$(pwd)"

echo "=== Setup Complete ==="
echo "Repository has been cloned and analyzed."
echo "Please review the analysis for further steps."
echo "The repository is ready for implementing future requirements."

cd ..
