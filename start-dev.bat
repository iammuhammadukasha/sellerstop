@echo off
title Seller Stop - Dev Server
cd /d "%~dp0"

set "NODE_PATH="
for %%d in (
  "%ProgramFiles%\nodejs"
  "%ProgramFiles(x86)%\nodejs"
  "%LOCALAPPDATA%\Programs\node"
  "%APPDATA%\npm"
) do if exist "%%~d\node.exe" set "NODE_PATH=%%~d"
if defined NODE_PATH set "PATH=%NODE_PATH%;%PATH%"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js not found. Please install from https://nodejs.org
  echo Then run this script again.
  pause
  exit /b 1
)

if not exist "node_modules\next" (
  echo Installing dependencies first...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Starting dev server...
call npm run dev
pause
