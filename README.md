# app-muzeum

https://vtalas.github.io/app-muzeum/


### instalace

1. pro běh aplikace je potřeba stáhnout následující sofware: 

- Autohotkey - https://autohotkey.com/download/
- nodejs v8.6.0 a vyšší - https://nodejs.org/en/
- Chome browser - https://www.google.com/intl/cs/chrome/browser/desktop/index.html

2. pro zamezení neoprávněnému použití PC (vypnutí procesu, odhlášení uživatele atd.) je potřeba následujících nastavení:

 - spustit `gpedit.msc`
 - jít do sekce `Local Computer Policy/User Configuration/Administrative Templates/System/Ctrl+Alt+DeleteOptions`
 - nastavit `state` na `enabled`  pro `Remove Change password`, `Remove Lock Computer`, `Remove Task Manager`, `Remove logoff` 
 - jít do sekce `Local Computer Policy/Computer Configuration/Administrative Templates/System/Logon` pro klíč `Hide Entry Points for Fast User Switching` nastavit `state` na `disabled`
 - jít do sekce `Local Computer Policy/User Configuration/Administrative Templates/` pro klíč `Remove and prevent access to the Shut Down, Restart, Sleep, and Hibernate commands` nastavit state `enabled`

3. po naistalování závislostí spustit:

`install.bat`
`run.bat`   

pro naistalovaní applikace jako služby spustit `install-service.bat`

