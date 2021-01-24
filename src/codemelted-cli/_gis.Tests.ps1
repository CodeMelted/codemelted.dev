# . $PSScriptRoot\..\src\CodeMeltedScripts\ConvertTo-Unit\ConvertTo-Unit.ps1

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