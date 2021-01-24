# =============================================================================
#
# LICENSE:
#    MIT / (c) 2021 Mark Shaffer. All Rights Reserved
# =============================================================================

# -----------------------------------------------------------------------------
# gis domain use case
function Invoke-GIS {
    param(
        [parameter(mandatory=$true)][array]$params
    )

    function convert([string]$conversion, [double]$value) {
        $CONVERSION_MAP = @{
            "temp_f_to_c" = { param($v) ($v - 32) * (5/9)          }
            "temp_f_to_k" = { param($v) ($v - 32) * (5/9) + 273.15 }
            "temp_c_to_f" = { param($v) ($v * (9/5)) + 32          }
            "temp_c_to_k" = { param($v) $v + 273.15                }
            "temp_k_to_c" = { param($v) $v - 273.15                }
            "temp_k_to_f" = { param($v) ($v - 273.15) * (9/5) + 32 }
        }
        return $CONVERSION_MAP[$conversion].Invoke($value)
    }

    [string]$action = $params[1]
    switch ($action) {
        "convert" { convert($params[2], $params[3]); break; }
        default {
            # Do something
        }
    }

    <#
    .SYNOPSIS
        

    .DESCRIPTION
        

    .INPUTS
        

    .OUTPUTS

    .EXAMPLE

    .LINK 
        https://codemelted.com/xplat-svcs
    #>     
}

# -----------------------------------------------------------------------------
# network domain use case
function Invoke-Network {
    param(
        [parameter(mandatory=$true)][array]$params
    )

    function info {
        [System.Net.Dns]::GetHostName()
        Get-NetIPAddress | Format-Table
    }

    function ping([string]$address, [bool]$quiet) {
        if ($quiet) {
            Test-Connection -TargetName $address -Ping -Quiet 
        } else {
            Test-Connection -TargetName $address -Ping
        }
    }

    function monitor([string]$address, [int]$port, [int]$count) {
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

    function trace([string]$address) {
        Test-Connection -TargetName $address -Traceroute
    }
    
    [string]$action = $params[1]
    switch ($action) {
        "available" { ping($params[2], $true); break  }
        "info"      { info; break                     }
        "monitor"   { 
            monitor($params[2], [int]::Parse($params[3], 
                [int]::Parse($params[4]))); 
            break 
        }
        "ping"      { ping($params[2], $false); break }
        "trace"     { trace($params[2]); break        }
        default {
            # Do something
        }
    }

    <#
    .SYNOPSIS
        

    .DESCRIPTION
        

    .INPUTS
        

    .OUTPUTS

    .EXAMPLE

    .LINK 
        https://codemelted.com/xplat-svcs
    #>      
}

# -----------------------------------------------------------------------------
# platform domain use case
function Invoke-Platform {
    param(
        [parameter(mandatory=$true)][array]$params
    )

    function exists([string]$cmd) {
        [bool]$doesExist = $true
        try {
            if ($IsWindows) {
                execute {cmd /c where $cmd}
            } else {
                execute {bash /c which $cmd}
            }        
        } catch {
            $doesExist = false
        }

        return $doesExist
    }

    function find([string]$searchStr) {
        [string]$path = (Get-Location).Path
        Get-ChildItem $path -Recurse | Select-String $searchStr -AllMatches | 
        Select-Object Path,LineNumber | Format-Table | Out-String
    }

    function info {
        class PlatformInfo {
            [string]$os
            [string]$version
            [string]$architecture

            PlatformInfo() {
                $this.os = "windows"
                $this.version = [Environment]::OSVersion.Version.ToString()
                $this.architecture = [Environment]::Is64BitOperatingSystem ? 
                    "x64" : "x86"
            }
        }

        [PlatformInfo]$rtnval = [PlatformInfo]::new()
        if ($IsMacOS) {
            $rtnval.os = "mac"
        } elseif ($IsLinux) {
            $rtnval.os = "linux"
        }
        return $rtnval
    }

    function monitor([string]$process, [string]$csvFile, [int]$count) {
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

        if (-not [string]::IsNullOrEmpty($_csvFile)) {
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
            Write-Host $csvLine
            $csvLine | Out-File -FilePath $csvFile -Append
            $elapsedCount += 1;
        }        
    }

    function shell([scriptblock]$cmd) {
        [string]$current_path = Get-Location
        Invoke-Command $cmd
        Set-Location $current_path
        if ($LASTEXITCODE -ne 0) {
            throw "'$cmd' Command failed to execute"
        }        
    }

    [string]$action = $params[2]
    switch ($action) {
        "exists" { }
        "find" { }
        "info" { }
        "monitor" { }
        default {

        }
    }

    <#
    .SYNOPSIS
        

    .DESCRIPTION
        

    .INPUTS
        

    .OUTPUTS

    .EXAMPLE

    .LINK 
        https://codemelted.com/xplat-svcs
    #>       
}

# -----------------------------------------------------------------------------
# Module Public API
function Invoke-CodeMelted {
    [string]$domain = $args[0]
    switch ($domain) {
        "--gis"      { Invoke-GIS $args; break      }
        "--network"  { Invoke-Network $args; break  }
        "--platform" { Invoke-Platform $args; break }
        default {
            # Do something
        }
    }

    <#
    .SYNOPSIS
        

    .DESCRIPTION
        

    .INPUTS
        

    .OUTPUTS

    .EXAMPLE

    .LINK 
        https://codemelted.com/xplat-svcs
    #> 
}
Set-Alias -Name codemelted -Value Invoke-CodeMelted
Export-ModuleMember -Function Invoke-CodeMelted -Alias codemelted