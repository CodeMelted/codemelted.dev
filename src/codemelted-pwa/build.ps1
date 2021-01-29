#!/usr/bin/pwsh
# -----------------------------------------------------------------------------
# ABOUT:   Provides the build script for this project.  An exception is thrown
#          if something fails when executing this script.
# LICENSE: MIT / (c) 2020 Mark Shaffer
# -----------------------------------------------------------------------------
function build {
    # -------------------------------------------------------------------------
    # Constants:
    [string]$PROJ_NAME = "codemelted-pwa"
    [string]$SCRIPT_PATH = $PSScriptRoot
    [string]$DIST_PATH = $SCRIPT_PATH + "/_dist"
    [string]$DOC_PATH = $DIST_PATH + "/docs"

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

    function clean {
        Write-Host "MESSAGE: Now cleaning $PROJ_NAME dist"
        if (($DIST_PATH | Test-Path)) {
            Remove-Item -Path $DIST_PATH -Force -Recurse -ErrorAction Stop
        }
        New-Item -Path $DIST_PATH -ItemType Directory
        Write-Host "MESSAGE: $PROJ_NAME dist cleaned"
    }   

    function docs {
        Write-Host "MESSAGE: Now generating $PROJ_NAME docs"
        run_cmd {npm run docs}
        $htmlFiles = Get-ChildItem -Path $DOC_PATH -Filter *.html
        foreach ($file in $htmlFiles) {
            [string]$newFile = $file.Directory.FullName + [IO.Path]::DirectorySeparatorChar + 
                "new" + $file.Name
            Write-Host $newFile
            foreach ($line in Get-Content $file) {
                if ($line.Contains("</body>")) {
                    "<script type='module' src='./scripts/doc-theme.js'></script>" | Out-File -FilePath $newFile -Append
                }
                $line | Out-File -FilePath $newFile -Append
            }
            Remove-Item -Path $file -Force
            Rename-Item -Path $newFile -NewName $file -Force
        }
        Copy-Item -Path $SCRIPT_PATH/doc-theme.js -Destination $DOC_PATH/scripts -Force
        Write-Host "MESSAGE: $PROJ_NAME docs generated"
    }

    function help {
        Write-Host "build.ps1 - $PROJ_NAME Build Wrapper"
        Write-Host "DESCRIPTION: Provides a pwsh core wrapper environment that"
        Write-Host "   can be integrated within a Jenkins automated "
        Write-Host "   environemnt.  Any failure with the script's actions will"
        Write-Host "   throw an exception to halt Jenkins execution.  The"
        Write-Host "   actions are npm run commands.  This script can be called"
        Write-Host "   from any location on the server as pathing is taken care"
        Write-Host "   during execution."
        Write-Host
        Write-Host "ACTIONS:"
        Write-Host "   --clean : Delete contents within the dist directory"
        Write-Host "   --docs  : Generates the jsdocs"
        Write-Host "   --make  : Generates the compiled library"
        Write-Host "   --help  : Describes this scripts usage"
        Write-Host "   --prep  : Ensures environment is setup and ready"
        Write-Host "   --test  : Runs the tests against the library"
    }

    function make {
        Write-Host "MESSAGE: Now building $PROJ_NAME"
        run_cmd {npm run make}
        Write-Host "MESSAGE: $PROJ_NAME built"
    }

    function prep {
        Write-Host "MESSAGE: Now checking $PROJ_NAME build environment"
        run_cmd {npm install}
        if ($IsWindows) {
            run_cmd {cmd /c where java}
        } else {
            run_cmd {bash /c which java}
        }
        Write-Host "MESSAGE: $PROJ_NAME build environment checks out"
    }

    function test {
        Write-Host "MESSAGE: Now testing $PROJ_NAME"
        $job = Start-Job { npx http-server }
        Start-Sleep -Seconds 2
        run_cmd {npm run test}
        Stop-Job -Job $job
        Write-Host "MESSAGE: $PROJ_NAME tested"
    }

    # -------------------------------------------------------------------------
    # Main Entry of script
    switch ($args[0]) {
        "--clean" { clean; break }        
        "--docs"  { docs; break  }
        "--help"  { help; break  }
        "--make"  { make; break  }
        "--prep"  { prep; break  }
        "--test"  { test; break  }
        default  { 
            throw "Valid arguments: --clean / -docs / --help / --make / --prep / --test"
            break 
        }
    }    
}
build $args[0]