#!/usr/bin/env bash
# Script to create feature branch and push to target GitHub repository: git@github.com:supreetph/RFPtracker.git

BRANCH_NAME="feature/rfp-tracker-foundations"
REMOTE_URL="git@github.com:supreetph/RFPtracker.git"

echo "================================================="
echo "Creating feature branch and pushing codebase..."
echo "Target Remote: ${REMOTE_URL}"
echo "Feature Branch: ${BRANCH_NAME}"
echo "================================================="

# Ensure git remote is configured
if ! git remote | grep -q "^origin$"; then
  git remote add origin "${REMOTE_URL}"
else
  git remote set-url origin "${REMOTE_URL}"
fi

# Create and checkout feature branch
git checkout -b "${BRANCH_NAME}" 2>/dev/null || git checkout "${BRANCH_NAME}"

# Stage all files
git add .

# Commit changes
git commit -m "feat: initial implementation of Vue 3 + TypeScript + Tailwind RFP Tracker"

# Push feature branch to remote origin
git push -u origin "${BRANCH_NAME}"
