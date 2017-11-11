# Chrome Kiosk App on Windows 10

This is a simple web application which shows a concept of "Kiosk mode" on Windows 10 machine.
It's made to run in the Chrome. With some tweaks described below, user is able to see just this app, everything else is restricted - browsing porn and other pages, turn off the app, switch to another window, logoff, lock the machine and doing other joyful stuff.

There are a few steps how to achieve it:

## disable shortcuts

We need to disable the Windows shortcuts like (`Alt+Tab`, `Alt+L`, `Window+D` etc.) and the Chrome shortcuts as well. To do that, we will use the [Autohotkey](https://autohotkey.com/) utility. It's able to override most of the shortcuts. [Here](blob/master/Account_win/hotkeys.ahk) is the overriding script for both Windows and Chrome.

you can open the `.ahk` file using the Autohotkey or compile it into a `.exe` file using the `Ahk2Exe` shipped with the Autohotkey:

```
Ahk2Exe.exe /in hotkeys.ahk /out hotkeys.exe
```

**Did I forget any shortcut? let me know, PR's are welcome!**

However, Lock screen cannot be handled with the `.ahk` script, we need another solution...

## deal with the `Ctrl+Alt+Del`

I haven't managed to prevent showing the Lock screen after the `Ctrl+ALt+Del` shortcut. The possible way is to hide options listed there by editing `group policies`:


```
gepdit.msc
```

Then go to the section

```
Local Computer Policy/User Configuration/Administrative Templates/System/Ctrl+Alt+DeleteOptions
````
and set following keys:
```
Remove Change password -> state -> enabled
Remove Lock Computer -> state -> enabled
Remove Task Manager -> state -> enabled
Remove logoff -> state -> enabled
```


For some reason, `Switch User` is in another location:
```
Local Computer Policy/Computer Configuration/Administrative Templates/System/Logon
```
```
Hide Entry Points for Fast User Switching -> state -> disabled
```


To remove the 'switch off' button in the bottom right corner go to:

```
Local Computer Policy/User Configuration/Administrative Templates/Start Menu and Taskbar
```
```
Remove and prevent access to the Shut Down, Restart, Sleep, and Hibernate commands -> state -> enabled
```

## run

open Chrome
```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --chrome --kiosk http://localhost:88 --fullscreen
```

https://vtalas.github.io/app-muzeum/
