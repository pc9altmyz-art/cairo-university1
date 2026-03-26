@echo off
chcp 65001 > nul
echo =========================================================================
echo 🤖 Antigravity Automated Setup Script (Ain Shams Rebranding + GitHub Push)
echo =========================================================================

set "PROJECT_DIR=%~dp0"
set "BRAIN_DIR=C:\Users\PC-9\.gemini\antigravity\brain\067b7ba1-40b9-43da-93d1-91a50ca261cb"

echo.
echo [1/4] Setting up Favicon (Site Icon)...
copy "%BRAIN_DIR%\media__1774535644121.png" "%PROJECT_DIR%src\app\icon.png" /Y

echo [2/4] Setting up Institution Logo...
copy "%BRAIN_DIR%\media__1774534368620.png" "%PROJECT_DIR%public\institution-logo.png" /Y

echo [3/4] Opening Windows for Certificate Images...
if not exist "%PROJECT_DIR%public\certificates" mkdir "%PROJECT_DIR%public\certificates"
echo I have automatically created "public\certificates" for you.
echo Opening folders so you can easily copy the 11 certificate images (JPGs) to public\certificates...
start "" "%BRAIN_DIR%"
start "" "%PROJECT_DIR%public\certificates"

echo.
echo *** IMPORTANT ***
echo Please copy the 11 certificates from the Antigravity Brain folder 
echo and name them exactly: 1.jpg, 2.jpg ... 11.jpg
echo Type 'yes' and press Enter when you are done to continue with GitHub push:
set /p confirm="Done? (yes): "

echo.
echo [4/4] Uploading to GitHub...
git add .
git commit -m "Complete Rebranding to Ain Shams, Added 30 Programs, Real Certificates, & New Favicon"
git push

echo.
echo =========================================================================
echo ✅ All Tasks Completed Successfully! Enjoy the new website!
echo =========================================================================
pause
