#!/usr/bin/pwsh
# -----------------------------------------------------------------------------
# ABOUT:   Has the build steps for the codemelted-pwa.js library.
# LICENSE: MIT / (c) Mark Shaffer 2020. All Rights Reserved.
# -----------------------------------------------------------------------------
function build {
    function clean {
        Write-Host MESSAGE: Now performing a clean...
        Write-Host
        
        Remove-Item -Path ./_dist -Force -Recurse -ErrorAction SilentlyContinue
        New-Item -Path ./_dist -ItemType Directory
    
        Write-Host
        Write-Host MESSAGE: clean completed
    }

    function test {
        Write-Host MESSAGE: Now performing a test of the scripts...
        Write-Host
    
        # Validate the powershell module
        [string]$currentLocation = (Get-Location).ToString()
        Set-Location -Path ./test
        Invoke-Pester -Passthru -Strict -CodeCoverage @(
            "../src/CodeMeltedScripts/Build-PWA/Build-PWA.ps1",   
            "../src/CodeMeltedScripts/Invoke-PlatformUtil/Invoke-PlatformUtil.ps1", 
            "../src/CodeMeltedScripts/Test-Network/Test-Network.ps1" 
        ) | Out-Null
        if ($result.FailedCount -gt 0) {
            Set-Location -Path $currentLocation
            throw "Testing failed, failed tests occurred with pwsh module"
        }
    
        Set-Location -Path $currentLocation
        Write-Host
        Write-Host MESSAGE: Testing completed
    }

    function release {
        Write-Host MESSAGE: Now building the release package for GitHub
         
        # Form our output files for the release
        [string]$dist = $PSScriptRoot + "/_dist/"
        [string]$zipFile = $dist + "codemelted-scripts.zip"
        
        # Run test and if nothing fails, create the ZIP file
        test
        Copy-Item -Path $PSScriptRoot/src/CodeMeltedScripts -Recurse -Destination `
            $PSScriptRoot/_dist
        Compress-Archive -Path $dist/* -DestinationPath $zipFile
        Remove-Item $PSScriptRoot/_dist/CodeMeltedScripts -Recurse -Force
        
        Write-Host
        Write-Host MESSAGE: Release package ready for upload to GitHub
    }

    switch ($args[0]) {
        "-clean"   { clean; break                                            }
        "-test"    { test; break                                             }
        "-release" { release; break;                                         }
        default    {throw "Expected arguments are -clean / -test / -release" }
    }
}
build $args[0]
