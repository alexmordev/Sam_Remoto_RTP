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
cd %HOMEPATH%\Documents\SamCard\Sam_Remoto_RTP\client
echo "The current folder is:"
echo %CD%
echo Inicio de instalacion client
call npm i
echo Inicio de instalacion server
cd ..\server\
call npm i
TASKKILL /IM node.exe /F
echo %CD%
echo "Regresando a Admin"
cd %SystemRoot%/System32
echo %CD%
pm2 start %HOMEPATH%\Documents\SamCard\Sam_Remoto_RTP\server\apps.js
pause