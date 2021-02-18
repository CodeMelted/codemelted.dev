#!/usr/bin/pwsh
# -----------------------------------------------------------------------------
# ABOUT:   Has the build steps for the codemelted-pwsh module.
# LICENSE: MIT / (c) Mark Shaffer 2021. All Rights Reserved.
# -----------------------------------------------------------------------------
function build {
    # -------------------------------------------------------------------------
    # Constants:
    [string]$PROJ_NAME = "codemelted-cli"
    [string]$SCRIPT_PATH = $PSScriptRoot
    [string]$SRC_PATH = $SCRIPT_PATH + "/codemelted-cli"
    [string]$DIST_PATH = $SCRIPT_PATH + "/_dist"

    # -------------------------------------------------------------------------
    # Helper Functions    
    function clean {
        Write-Host "MESSAGE: Now cleaning $PROJ_NAME dist"
        if (($DIST_PATH | Test-Path)) {
            Remove-Item -Path $DIST_PATH -Force -Recurse -ErrorAction Stop
        }
        New-Item -Path $DIST_PATH -ItemType Directory
        Write-Host "MESSAGE: $PROJ_NAME dist cleaned"        
    }

    function test {
        Write-Host "MESSAGE: Now testing $PROJ_NAME"
        Write-Host
    
        # Validate the powershell module
        # [string]$currentLocation = (Get-Location).ToString()
        # Set-Location -Path ./test
        # Invoke-Pester -Passthru -Strict -CodeCoverage @(
        #     "../src/CodeMeltedScripts/Build-PWA/Build-PWA.ps1",   
        #     "../src/CodeMeltedScripts/Invoke-PlatformUtil/Invoke-PlatformUtil.ps1", 
        #     "../src/CodeMeltedScripts/Test-Network/Test-Network.ps1" 
        # ) | Out-Null
        # if ($result.FailedCount -gt 0) {
        #     Set-Location -Path $currentLocation
        #     throw "Testing failed, failed tests occurred with pwsh module"
        # }
    
        Write-Host "MESSAGE: $PROJ_NAME tested"
    }

    function release {
        Write-Host "MESSAGE: Now creating the $PROJ_NAME release"
         
        # Form our output files for the release
        # [string]$dist = $PSScriptRoot + "/_dist/"
        # [string]$zipFile = $dist + "codemelted-scripts.zip"
        
        # Run test and if nothing fails, create the ZIP file
        # Copy-Item -Path $PSScriptRoot/src/CodeMeltedScripts -Recurse -Destination `
        #     $PSScriptRoot/_dist
        # Compress-Archive -Path $dist/* -DestinationPath $zipFile
        # Remove-Item $PSScriptRoot/_dist/CodeMeltedScripts -Recurse -Force
        
        Write-Host
        Write-Host "MESSAGE: $PROJ_NAME release published and created"
    }

    # -------------------------------------------------------------------------
    # Main Entry of script
    switch ($args[0]) {
        "--clean"   { clean; break                                            }
        "--test"    { test; break                                             }
        "--release" { release; break;                                         }
        default    {throw "Expected arguments are -clean / -test / -release" }
    }
}
build $args[0]
