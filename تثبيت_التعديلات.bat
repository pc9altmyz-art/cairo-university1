@echo off
chcp 65001 > nul
echo ========================================
echo [1/4] Saving local changes...
echo ========================================
git config user.email "mohamed@example.com"
git config user.name "Mohamed PC"
git add .
git commit -m "Auto update via Antigravity: UI Fixes"
echo [OK] Saved locally.
echo.

echo ========================================
echo [2/4] Getting latest version from GitHub...
echo ========================================
git pull origin main --rebase
if %ERRORLEVEL% neq 0 (
    echo [!] Conflict found, trying to force pull...
    git rebase --abort
    git pull origin main
)
echo [OK] Pulled from server.
echo.

echo ========================================
echo [3/4] Pushing changes to GitHub...
echo ========================================
git push origin main
if %ERRORLEVEL% neq 0 (
    echo [!] Normal push failed, trying force push...
    git push origin main -f
)
echo [SUCCESS] Pushed successfully!
echo.

echo ========================================
echo [4/4] DONE! The website is currently updating on Vercel.
echo ========================================
pause
