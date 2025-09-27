#!/bin/bash
set -e

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create initial migration (dev)
npx prisma migrate dev --name init

# Stage, commit, and push
BRANCH=nyaysetu-demo
git checkout -b $BRANCH || git checkout $BRANCH
git add .
git commit -m "feat: initial NYAY-Setu full stack implementation"
git push origin $BRANCH
