#!/bin/bash

# 1. Build the project
pnpm build

# 2. Add all changes to git
git add .

# 3. Generate a relevant commit message using git diff and commit with keshevplus user
git config user.name "keshevplus"
git config user.email "keshevplus@users.noreply.github.com"

# Generate a commit message based on changes
git diff --cached --name-status > .git_commit_msg.tmp
COMMIT_MSG="chore: auto-build & deploy $(date '+%Y-%m-%d %H:%M')\n\n$(cat .git_commit_msg.tmp)"
git commit -m "$COMMIT_MSG"
rm .git_commit_msg.tmp

# 4. Push changes
git push origin HEAD

# 5. Deploy with vercel --prod
vercel --prod
