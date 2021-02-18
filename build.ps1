#!/usr/bin/pwsh
# -----------------------------------------------------------------------------
# ABOUT:   Provides the build script for this project.  An exception is thrown
#          if something fails when executing this script.
# LICENSE: MIT / (c) 2021 Mark Shaffer
# -----------------------------------------------------------------------------
function build {
        # -------------------------------------------------------------------------
    # Constants:
    [string]$PROJ_NAME = "CodeMelted (Cross Platform Services)"
    [string]$SCRIPT_PATH = $PSScriptRoot

    # -------------------------------------------------------------------------
    # Helper Functions
    function run_cmd {
        param([scriptblock]$cmd)
        [string]$current_path = Get-Location
        Set-Location $SCRIPT_PATH
        Invoke-Command $cmd
        Set-Location $current_path
        if ($LASTEXITCODE -ne 0) {
            throw "'$cmd' Command failed to execute"
        }
    }

    function help {
        Write-Host "build.ps1 - $PROJ_NAME Build Wrapper"
        Write-Host "DESCRIPTION: Provides a pwsh core wrapper environment"
        Write-Host "   that makes the website for the codemelted.com domain"
        Write-Host "   and preps each of the module environments. Each"
        Write-Host "   codemelted module build.ps1 script maintains those"
        Write-Host "   environments."
        Write-Host "ACTIONS:"
        Write-Host "   --help  : Describes this scripts usage"
    }

    function make {
        Write-Host "make"
    }

    function prep {
        Write-Host "duh"
    }

    # -------------------------------------------------------------------------
    # Main Entry of script
    switch ($args[0]) {    
        "--help"  { help; break  }
        default  { 
            throw "Valid arguments: --help"
            break 
        }
    }    
}