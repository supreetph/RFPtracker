#!/usr/bin/env bash
# Script to configure git remote origin targeting git@github.com:supreetph/RFPtracker.git

REMOTE_URL="git@github.com:supreetph/RFPtracker.git"

echo "Configuring git remote target to ${REMOTE_URL}..."

if [ ! -d ".git" ]; then
  git init
fi

if git remote | grep -q "^origin$"; then
  echo "Updating existing origin remote..."
  git remote set-url origin "${REMOTE_URL}"
else
  echo "Adding origin remote..."
  git remote add origin "${REMOTE_URL}"
fi

echo "Remote origin configured successfully:"
git remote -v
