using namespace System.Runtime.InteropServices
# =============================================================================
#
# LICENSE:
#    MIT / (c) 2021 Mark Shaffer. All Rights Reserved
# =============================================================================
[string]$ABOUT = @'
TITLE:     codemelted-pwsh
VERSION:   v0.0.1 (Last Updated on 24 Jan 2021)
WEBSITE:   https://codemelted.com/xplat-svcs
LICENSE:   MIT / (c) 2021 Mark Shaffer. All Rights Reserved.
'@

# -----------------------------------------------------------------------------
# Brains that implement the Domain Use Cases

# @class The GIS class implements the 'Do Geographic Information System 
#   Processing' domain use case.
class GIS {
    # Member Fields
    hidden [hashtable] $conversionMap

    GIS() {
        $this.conversionMap = @{
            "temp_f_to_c" = { param($v) ($v - 32) * (5/9)          }
            "temp_f_to_k" = { param($v) ($v - 32) * (5/9) + 273.15 }
            "temp_c_to_f" = { param($v) ($v * (9/5)) + 32          }
            "temp_c_to_k" = { param($v) $v + 273.15                }
            "temp_k_to_c" = { param($v) $v - 273.15                }
            "temp_k_to_f" = { param($v) ($v - 273.15) * (9/5) + 32 }            
        }
     }

    # @method The convert method converts from one unit to another.
    # @param [double] $v - The current unit value to convert.
    # @param [string] $converstion - The conversion to perform.
    # @returns [double] of the translated unit.
    [double] convert([double]$v, [string]$conversion) {
        return [double]::Parse($this.conversionMap[$conversion].Invoke($v))
    }
}

# @class The Network class implements the 'Do Network Processing' domain use
#   case.
class Network {
    Network() { }

    # @method The available method determines if an address is accessible via
    #   the network.
    # @param [string] $address - The ip address or hostname.
    # @returns [bool] True if accessible, false otherwise.
    [bool] available([string]$address) {
        return Test-Connection -TargetName $address -Ping -Quiet
    }

    # @method The hostname method gets the local hostname of the platform.
    # @returns [string] of the local hostname.
    [string] hostname() {
        return [System.Net.Dns]::GetHostName()
    }

    # @method The monitor method runs a network monitor of the specified 
    #   information on the given platform.
    # @param [string] $address - The ip address or hostname.
    # @param [int] $port - The optional port to monitor with the $address.
    # @param [int] $count - The optional count to perform the monitor.
    [void] monitor([string]$address, [int]$port = 0, [int]$count = 5) {
        [int] $x = 0
        while ($x -lt $count) {
            $x += 1
            $now = Get-Date
            Clear-Host
            Write-Host Network Monitor $now Execution $x of $count
            Write-Host
            if ($port -gt 0 -and $port -lt 65536) {
                Write-Host TCP:
                Get-NetTCPConnection -LocalAddress $address -LocalPort $port `
                    -ErrorAction SilentlyContinue | Format-Table
                Write-Host UDP:
                Get-NetUDPEndPoint -LocalAddress $address -LocalPort $port `
                    -ErrorAction SilentlyContinue | Format-Table
            } else {
                Write-Host TCP:
                Get-NetTCPConnection $address -ErrorAction SilentlyContinue `
                    | Format-Table
                Write-Host UDP:
                Get-NetUDPEndPoint $address -ErrorAction SilentlyContinue `
                    | Format-Table
            }
    
            Start-Sleep -Seconds 1
        } 
    }

    # @method The netIpAddress method retrieves the currently configured IP 
    #   addresses for the platform.
    # @returns [array]
    [array] netIpAddress() {
        return Get-NetIPAddress | Format-Table
    }

    # @method The ping method performs an ICMP ping to the specified address.
    # @param [string] $address - The ip address or hostname to ping.
    # @returns [array] The results of the ping.
    [array] ping([string]$address) {
        return Test-Connection -TargetName $address -Ping
    }

    # @method The trace method determines what it takes to get to the specified 
    #   address from the host platform.
    # @param [string] $address - The ip address or hostname to ping.
    # @returns [array] The results of the trace.
    [array] trace([string]$address) {
        return Test-Connection -TargetName $address -Traceroute
    }
}

# @class The Platform class implements the 'Do Platform Processing' domain use
#   case.
class Platform {
    # Member Fields:
    # @property [string] osName - The name of the operating system.
    [string]$osName
    # @property [string] osVersion - The version of the operating system.
    [string]$osVersion
    # @property [string] architecture - Either 'x86' or 'x64'
    [string]$architecture

    Platform() {
        if ([RuntimeInformation]::IsOSPlatform([OSPlatform]::Windows)) {
            $this.osName = [OSPlatform]::Windows
        } elseif ([RuntimeInformation]::IsOSPlatform([OSPlatform]::OSX)) {
            $this.osName = [OSPlatform]::OSX
        } elseif ([RuntimeInformation]::IsOSPlatform([OSPlatform]::Linux)) {
            $this.osName = [OSPlatform]::Linux
        } elseif ([RuntimeInformation]::IsOSPlatform([OSPlatform]::FreeBSD)) {
            $this.osName = [OSPlatform]::FreeBSD
        }
        $this.osVersion = [Environment]::OSVersion.Version.ToString()
        $this.architecture = [Environment]::Is64BitOperatingSystem ? 
            "x64" : "x86"
    }

