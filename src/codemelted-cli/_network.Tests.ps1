# . $PSScriptRoot\..\src\CodeMeltedScripts\Test-Network\Test-Network.ps1

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