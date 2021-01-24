<#
.SYNOPSIS
    Provides the ability to access platform utilties

.DESCRIPTION
    This cmdlet provides a series of actions available via the host platform.
    This includes deleting and remaking a directory (clean), execute a system 
    command and checking its results, determining if a command exists, 
    searching for a string, getting information about the platform and 
    running a performance monitor. 

    Any failures of this cmdlet will result in a thrown exeception.

.PARAMETER Action
    'clean', 'execute', 'exist', 'findstr', 'info', 'log', and 'monitor' are 
    the accepted actions.

.PARAMETER Name
    This parameter takes on different meanings depending on the action:
    - clean:   The name of the rooted directory to delete and remake
    - execute: The name of the command to execute.  Use [string]::Format() to
               form the command with parameters
    - exist:   The name of the command
    - findstr: The string to search for from your current directory recursively
    - info:    Empty string, will gather information about the platform
    - log:     Logs a message (can be empty) to STDOUT and optional specified 
               Filename
    - monitor: The process to monitor or the entire plaform if 'system' is 
               specified

.PARAMETER Filename
    This is an optional parameter to the following actions:
    - log:     Will log the specified stdout to the specified file
    - monitor: Will log the CSV stdout of the monitor to the specified file

.PARAMETER Count
    Optional parameter for the 'monitor' action determining how long to execute 
    the monitor on a roughly 1 seond interval

.PARAMETER Force
    Optional parameter for the 'clean' action to not prompt for the directory
    deletion

.INPUTS
    None

.OUTPUTS
    [bool] for the 'exists' action
    Formatted table for the 'findstr' option
    [PlatformInfo] object for the 'info' object

.LINK 
    (GitHub Repo)
        COPYRIGHT: 2019 Mark Shaffer
        LICENSE:   MIT

    https://coderwall.com/p/uchx0w/powershell-recursive-search
        David Wimbly - Identifies the chain of cmdlets for the findString 
        function

    https://devblogs.microsoft.com/scripting/use-a-powershell-function-to-see-if-a-command-exists/
        Dr Scripto - Information adapted to support the doesCommandExist function
 
    https://stackoverflow.com/questions/39943928/listing-processes-by-cpu-usage-percentage-in-powershell
        js2010 Answer - Utilized his example to understand how to calculate 
        CPU% for startPerformanceMonitor function
#>
function Invoke-PlatformUtil {
    param(
        [parameter(mandatory=$true)][ValidateSet("clean", "execute", "exists",
            "findstr", "info", "log", "monitor")]
            [string]$Action,
        [AllowEmptyString()][parameter(mandatory=$true)][string]$Name,
        [parameter(mandatory=$false)][string]$Filename = "",
        [parameter(mandatory=$false)][int]$Count = 0,
        [switch]$Force
    )

    # -------------------------------------------------------------------------
    # Helper Functions:
    function clean {
        $dist = $args[0]
        $forceDelete = $args[1]
        if ([System.IO.Path]::IsPathRooted($dist)) {
            if (($dist | Test-Path)) {
                if ($forceDelete) {
                    Remove-Item -Path $dist -Force -Recurse
                } else {
                    Remove-Item -Path $dist -Recurse
                }
            }
            
            New-Item -Path $dist -ItemType Directory
        } else {
            [string]$msg = "clean option expects a rooted [Name] directory"
            throw $msg
        }
    }
    
    function doesCommandExist {
        [string]$command = $args[0]
        [bool] $doesExist = $false
        $oldPreference = $ErrorActionPreference
        $ErrorActionPreference = 'stop'
        try {
            if (Get-Command $command) {
                $doesExist = $true
            }
        } catch {
            # If command does not exist, it will throw an exception
        }
    
        $ErrorActionPreference = $oldPreference
        return $doesExist
    }
    function execute {
        $cmd = $args[0]
        Invoke-Expression -Command $cmd
        if ($global:LASTEXITCODE -ne 0) {
            throw "Command '$cmd' failed execution"
        }  
    }

    function findString {
        [string]$searchStr = $args[0]
        $path = (Get-Location).Path
        Get-ChildItem $path -Recurse | Select-String $searchStr -AllMatches | 
        Select-Object Path,LineNumber | Format-Table | Out-String
    }

    function getInfo {
        class PlatformInfo {
            [string]$name = "Windows"
            [string]$version = ""
            [string]$architecture = "x86"
        }

        $rtnval = [PlatformInfo]::new()
        if ($IsMacOS) {
            $rtnval.osName = "Mac OS"
        } elseif ($IsLinux) {
            $rtnval.osName = "Linux"
        }
    
        $rtnval.version = [Environment]::OSVersion.Version.ToString()
        if ([Environment]::Is64BitOperatingSystem) {
            $rtnval.architecture = "x64"
        }

        return $rtnval
    }

    function log {
        $msg = $args[0]
        $logFile = $args[1]
        if (-not [string]::IsNullOrEmpty($logFile)) {
            $msg | Out-File -FilePath $logFile -Append
        }
        Write-Host $msg
    }

    function startPerformanceMonitor {
        $_process = $args[0]
        $_csvFile = $args[1]
        $_count = $args[2]

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

        if ($_count -le 0) {
            $_count = 5
        }

        if (-not [string]::IsNullOrEmpty($_csvFile)) {
            if (-not $_csvFile.EndsWith(".csv")) {
                $_csvFile += ".csv"
            }

            if (Test-Path -Path $_csvFile) {
                Remove-Item $_csvFile -Force
            }
        }
        
        # Establish worker variables for collecting the data        
        [string] $header = "Time, Name, Process Count, mem (kb), cpu%"
        [int] $numCores = [System.Environment]::ProcessorCount

        # Run the performance monitor until the count is elapsed
        log $header $_csvFile
        [int] $elapsedCount = 0
        [int] $delaySeconds = 2
        while ($elapsedCount -lt $_count) {
            # Gather the process data to get the metrics for output
            $data1 = [ProcessData]::new($_process)
            Start-Sleep -Seconds 2
            $data2 = [ProcessData]::new($_process)

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
            if ($_process -eq "system") {
                $csvLine = [string]::format("{0}, {1}, {2}, {3:f2}, {4:f2}", $now, "system",
                    $processCount, $memUsed, $cpuUsed)
            } else {
                $csvLine = [string]::format("{0}, {1}, {2}, {3:f2}, {4:f2}", $now, $Name,
                    $processCount, $memUsed, $cpuUsed)
            }

            # Report the findings and do it again
            log $csvLine $_csvFile
            $elapsedCount += 1;
        }
    }

    # -------------------------------------------------------------------------
    # Main
    switch ($Action) {
        "clean"    { clean $Name $Force; break                             }
        "execute"  { execute $Name; break;                                 }
        "exists"   { doesCommandExist $Name; break                         }
        "findstr"  { findString $Name; break                               }
        "info"     { getInfo; break                                        }
        "log"      { log $Name $Filename; break                            }
        "monitor"  { startPerformanceMonitor $Name $Filename $Count; break }
    }
}
Set-Alias -Name platformUtil -Value Invoke-PlatformUtil