    # @method The exists method determines if a command is available on the 
    #   platform.
    # @param [string] $cmd - The command to check on the platform.
    # @returns [bool] True if available, false otherwise.
    [bool] exists([string]$cmd) {
        [bool]$doesExist = $true
        try {
            if ($this.osName -eq [OSPlatform]::Windows) {
                execute {cmd /c where $cmd}
            } else {
                execute {bash /c which $cmd}
            }        
        } catch {
            $doesExist = false
        }

        return $doesExist
    }

    # @method The find method performs a recursive search of the search string
    #   from the specified path.
    # @param [string] $searchStr - The term to search for within the different 
    #   files.
    # @param [string] $searchPath - Optional search path to check or utilize the
    #   current active directory.
    # @returns [string] The results of where the term was found.
    [string] find([string]$searchStr, [string]$searchPath = "") {
        [string]$path = [string]::IsNullOrEmpty($searchPath) ? 
            (Get-Location).Path : $searchPath
        return Get-ChildItem $path -Recurse | Select-String $searchStr -AllMatches | 
            Select-Object Path,LineNumber | Format-Table | Out-String
    }

    # @method The info method retrieves information about the platform.
    # @returns [psobject] containing the osName, osVersion, and architecture.
    [psobject] info() {
        return @{
            "osName" = $this.osName
            "osVersion" = $this.osVersion
            "architecture" = $this.architecture
        }
    }
    
    # @method The monitor method perform a cpu% and memory utilization of a 
    #   process or of the entire platform.
    # @param [string] $process - The process to monitor or system if not specified.
    # @param [int] $count - The number of times to run the monitor for.  
    #   Default is 5.
    # @param [string] $csvFile - Optional file to log the results.
    [void] monitor([string]$process = "system", [int]$count = 0, [string]$csvFile = "") {
        # Data to hold the process being searched.  Will be used to spit out the CSV
        # file later
        class ProcessData {
            [int]     $count
            [double]  $memoryBytes
            [double]  $cpuSecs

            ProcessData([string] $name) {
                # Get the process information based on what is specified
                $processList = $null
                if ($name -eq "system") {
                    $processList = Get-Process -ErrorAction SilentlyContinue
                } else {
                    $processList = Get-Process -Name $name -ErrorAction SilentlyContinue
                }

                # tally up the information to initialize the member fields
                foreach ($p in $processList) {
                    $this.count += 1
                    $this.memoryBytes += $p.ws
                    $this.cpuSecs += $p.cpu
                }
            }
        }

        # Parse our parameters to set up the environment
        if ($count -le 0) {
            $count = 5
        }

        if (-not [string]::IsNullOrEmpty($csvFile)) {
            if (-not $csvFile.EndsWith(".csv")) {
                $csvFile += ".csv"
            }

            if (Test-Path -Path $csvFile) {
                Remove-Item $csvFile -Force
            }
        }
        
        # Establish worker variables for collecting the data        
        [string] $header = "Time, Name, Process Count, mem (kb), cpu%"
        [int] $numCores = [System.Environment]::ProcessorCount

        # Run the performance monitor until the count is elapsed
        Write-Host $header
        $header | Out-File -FilePath $csvFile -Append
        [int] $elapsedCount = 0
        [int] $delaySeconds = 2
        while ($elapsedCount -lt $count) {
            # Gather the process data to get the metrics for output
            $data1 = [ProcessData]::new($process)
            Start-Sleep -Seconds 2
            $data2 = [ProcessData]::new($process)

            # Calculate the % utilized of cpu and memory
            $now = Get-Date
            $processCount = $data2.count
            $memUsed = $data2.memoryBytes / 1Kb
            $cpuUsed = (($data2.cpuSecs - $data1.cpuSecs) / ($numCores  * $delaySeconds) * 100)
            
            # Rarely happens but just in case
            if ($cpuUsed -lt 0) {
                $cpuUsed = 0
            }

            # Report and log the results
            [string] $csvLine = ""
            if ($process -eq "system") {
                $csvLine = [string]::format("{0}, {1}, {2}, {3:f2}, {4:f2}", $now, "system",
                    $processCount, $memUsed, $cpuUsed)
            } else {
                $csvLine = [string]::format("{0}, {1}, {2}, {3:f2}, {4:f2}", $now, $process,
                    $processCount, $memUsed, $cpuUsed)
            }

            # Report the findings and do it again
            Write-Host $csvLine
            $csvLine | Out-File -FilePath $csvFile -Append
            $elapsedCount += 1;
        }        
    }

    # @method The shell method runs a series of external commands on the 
    #   platform.
    # @param [scriptblock] $cmd - The series of commands to execute.
    [void] shell([scriptblock]$cmd) {
        [string]$current_path = Get-Location
        Invoke-Command $cmd
        Set-Location $current_path
        if ($LASTEXITCODE -ne 0) {
            throw "'$cmd' Command failed to execute"
        }        
    }
}

