<h1><img src="artifacts/icons8-computer-support-48.png" /> Cross Platform Services</h1>

MODULE | DROID | iOS | LINUX | MAC | WIN | PI | EMB
--- | --- | --- | --- | --- | --- | --- | ---
pwa | X | X | X | X | X | X |
pwsh | | | X | X | X | X | 


<h1>TABLE OF CONTENTS</h1>

- [INSTALLATION](#installation)
  - [Progressive Web App](#progressive-web-app)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
    - [GitHub Releases](#github-releases)
- [USAGE](#usage)
  - [Progressive Web App](#progressive-web-app-1)
- [DESIGN NOTES](#design-notes)
- [ATTRIBUTIONS](#attributions)
- [LICENSE](#license)

# INSTALLATION

## Progressive Web App

### Prerequisites

- [pwsh Core](https://github.com/PowerShell/PowerShell) - Scripting technology to execute node commands for the project.
- [NodeJS](https://nodejs.org/en/) - To initialize the project to gather supported items for building and testing
- [git](https://git-scm.com/) - Obviously for cloning and stuff.

### Steps

The following steps are the manual way from a terminal to clone and maintain this project.  These steps can also be incorporated into a automated build system (i.e. Jenkins) if necessary.

1. Open a terminal to the project location.  Prep the project.  This will setup the ability to run the node commands by downloading dev dependencies from NPM.

    ```
    $ cd [project location]/src/codemelted-pwa
    $ ./build --prep
    ```

2. Build the library from the terminal window. This will create a ```_dist``` folder with the compiled ```codemelted-pwa.js``` minified JS library, ```docs``` folder containing the jsdoc of the library, and ```eslint_results.html``` with a scan results of the eslint of the code files.

    ```
    $ ./build --clean
    $ ./build --docs
    $ ./build --make
    ```

3. Run mocha tests of the library from the terminal window. The ```test-results.json``` file can be found within the ```_dist``` folder.

    ```
    $ ./build --test
    ```

### GitHub Releases

Release | API | Description
--- | --- | ---
v0.5.3 | <a target="_blank" href="./releases/v0.5.3/docs/">View</a> <br /> <a target="_blank" href="https://github.com/CodeMelted/pwa-js-lib/releases/tag/codemelted-pwa-v0.5.3">Download</a> | Library has ES6 compiled format to support import statements.


```CDN Reference:```

```html
<script src="https://codemelted.com/pwa-js/releases/[version]/codemelted-pwa.js"></script>
```

```javascript
import "https://codemelted.com/pwa-js/releases/[version]/codemelted-pwa.js";
```

# USAGE

## Progressive Web App




# DESIGN NOTES

# ATTRIBUTIONS

- <a target="_blank" href="https://github.com/jgraph/drawio-desktop/releases">draw.io</a>: Utilized to create and maintain the design notes for each project.
- <a target="_blank" href="https://icons8.com/icons/set/computer-support">Computer Support icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

# LICENSE

MIT License

Copyright (c) 2020 Mark Shaffer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.