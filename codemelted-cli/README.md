<h1><img src="icons8-powershell-48.png" />codemelted-pwsh Module</h1>

<h1>TABLE OF CONTENTS</h1>

- [USAGE](#usage)
  - [Do Geographic Information System Processing](#do-geographic-information-system-processing)
  - [Do Network Processing](#do-network-processing)
  - [Do Platform Processing](#do-platform-processing)

# USAGE

```
NAME
    Invoke-CodeMelted

SYNOPSIS
    Provides a command line interface (CLI) for the Mac, Linux, Windows
    operating systems to facilitate dev ops automation.


SYNTAX
    Invoke-CodeMelted [<CommonParameters>]


DESCRIPTION
    This CLI is organized into domain use cases as discussed on the
    website.  Each of the command options will invoke a domain
    cmdlet processing an action request and any associated options.

    Alias:
        codemelted-pwsh

    Get Object Reference:
        $api = codemelted-pwsh --object
            $api.[domain].method()
            See API documentation for the object structure and usage within
            a PowerShell script.

    Print Help:
        codemelted-pwsh --about
        codemelted-pwsh --help
        codemelted-pwsh [domain] help

    Domain Commands:
        codemelted-pwsh --gis [action] [options]
        codemelted-pwsh --network [action] [options]
        codemelted-pwsh --platform [action] [options]
        codemelted-pwsh --help
```

## Do Geographic Information System Processing

```
NAME
    Invoke-GIS

SYNOPSIS
    Supports the 'Do Geographic Information System Processing' domain use
    case for the codemelted-pwsh cross platform services module.


SYNTAX
    Invoke-GIS [<CommonParameters>]
    

DESCRIPTION
    codemelted --gis convert [conversion] [double]
        Converts a unit from one type to another returning a double
        [conversion]:
            temp_f_to_c
            temp_f_to_k
            temp_c_to_f
            temp_c_to_k
            temp_k_to_c
            temp_k_to_f
```

## Do Network Processing

```
NAME
    Invoke-Network

SYNOPSIS
    Supports the 'Do Network Processing' domain use case for the
    codemelted-pwsh cross platform services module.


SYNTAX
    Invoke-Network [<CommonParameters>]


DESCRIPTION
    codemelted-pwsh --network available [address]
        Returns [bool] of whether the particular specified address is
        accessible.

    codemelted-pwsh --network info
        Reports the hostname and Network IP Addresses to STDOUT.

    codemelted-pwsh --network monitor [address] [port] [count]
        Runs a network monitor to STDOUT tracking the specified
        addresss:port for the specified count.

    codemelted-pwsh --network ping [address]
        Runs a ICMP ping to the specified address returning the result
        as an [array].

    codemelted-pwsh --network trace [address]
        Runs a network trace to the specified address returning the result
        as an [array].
```

## Do Platform Processing

```
NAME
    Invoke-Platform

SYNOPSIS
    Supports the 'Do Platform Processing' domain use case for the
    codemelted-pwsh cross platform services module.


SYNTAX
    Invoke-Platform [<CommonParameters>]


DESCRIPTION
    codemelted-pwsh --platform exists [cmd]
        Returns a [bool] as to whether the command was detected within the
        environment.
    
    codemelted-pwsh --platform find [search string]
        Returns a [string] of where the search string was found by
        performing a recursive search of the directory for the term.

    codemelted-pwsh --platform info
        Returns a [psobject] containing the osName, osVersion, and
        architecture of the platform.

    codemelted-pwsh --platform monitor [process] [count] [csvFile]
        Runs a CPU monitor and memory usage to STDOUT based on the
        specified information.  If process is not specified it will 
        measure system vs. a specific process.  Specify the count to have
        it run longer than the default.  Specify the csvFile if you want
        to capture the results.

    codemelted-pwsh --platform shell [scriptblock]
        Runs a series of specified commands wrapped by the script block.
        You can change directories and string together a series of actions
        and as long as nothing fails it will return you to your original
        location.  A failure will throw an exception on which command
        failed.
```