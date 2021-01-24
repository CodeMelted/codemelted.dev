# =============================================================================
#
# LICENSE:
#    MIT / (c) 2021 Mark Shaffer. All Rights Reserved
# =============================================================================
# . $PSScriptRoot\..\src\CodeMeltedScripts\Test-Network\Test-Network.ps1

# -----------------------------------------------------------------------------
# gis domain use case unit tests

# function runTest {
#     $value = [double]$args[0]
#     $convert = $args[1]
#     $convertedValue = [double]$args[2]

#     $result = ConvertTo-Unit -Value $value -Convert $convert 
#     $result | Should -BeGreaterOrEqual $convertedValue
# }

# # TODO: Build out these conversions
# # Describe 'ConvertTo-Unit Area Conversions' {

# # }

# # Describe 'ConvertTo-Unit Speed Conversions' {

# # }

# Describe 'ConvertTo-Unit Temperature Conversions' {
#     It 'should convert from celsius to other units'  {
#         runTest -273.15 temp_c_to_f -459.67
#         runTest 0 temp_c_to_f 32
#         runTest 100 temp_c_to_f 212

#         runTest -273.15 temp_c_to_k 0
#         runTest 0 temp_c_to_k 273.15
#     }

#     It 'should convert from fahrenheit to other units' {
#         runTest -459.67 temp_f_to_c -273.16
#         runTest 32 temp_f_to_c 0
#         runTest 212 temp_f_to_c 100

#         runTest -459.67 temp_f_to_k -0.00001
#         runTest 32 temp_f_to_k 273.15
#         runTest 212 temp_f_to_k 212
#     }

#     It 'should convert from kelvin to other units' {
#         runTest 0 temp_k_to_c -273.15
#         runTest 273.15 temp_k_to_c 0
#         runTest 373.15 temp_k_to_c 100

#         runTest 0 temp_k_to_f -459.67
#         runTest 273.15 temp_k_to_f 32
#         runTest 373.15 temp_k_to_f 212
#     }
# }

# -----------------------------------------------------------------------------
# network domain use case unit tests

# Describe 'Test-Network Invalid -Action' {
#     It '-Action duh' {
#         { Test-Network -Action duh -Address "" } | Should -Throw
#     }

#     It '-Action info -Addresss ""' {
#         { Test-Network -Action info -Address "" } | Should -Throw
#     }    
# }

# Describe 'Test-Network -Action info' {
#     It '-Action info with invalid -Address specified' {
#         { Test-Network -Action info -Address "" } | Should -Throw
#     }

#     It '-Action info -Address *' {
#         $result = Test-Network -Action info -Address *
#         $result.Length | Should -BeGreaterThan 0
#     }
# }

# Describe 'Test-Network -Action monitor' {
#     It '-Address 127.0.0.1' {
#         { Test-Network -Action monitor -Address 127.0.0.1 } | Should -Not -Throw
#     }

#     It '-Address 127.0.0.1 -Port 5000' {
#         { Test-Network -Action monitor -Address 127.0.0.1 -Port 5000 } | Should -Not -Throw
#     }

#     It '-Address 127.0.0.1 -Port 5000 -Count 5' {
#         { Test-Network -Action monitor -Address 127.0.0.1 -Port 5000 -Count 2} | Should -Not -Throw
#     }
# }

# Describe 'Test-Network -Action ping' {
#     It '-Address 127.0.0.1' {
#         Test-Network -Action ping -Address 127.0.0.1 | Should -BeTrue
#     }

#     It '-Address 127.0.0.1 -Count 5' {
#         Test-Network -Action ping -Address 127.0.0.1 -Count 2 | Should -BeTrue
#     }
# }

# Describe 'Test-Network -Action trace' {
#     It '-Address 127.0.0.1' {
#         Test-Network -Action trace -Address 127.0.0.1 | Should -BeTrue
#     }
# }

# -----------------------------------------------------------------------------
# platform domain use case unit tests

