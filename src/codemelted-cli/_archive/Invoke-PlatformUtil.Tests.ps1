. $PSScriptRoot\..\src\CodeMeltedScripts\Invoke-PlatformUtil\Invoke-PlatformUtil.ps1

Describe 'Invoke-PlatformUtil Invalid -Action' {
    It '-Action duh' {
        { Invoke-PlatformUtil -Action duh -Name "duh" } | Should -Throw
    }
}

Describe 'Invoke-PlatformUtil -Action clean' {
    It 'Throws because path is not rooted' {
        { Invoke-PlatformUtil -Action clean -Name _dist } | Should -Throw
    }

    It 'Now go through different successful combinations' {
        {
            Invoke-PlatformUtil -Action clean -Name $PSScriptRoot/_dist
            Invoke-PlatformUtil -Action clean -Name $PSScriptRoot/_dist
            Invoke-PlatformUtil -Action clean -Name $PSScriptRoot/_dist -Force
        } | Should -Not -Throw
        Remove-Item -Path ./_dist -Force -Recurse -ErrorAction SilentlyContinue
    }
}

Describe 'Invoke-PlatformUtil -Action execute' {
    It 'Successful Execution' {
        { Invoke-PlatformUtil -Action execute -Name "cmd /c dir" } | Should -Not -Throw
    }

    It 'Failed Execution' {
        { Invoke-PlatformUtil -Action execute -Name "cmd /c doug" } | Should -Throw
    }
}

Describe 'Invoke-PlatformUtil -Action exists' {
    It '-Name duh does not exist' {
        Invoke-PlatformUtil -Action exists -Name duh | Should -BeFalse
    }

    It '-Name pwsh does exist' {
        Invoke-PlatformUtil -Action exists -Name pwsh | Should -BeTrue
    }    
}

Describe 'Invoke-PlatformUtil -Action findstr' {
    It '-Name duh should be found' {
        $result = Invoke-PlatformUtil -Action findstr -Name duh
        $result.Length | Should -BeGreaterThan 0        
    }
}

Describe 'Invoke-PlatformUtil -Action info' {
    It 'We should get info' {
        $platformInfo = Invoke-PlatformUtil -Action info -Name local
        $platformInfo | Should -BeOfType PSObject
        $platformInfo.name.Length | Should -BeGreaterThan 0
        $platformInfo.version.Length | Should -BeGreaterThan 0
        $platformInfo.architecture.Length | Should -BeGreaterThan 0        
    }
}

Describe 'Invoke-Platform -Action log' {
    It 'Logging no file' {
        Invoke-PlatformUtil -Action log -Name ""
    }

    It 'Logging with file' {
        $filename = "logFile.txt"
        Remove-Item -Path $filename -Force -ErrorAction SilentlyContinue
        Invoke-PlatformUtil -Action log -Name "" -Filename $filename
        ($filename | Test-Path) | Should -BeTrue
        Remove-Item -Path $filename -Force -ErrorAction SilentlyContinue
        Invoke-PlatformUtil -Action log -Name "awesome" -Filename $filename
        ($filename | Test-Path) | Should -BeTrue
        Remove-Item -Path $filename -Force -ErrorAction SilentlyContinue
    }
}

Describe 'Invoke-PlatformUtil -Action monitor' {
    [string]$resultsFile = "./processResults.csv"

    It '-Name system will not throw' {
        { Invoke-PlatformUtil -Action monitor -Name system } | Should -Not -Throw
    }

    It '-Name system -Count 3 -CSVFile ./processResults will produce the file' {
        Invoke-PlatformUtil -Action monitor -Name system -Count 3 ./processResults
        ($resultsFile | Test-Path) | Should -BeTrue
        Remove-Item -Path $resultsFile        
    }

    It '-Name chrome' {
        Invoke-PlatformUtil -Action monitor -Name chrome -Count 1 -Filename ./processResults.csv
        Invoke-PlatformUtil -Action monitor -Name chrome -Count 1 -Filename ./processResults.csv
        Remove-Item -Path $resultsFile        
    }
}