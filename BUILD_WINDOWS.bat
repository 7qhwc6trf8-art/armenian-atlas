@echo off
setlocal
cd /d "%~dp0"
call npm install || goto :error
call npm run check:data || goto :error
call npm run build || goto :error
echo.
echo Production build created in the dist folder.
pause
exit /b 0
:error
echo.
echo Build failed. Review the error above.
pause
exit /b 1
