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

`run.bat`   



https://www.google.cz/imgres?imgurl=https://www.howtogeek.com/wp-content/uploads/2009/12/2pwr.png&imgrefurl=https://www.howtogeek.com/howto/7553/remove-shutdown-and-restart-buttons-in-windows-7/&h=325&w=580&tbnid=0GizMmjtyRzDqM:&tbnh=118&tbnw=211&usg=__39abO6omFlwX807rygv7UvLv6Z0=&vet=10ahUKEwio4tXE_9PWAhUDmbQKHblrC1IQ9QEIMTAA..i&docid=f0sd5ndHcmtmgM&sa=X&ved=0ahUKEwio4tXE_9PWAhUDmbQKHblrC1IQ9QEIMTAA