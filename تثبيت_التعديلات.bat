@echo off
echo ========================================
echo جاري الفحص والرفع... (الرجاء الانتظار)
echo ========================================

echo --- START LOG --- > git_log.txt

echo [1] Checking Git Status >> git_log.txt 2>&1
git status >> git_log.txt 2>&1

echo [2] Adding files >> git_log.txt 2>&1
git add . >> git_log.txt 2>&1

echo [3] Committing files >> git_log.txt 2>&1
git commit -m "Force Update from Antigravity" >> git_log.txt 2>&1

echo [4] Pulling from GitHub >> git_log.txt 2>&1
git pull origin main --rebase >> git_log.txt 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Pull failed... aborting rebase >> git_log.txt 2>&1
    git rebase --abort >> git_log.txt 2>&1
)

echo [5] Pushing to GitHub >> git_log.txt 2>&1
git push origin main >> git_log.txt 2>&1

echo --- END LOG --- >> git_log.txt

echo اكتملت المحاولة. يرجى إخبار أداتك (Antigravity) أنك انتهيت لتقوم بقراءة ملف (git_log.txt).
pause
