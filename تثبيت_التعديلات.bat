@echo off
chcp 65001 > nul
echo =======================================================
echo ✅ إصلاح الموقع أوتوماتيكياً - المؤسسة المصرية و عين شمس
echo =======================================================

:: 1. تحديث الأيقونة
echo [1/3] جاري تحديث أيقونة الموقع...
if exist "public\institution-logo.png" (
    copy "public\institution-logo.png" "src\app\icon.png" /Y
)

:: 2. إنشاء مجلد الشهادات
echo [2/3] جاري تجهيز مجلد الشهادات...
if not exist "public\certificates" mkdir "public\certificates"

:: 3. الرفع على GitHub (بالطريقة الصحيحة)
echo [3/3] جاري رفع كافة التعديلات إلى GitHub...
git add .
git commit -m "Final Fix: Complete Rebranding to Ain Shams, Navy Blue Theme, and 30 Programs"
git push origin main

echo.
echo =======================================================
echo ✨ تم بنجاح! السايت الآن جاهز ومحدث بالكامل.
echo =======================================================
pause
