@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (
  echo Node.js is not installed. Install Node.js 20.19 or newer first.
  pause
  exit /b 1
)
echo Installing dependencies...
call npm install || goto :error
echo Checking atlas data...
call npm run check:data || goto :error
echo Starting Armenian Heritage Atlas...
call npm run dev
exit /b 0
:error
echo.
echo Setup failed. Review the error above.
pause
exit /b 1
