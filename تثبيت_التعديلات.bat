@echo off
:: Set encoding to UTF-8
chcp 65001 > nul

echo ========================================
echo [RUNNING] Modern Publication Script
echo ========================================

:: 1. Save Changes
echo [1/3] Saving all your changes locally...
git add .
git commit -m "Final Update: Official Links and Contact Specialties"
echo [OK] Changes saved.
echo.

:: 2. Sync with GitHub
echo [2/3] Syncing with GitHub server...
git pull origin main --rebase
if %ERRORLEVEL% neq 0 (
    echo [!] ERROR: Could not sync with GitHub.
    echo Please contact support if this persists.
    pause
    exit /b %ERRORLEVEL%
)
echo [OK] Sync complete.
echo.

:: 3. Reach the Web
echo [3/3] Uploading to Vercel (via GitHub)...
git push origin main
if %ERRORLEVEL% neq 0 (
    echo [!] ERROR: Could not host the website.
    echo Check your internet connection.
    pause
    exit /b %ERRORLEVEL%
)
echo.
echo ========================================
echo [SUCCESS] Everything is LIVE!
echo The website will update in 1-2 minutes.
echo ========================================
echo.
pause