# Describe 'Invoke-PlatformUtil Invalid -Action' {
#     It '-Action duh' {
#         { Invoke-PlatformUtil -Action duh -Name "duh" } | Should -Throw
#     }
# }

# Describe 'Invoke-PlatformUtil -Action clean' {
#     It 'Throws because path is not rooted' {
#         { Invoke-PlatformUtil -Action clean -Name _dist } | Should -Throw
#     }

#     It 'Now go through different successful combinations' {
#         {
#             Invoke-PlatformUtil -Action clean -Name $PSScriptRoot/_dist
#             Invoke-PlatformUtil -Action clean -Name $PSScriptRoot/_dist
#             Invoke-PlatformUtil -Action clean -Name $PSScriptRoot/_dist -Force
#         } | Should -Not -Throw
#         Remove-Item -Path ./_dist -Force -Recurse -ErrorAction SilentlyContinue
#     }
# }

# Describe 'Invoke-PlatformUtil -Action execute' {
#     It 'Successful Execution' {
#         { Invoke-PlatformUtil -Action execute -Name "cmd /c dir" } | Should -Not -Throw
#     }

#     It 'Failed Execution' {
#         { Invoke-PlatformUtil -Action execute -Name "cmd /c doug" } | Should -Throw
#     }
# }

# Describe 'Invoke-PlatformUtil -Action exists' {
#     It '-Name duh does not exist' {
#         Invoke-PlatformUtil -Action exists -Name duh | Should -BeFalse
#     }

#     It '-Name pwsh does exist' {
#         Invoke-PlatformUtil -Action exists -Name pwsh | Should -BeTrue
#     }    
# }

# Describe 'Invoke-PlatformUtil -Action findstr' {
#     It '-Name duh should be found' {
#         $result = Invoke-PlatformUtil -Action findstr -Name duh
#         $result.Length | Should -BeGreaterThan 0        
#     }
# }

# Describe 'Invoke-PlatformUtil -Action info' {
#     It 'We should get info' {
#         $platformInfo = Invoke-PlatformUtil -Action info -Name local
#         $platformInfo | Should -BeOfType PSObject
#         $platformInfo.name.Length | Should -BeGreaterThan 0
#         $platformInfo.version.Length | Should -BeGreaterThan 0
#         $platformInfo.architecture.Length | Should -BeGreaterThan 0        
#     }
# }

# Describe 'Invoke-Platform -Action log' {
#     It 'Logging no file' {
#         Invoke-PlatformUtil -Action log -Name ""
#     }

#     It 'Logging with file' {
#         $filename = "logFile.txt"
#         Remove-Item -Path $filename -Force -ErrorAction SilentlyContinue
#         Invoke-PlatformUtil -Action log -Name "" -Filename $filename
#         ($filename | Test-Path) | Should -BeTrue
#         Remove-Item -Path $filename -Force -ErrorAction SilentlyContinue
#         Invoke-PlatformUtil -Action log -Name "awesome" -Filename $filename
#         ($filename | Test-Path) | Should -BeTrue
#         Remove-Item -Path $filename -Force -ErrorAction SilentlyContinue
#     }
# }

# Describe 'Invoke-PlatformUtil -Action monitor' {
#     [string]$resultsFile = "./processResults.csv"

#     It '-Name system will not throw' {
#         { Invoke-PlatformUtil -Action monitor -Name system } | Should -Not -Throw
#     }

#     It '-Name system -Count 3 -CSVFile ./processResults will produce the file' {
#         Invoke-PlatformUtil -Action monitor -Name system -Count 3 ./processResults
#         ($resultsFile | Test-Path) | Should -BeTrue
#         Remove-Item -Path $resultsFile        
#     }

#     It '-Name chrome' {
#         Invoke-PlatformUtil -Action monitor -Name chrome -Count 1 -Filename ./processResults.csv
#         Invoke-PlatformUtil -Action monitor -Name chrome -Count 1 -Filename ./processResults.csv
#         Remove-Item -Path $resultsFile        
#     }
# }