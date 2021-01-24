# =============================================================================
#
# LICENSE:
#    MIT / (c) 2020 Mark Shaffer. All Rights Reserved
# =============================================================================
class GIS {
    # Constants
    static $CONVERSION_MAP = @{
        "temp_f_to_c" = { param($v) ($v - 32) * (5/9)          }
        "temp_f_to_k" = { param($v) ($v - 32) * (5/9) + 273.15 }
        "temp_c_to_f" = { param($v) ($v * (9/5)) + 32          }
        "temp_c_to_k" = { param($v) $v + 273.15                }
        "temp_k_to_c" = { param($v) $v - 273.15                }
        "temp_k_to_f" = { param($v) ($v - 273.15) * (9/5) + 32 }
    }

    [double] convert([double]$value, [string]$conversion) {
        return [GIS]::CONVERSION_MAP[$conversion].Invoke($value)
    }
}
[GIS]$script:_instance = $null

function Get-GISInstance {
    if ($null -eq $script:_instance) {
        $script:_instance = [GIS]::new()
    }
    return $script:_instance
}

function Invoke-GISCLI {
    param(
        [parameter(mandatory=$true)][array]$params
    )
    
    [GIS]$cli = Get-GISInstance
    [string]$action = $params[1]
    if ($action -eq "convert") {
        [double]$value = [double]::Parse($params[2])
        [string]$conversion = $params[3]
        $cli.convert($value, $conversion)
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