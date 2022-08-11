@echo off
NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
	echo Necesita ejecutar el instalador en modo administrador
	pause
	exit
)
echo Inicio de instalacion de NODE JS
:: msiexec /i node-v16.16.0-x64.msi /QN /L*V "C:\Temp\msilog.log" STARTAPP=1 SHOWHELP=Yes
echo Finalizando instalacion de NODE JS
call npm --version
echo "The current folder is:"
echo %CD%
cd ..\..\Users\oscastro\Documents\SamRemoto\Sam_Remoto_RTP\client
echo Inicio de instalacion client
@REM call npm i
echo Inicio de instalacion server
cd ..\server\
@REM call npm i
TASKKILL /IM node.exe /F
pause
echo %CD%
pause
call pm2 start apps.js