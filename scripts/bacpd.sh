#!/bin/bash
# bacpd: Build, Add, Commit, Push, Deploy (Vercel) for backend
# Usage: pnpm run bacpd

# 2. Git add all changes
echo "[bacpd] Adding changes to git..."
git add .

# 3. Generate commit message from staged changes
echo "[bacpd] Generating commit message..."
COMMIT_MSG=$(git diff --cached --name-only | awk '{print "Update: "$1}' | paste -sd '; ' -)
if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="Backend: Automated build, commit, push, and deploy [bacpd]"
fi

echo "[bacpd] Committing with message: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# 4. Git push
echo "[bacpd] Pushing to remote..."
git push

# 5. Deploy to Vercel production
echo "[bacpd] Deploying to Vercel (production)..."
vercel --prod

echo "[bacpd] Done."
