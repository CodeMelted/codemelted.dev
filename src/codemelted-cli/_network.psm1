# =============================================================================
#
# LICENSE:
#    MIT / (c) 2020 Mark Shaffer. All Rights Reserved
# =============================================================================
class Network {
    [string] hostname() {
        return [System.Net.Dns]::GetHostName()
    }

    [object] netIpAddress() {
        return (Get-NetIPAddress | Format-Table)
    }

    [void] monitor([string]$address, [int]$port, [int]$count) {
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

    [bool] ping([string]$address) {
        return Test-Connection -TargetName $address -Ping -Quiet
    }

    [bool] trace([string]$address) {
        return Test-Connection -TargetName $address -Traceroute -Quiet
    }
}
[Network]$script:_instance = $null

function Get-NetworkInstance {
    if ($null -eq $script:_instance) {
        $script:_instance = [Network]::new()
    }
    return $script:_instance
}


function Invoke-NetworkCLI {
    param(
        [parameter(mandatory=$true)][array]$params
    )
    
    [Network]$cli = Get-NetworkInstance
    [string]$action = $params[1]
    if ($action -eq "hostname") {
        $cli.hostname()
    } elseif ($action -eq "net-ip-address") {
        $cli.netIpAddress()
    } elseif ($action -eq "ping") {
        [string]$address = $params[2]
        $cli.ping($address)
    } elseif ($action -eq "trace") {
        [string]$address = $params[2]
        $cli.trace($address)
    } elseif ($action -eq "help") {
        Get-Help -Name Invoke-NetworkCLI -Full
    }

    <#
    .SYNOPSIS
        

    .DESCRIPTION
        

    .INPUTS
        None. You cannot pipe objects to this cmdlet.

    .OUTPUTS

    .EXAMPLE

    .LINK 
        https://codemelted.com
    #>     
}