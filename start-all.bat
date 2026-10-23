@echo off
echo ========================================================
echo   Launching Yasiru Nimsara's Full-Stack Portfolio
echo   Backend: NestJS (http://localhost:5000/api)
echo   Frontend: Next.js (http://localhost:3000)
echo   Admin Panel: http://localhost:3000/admin
echo ========================================================

start "Portfolio NestJS Backend" cmd /k "cd /d %~dp0backend && npm run start:dev"
timeout /t 3 /nobreak >nul
start "Portfolio Next.js Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers are starting up in separate windows!
echo Opening browser at http://localhost:3000 in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:3000