# @class The CodeMelted class is the holder API for the codemelted-pwsh module.
class CodeMelted {
    # @property [GIS] Accesses the implemented domain use case.
    [GIS]$gis = [GIS]::new()
    # @property [Network] Accesses the implemented domain use case.
    [Network]$network = [Network]::new()
    # @property [Platform] Accesses the implemented domain use case.
    [Platform]$platform = [Platform]::new()
    CodeMelted() { }
}
[CodeMelted]$script:_instance = [CodeMelted]::new()

# -----------------------------------------------------------------------------
# Internal Domain Use Case cmdlets

function Invoke-GIS {
    [string]$action = $args[1]
    if ($action -eq "convert") {
        [double]$v = $args[2]
        [string]$conversion = $args[3]
        $script:_instance.gis.convert($v, $conversion)
    } elseif ($action -eq "help") {
        Get-Help Invoke-GIS
    }else {
        throw "'codemelted --gis' received an unsupported '$action' action"        
    }

    <#
    .SYNOPSIS
        Supports the 'Do Geographic Information System Processing' domain use 
        case for the codemelted-pwsh cross platform services module.

    .DESCRIPTION
        codemelted --gis convert [conversion] [double]
            Converts a unit from one type to another returning a double
            [conversion]:
                temp_f_to_c
                temp_f_to_k
                temp_c_to_f
                temp_c_to_k
                temp_k_to_c
                temp_k_to_f

    .LINK 
        https://codemelted.com/xplat-svcs
    #>     
}

function Invoke-Network {
    [string]$action = $args[1]
    if ($action -eq "available") {
        [string]$address = $args[2]
        $script:_instance.network.available($address)
    } elseif ($action -eq "info") {
        $script:_instance.network.hostname()
        $script:_instance.network.netIpAddress()
    } elseif ($action -eq "monitor") {
        [string]$address = $args[2]
        [int]$port = [int]::Parse($args[3])
        [int]$count = [int]::Parse($args[4])
        $script:_instance.network.monitor($address, $port, $count)
    } elseif ($action -eq "ping") {
        [string]$address = $args[2]
        $script:_instance.network.ping($address)
    } elseif ($action -eq "trace") {
        $script:_instance.network.trace()
    } elseif ($action -eq "help") {
        Get-Help Invoke-Network
    } else {
        throw "'codemelted --network' received an unsupported '$action' action" 
    }

    <#
    .SYNOPSIS
        Supports the 'Do Network Processing' domain use case for the 
        codemelted-pwsh cross platform services module.       

    .DESCRIPTION
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

    .LINK 
        https://codemelted.com/xplat-svcs
    #>      
}

function Invoke-Platform {
    [string]$action = $args[1]
    if ($action -eq "exists") {
        [string]$cmd = $args[3]
        $script:_instance.platform.exists($cmd)
    } elseif ($action -eq "find") {
        [string]$searchStr = $args[3]
        $script:_instance.platform.find($searchStr)
    } elseif ($action -eq "info") {
        $script:_instance.platform.info()
    } elseif ($action -eq "monitor") {
        [string]$process = $args.Count -eq 4 ? $args[3] : "system"
        [int]$count = $args.Count -eq 5 ? [int]::Parse($args[4]) : 0
        [string]$csvFile = $args.Count -eq 6 ? $args[5] : ""
        $script:_instance.platform.monitor($process, $count, $csvFile)
    } elseif ($action -eq "shell") {
        [scriptblock]$cmd = $args[3]
        $script:_instance.platform.shell($cmd)
    } elseif ($action -eq "help") {
        Get-Help Invoke-Platform
    } else {
        throw "'codemelted --platform' received an unsupported '$action' action" 
    }

    <#
    .SYNOPSIS
        Supports the 'Do Platform Processing' domain use case for the 
        codemelted-pwsh cross platform services module.            

    .DESCRIPTION
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

    .LINK 
        https://codemelted.com/xplat-svcs
    #>       
}

# -----------------------------------------------------------------------------
# Module Public API
function Invoke-CodeMelted {
    [string]$domain = $args[0]
    switch ($domain) {
        "--gis"      { Invoke-GIS @args; break           }
        "--network"  { Invoke-Network @args; break       }
        "--platform" { Invoke-Platform @args; break      }
        "--about"    { $ABOUT; break                     }
        "--object"   { return $script:_instance          }
        "--help"     { Get-Help Invoke-CodeMelted; break }
        default {
            throw "Unsupported '$domain' domain specified.  Please try again."
        }
    }

    <#
    .SYNOPSIS
        Provides a command line interface (CLI) for the Mac, Linux, Windows
        operating systems to facilitate dev ops automation.

    .DESCRIPTION
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

    .LINK 
        https://codemelted.com/xplat-svcs
    #> 
}
Set-Alias -Name codemelted-pwsh -Value Invoke-CodeMelted
Export-ModuleMember -Function Invoke-CodeMelted -Alias codemelted-pwsh