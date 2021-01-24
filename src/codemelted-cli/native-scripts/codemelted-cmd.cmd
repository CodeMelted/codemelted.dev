@echo off
:: ----------------------------------------------------------------------------
:: @file CLI implementation to support different commands in the Windows CMD 
::  terminal
:: @license MIT / (c) Mark Shaffer 2020. All Rights Reserved.
:: ----------------------------------------------------------------------------
:: MAIN entry point for this script
    setlocal
    set PROJECT_REPO=https://codemelted.com/xplat-svc/cli-pwsh
    set SCRIPT_PATH=%~dp0

    set action=%~1
    set valid_opt=no
    if "%action%" equ "--cpu"           ( call :--cpu %2 %3 && set valid_opt=yes          )
    if "%action%" equ "--exists"        ( call :--exists %2 %3 && set valid_opt=yes       )
    if "%action%" equ "--findstr"       ( call :--findstr %2 && set valid_opt=yes         )
    if "%action%" equ "--help"          ( call :--help && set valid_opt=yes               )
    if "%action%" equ "--network_info"  ( call :--network_info && set valid_opt=yes       )
    if "%action%" equ "--log"           ( call :--log %2 %3 && set valid_opt=yes          )
    if "%action%" equ "--monitor_conn"  ( call :--monitor_conn %2 %3 && set valid_opt=yes )
    if "%action%" equ "--platform_info" ( call :--platform_info && set valid_opt=yes      )
    if "%action%" equ "--ping"          ( call :--ping %2 && set valid_opt=yes            )
    if "%action%" equ "--sleep"         ( call :--sleep %2 && set valid_opt=yes           )
    if "%action%" equ "--trace"         ( call :--trace %2 && set valid_opt=yes           )
    if "%valid_opt%" equ "no" (
        if not errorlevel 1 (
            echo ERROR: codemelted-cmd received an invalid [Action] parameter
        )
        exit /b 1
    )

    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Samples the cpu% utilization and memory used (kb) for the given
::      platform on a 5 second interval.
:: @param csvFile to log the data.  Previous files of the same name will be 
::    deleted
:: @param count optional count of how many times to sample the utilization
:--cpu
    setlocal
    set csvFile=%~1
    set /a count=%~2 + 0

    if %count% equ 0 (
        set count=5
    )

    if defined csvFile (
        del /f %csvFile% > NUL 2>&1
    )

    call :log "sample, time, name, cpu percent, mem_used_kb" %csvFile%
    set /a x=0
    :while1
        set /a x+=1
        if %x% gtr %count% (
            goto :end_while1
        ) else (
            call :logPerfData %csvFile%
        )
        goto :while1
    :end_while1
    endlocal
    exit /b

:logPerfData
    setlocal
    set csvFile=%~1
    set cpuLoad=
    for /f "skip=1" %%p in ('wmic cpu get LoadPercentage') do (
        if not defined cpuLoad (
            set cpuLoad=%%p
        )
    )
    set freeMem=
    for /f "skip=1 tokens=*" %%m in ('wmic os get FreePhysicalMemory') do (
        if not defined freeMem (
            set freeMem=%%m
        )
    )
    set totalMem=
    for /f "skip=1 tokens=*" %%m in ('wmic os get TotalVisibleMemorySize') do (
        if not defined totalMem (
            set totalMem=%%m
        )
    )
    set /a usedMem=%totalMem%-%freeMem%
    set sample=%x% of %count%
    call :log "%sample%, %date% %time%, system, %cpuLoad%, %usedMem%" %csvFile%
    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Determines if the CMD environment detects the specified command
:: @param name IN Command to search for
:: @returns 0 if command exists, 1 if it does not exist
:--exists
    setlocal
    set name=%~1
    if not defined name (
        echo ERROR: codemelted-cmd -exists received an invalid [name] parameter
        exit /b 1
    )

    where %name% > NUL 2>&1
    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Determines if the CMD environment detects the specified command
:: @param name IN Command to search for
:: @returns 0 if command exists, 1 if it does not exist
:-exists
    setlocal
    set name=%~1
    if not defined name (
        echo ERROR: codemelted-cmd -exists received an invalid [name] parameter
        exit /b 1
    )

    where %name% > NUL 2>&1
    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Will perform a recursive search for a string within the current
:: directory and print the filename:linenumber it found it to STDOUT
:: @param name string to search for within the current directory
:--findstr
    setlocal
    set name=%~1
    if not defined name (
        set /p name=Name: 
        if not defined name (
            echo ERROR: codemelted-cmd -findstr received an invalid ^
                [name] parameter
            exit /b 1
        )
    )

    findstr /s /i /n /p /c:%name% %CD%\*
    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Prints information about this script to STDOUT
