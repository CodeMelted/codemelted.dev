#!/bin/bash
# =============================================================================
# Launch point from a Linux / Mac bash terminal to call into the 
# codemelted-pwsh PowerShell core module.
# LICENSE:
#    MIT / (c) 2021 Mark Shaffer. All Rights Reserved.
# =============================================================================
if which pwsh > /dev/null; then
    pwsh -Command codemelted-pwsh "$@"
else
    echo "ERROR: PowerShell Core not detected on the system."
    echo "       Goto https://github.com/PowerShell/PowerShell to install."
fi