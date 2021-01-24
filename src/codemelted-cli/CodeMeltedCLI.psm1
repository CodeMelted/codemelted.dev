using module .\_network.psm1
# =============================================================================
#
# LICENSE:
#    MIT / (c) 2020 Mark Shaffer. All Rights Reserved
# =============================================================================
class CodeMelted {
    [Network]$network = [Network]::new()

    CodeMelted() {
        $this.network = Get-NetworkInstance
    }
}
[CodeMelted]$script:_instance = $null

function Get-CodeMeltedInstance {
    if ($null -eq $script:_instance) {
        $script:_instance = [CodeMelted]::new()
    }
    return $script:_instance
}

function Invoke-CodeMeltedCLI {
    [string]$domain = $args[0]
    if ($domain -eq "--network") {
        Invoke-NetworkCLI $args
    } else {

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

# -----------------------------------------------------------------------------
# Module Public API
Set-Alias -Name codemelted -Value Invoke-CodeMeltedCLI
Export-ModuleMember -Function Invoke-CodeMeltedCLI -Alias codemelted
Export-ModuleMember -Function Get-CodeMeltedInstance