:--help
    setlocal
    echo USAGE:   codemelted-cmd [Action] [Options]
    echo PROJECT: %PROJECT_REPO%
    echo OPTIONS:
    echo  --cpu [count] [csvFile] 
    echo     Will start a resource monitor of the platform with option to 
    echo     log to a CSV file.  The default count is 5
    echo  --exists [name] 
    echo     Determines if a specified command exists returning 0 if it does
    echo  --findstr [name] 
    echo     Will recursively search for a string in the current directory 
    echo     and lists those results to STDOUT
    echo  --help
    echo     Prints this help file to STDOUT
    echo  --log [message] [logFile] 
    echo     Will print a message to STDOUT with optional logging if a 
    echo     filename is specified
    echo  --monitor_conn [Address[:Port]] [[Count]]
    echo     Will monitor an address's connection status with optional
    echo     port for the given count. Default count is 5
    echo  --network_info 
    echo     Prints the network information for the platform
    echo  --platform_info 
    echo     Prints to STDOUT the OS and architecture information
    echo  --ping [Address] [[Count]]
    echo     Will perform an ICMP test to an address for the given 
    echo     count.  Default count is 1    
    echo  --sleep [seconds] 
    echo     Pauses execution for specified number of seconds
    echo  --trace [Address]
    echo     Will perform a network trace to an address

    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Will report to STDOUT and optoinally to a log file
:: @param message Item to print to STDOUT.  Use "" when utlizing
:: @param logFile Optional log file to log the message if specified
:--log
    setlocal
    set message=%~1
    set logFile=%~2
    if defined message (
        echo %message%
        if defined logFile (
            echo %message% >> "%logFile%"
        )
    ) else (
        echo.
        if defined logFile (
            echo. >> "%logFile%"
        )
    )
    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Monitors a specified host and port for its current network 
::  connection statuses
:: @param address along with port depending out how specific you want 
::  to monitor
:: @param count of how many times to execute the monitor.  Not 
::  specifying will execute one time
:--monitor_conn
    setlocal

    set address=%~1
    set /a count=%~2 + 0
    if not defined address (
        echo ERROR: testNetwork received an invalid [Address] parameter
        exit /b 1
    )
    if %count% leq 0 (
        set /a count=5
    )

    set /a x=0
    :while1
        set /a x+=1
        if %x% gtr %count% (
            goto :end_while1
        ) else (
            cls
            echo MESSAGE: testNetwork monitor %date% %time% Execution %x% of %count%
            echo.
            netstat -na | find "%address%"
        )
        if %x% neq %count% ( call --sleep 1 )
        goto :while1
    :end_while1

    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Prints the hostname and ip information for the platform.
:--network_info
    setlocal
    hostname
    ipconfig /all
    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Prints the os name and architecture to stdout.
:--platform_info
    setlocal
    set arch=x64
    if /i "%PROCESSOR_ARCHITECTURE%" == "x86" (
        set arch=x86
    )

    set osName=Win
    ver | find "10.0" > nul
    if not errorlevel 1 (set osName=%osName%10)
    ver | find "6.2" > nul
    if not errorlevel 1 (set osName=%osName%8)
    ver | find "6.1" > nul
    if not errorlevel 1 (set osName=%osName%7)
    ver | find "6.0" > nul
    if not errorlevel 1 (set osName=%osName%Vista)
    ver | find "5.1" > nul
    if not errorlevel 1 (set osName=%osName%XP)
    ver | find "5.0" > nul
    if not errorlevel 1 (set osName=%osName%2000)

    set platform=%osName%-%arch%
    echo %platform%

    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function performs a network ping
:: @param address host to ping
:: @param count how many times to execute the ping
:--ping
    setlocal
    set address=%~1
    set count=%~2 + 0
    if not defined address (
        echo ERROR: testNetwork received an invalid [Address] parameter
        exit /b 1
    )
    if %count% leq 0 (
        set /a count=1
    )

    ping -n %count% -l 64 %address%
    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Sleeps for the specified number of seconds.
:: @param seconds IN Number of seconds to sleep
:--sleep
    setlocal
    set /a seconds=%1+1
    if %seconds% leq 1 (
        set /a seconds=2
    )
    ping -n %seconds% 127.0.0.1 > nul
    endlocal
    exit /b

:: ----------------------------------------------------------------------------
:: @function Performs a network traceroute to the given host
:: @param address The host to determine its route from your machine
:--trace
    setlocal
    set address=%~1
    if not defined address (
        echo ERROR: testNetwork received an invalid [Address] parameter
        exit /b 1
    )
    tracert %address%
    endlocal
    exit /b