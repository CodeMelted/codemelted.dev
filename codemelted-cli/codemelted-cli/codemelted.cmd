@echo off
:: ============================================================================
:: Launch point from a Windows CMD terminal to call into the codemelted-pwsh
:: PowerShell core module.
:: LICENSE:
::    MIT / 2020 Mark Shaffer. All Rights Reserved.
:: ============================================================================
where pwsh > NUL 2>&1
if not errorlevel 1 (
    pwsh -Command Invoke-CodeMelted %*
) else (
    echo ERROR: PowerShell Core not detected on the system.  
    echo        Goto https://github.com/PowerShell/PowerShell to install.
)