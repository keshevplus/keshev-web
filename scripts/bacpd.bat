@echo off
REM bacpd: Build, Add, Commit, Push, Deploy (Vercel) for backend
REM Usage: pnpm run bacpd

REM 2. Git add all changes
echo [bacpd] Adding changes to git...
git add .

REM 3. Commit with a standard message
echo [bacpd] Committing changes...
git commit -m "Backend: Automated build, commit, push, and deploy [bacpd]"

REM 4. Git push
echo [bacpd] Pushing to remote...
git push

REM 5. Deploy to Vercel production
echo [bacpd] Deploying to Vercel (production)...
vercel --prod

echo [bacpd] Done.
