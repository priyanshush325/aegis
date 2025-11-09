#!/bin/bash

# Standard venv locations to check (in order of preference)
VENV_LOCATIONS=(
  "./venv"
  "./.venv"
  "./env"
)

# Find the first existing venv
VENV_PATH=""
for venv in "${VENV_LOCATIONS[@]}"; do
  if [ -d "$venv" ] && [ -f "$venv/bin/activate" ]; then
    VENV_PATH="$venv"
    break
  fi
done

# Run uvicorn with venv if found, otherwise use system Python
if [ -n "$VENV_PATH" ]; then
  echo "Using virtual environment: $VENV_PATH"
  # Activate venv and ensure dependencies are installed
  source "$VENV_PATH/bin/activate"
  if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies from requirements.txt"
    pip install -q -r requirements.txt
  fi
  uvicorn app.main:app --reload --port 8000
else
  echo "No virtual environment found, using system Python"
  echo "Consider creating a venv: python -m venv venv"
  uvicorn app.main:app --reload --port 8000
fi
