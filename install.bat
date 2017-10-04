echo "install node modules..."
call npm install 
echo "Compile hotkeys..."
call Account_win\Compiler\Ahk2Exe.exe /in Account_win\hotkeys.ahk /out Account_win\hotkeys.exe
echo "Start hotkeys..."
start Account_win\hotkeys.exe

pause
