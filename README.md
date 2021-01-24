<h1><img src="artifacts/icons8-computer-support-48.png" /> Cross Platform Services</h1>

<h1>TABLE OF CONTENTS</h1>

- [INSTALLATION](#installation)
  - [Progressive Web App](#progressive-web-app)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
    - [GitHub Releases](#github-releases)
- [USAGE](#usage)
  - [Progressive Web App](#progressive-web-app-1)
    - [async](#async)
    - [gis](#gis)
    - [logger](#logger)
      - [API Checking](#api-checking)
      - [Log Handling](#log-handling)
      - [Tracing Code Execution](#tracing-code-execution)
    - [network](#network)
      - [Fetch REST API Calls](#fetch-rest-api-calls)
      - [Protocols](#protocols)
      - [Send Beacons](#send-beacons)
    - [storage](#storage)
      - [Storage Methods](#storage-methods)
      - [Using Storage](#using-storage)
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

Once you access the ```codemelted-pwa.js``` library within your SPA you are able to access information about the library as follows:

```javascript
// Access information about the library release
console.log(CodeMelted.aboutLibrary);

// Outputs:
    TITLE:     CodeMelted - PWA
    VERSION:   v0.5.3 (Last Updated on 21 Jan 2021)
    WEBSITE:   https://codemelted.dev/pwa-lib
    LICENSE:   MIT / (c) 2020 Mark Shaffer. All Rights Reserved.
```

This should be accessible in any acknowledgement page for your SPA.  The remaining sub-sections document examples of the implemented domains as part of this library.

### async

This namespace implements the ```Do Asynchronous Processing``` domain use case of the overall [CodeMelted Projects](https://codemelted.com/xplat-svcs/).  The following are examples of how to utilize it within your SPA.

```javascript
// Get the current statistics
// It will identify the available cores on the 
// platform and currently running background 
// tasks
console.log(CodeMelted.async.stats());

// Register task to run on SPA shutdown
// You can add more than one task to execute
CodeMelted.async.addShutdownHook(() => {
  // Do some sort of cleanup on shutdown
});

// Do some processing either in the future or
// on the background.  Return to get result of
// the promise or throw Exception if some error
// occurs with the processing
async function someFunc() {
  try {
    // Result will equal 42 added in a background task
    let result = await CodeMelted.async.run(() => {
      // Only has access to Worker stuff.  No DOM
      return data + 2;
    }, "background", 40);

    // Result will run 500 milliseconds in the future on the main thread
    let result2 = await CodeMelted.async.run(() => {
      // Has full access to Browser APIs and whatever is in scope when this
      // is defined.
      return 40 + 2;
    }, "main", 500);
  } catch (err) {
    // handle the error
  }
}
```

### gis

This namespace implements the ```Do Geographic Information System Processing``` domain use case of the overall [CodeMelted Projects](https://codemelted.com/xplat-svcs/).  The following are examples of how to utilize it within your SPA.

```javascript
async function processOrientation() {
  try {
    // Go get the device orientations
    let startOrientation = await CodeMelted.gis.orientation();
    let endOrientation = await CodeMelted.gis.orientation();

    // Now go get the positions to use our formulas if the data was
    // not set
    let startPos = startOrientation.toPositionData();
    let endPos = endOrientation.toPositionData();

    // Here are the formulas you can use.  Remember these could already be set.
    let distanceMeters = CodeMelted.gis.calcDistanceMeters(startPos, endPos);
    let headingDegrees = CodeMelted.gis.calcHeadingDegrees(startPos, endPos);
    let speedMPS = CodeMelted.gis.calcSpeedMetersPerSecond(startPos, endPos);

    // Now convert between units (NOTE: Not all implemented yet)
    let speedMilesPerHour = CodeMelted.gis.convert("speed_mps_to_mph", speedMPS);

    // Do whatever other processing you want to do.
  } catch (err) {
    // Do something with error
  }
}

processOrientation();
```

### logger

This namespace implements the ```Do Logging Processing``` domain use case of the overall [CodeMelted Projects](https://codemelted.com/xplat-svcs/).  The following are examples of how to utilize it within your SPA.

#### API Checking

```javascript
// Checks some function definition to ensure it has two parameters
// Will throw SyntaxError if it does not meet expectations
CodeMelted.logger.checkParam("function", someFunc, 2);

// Checks that someVar is a number and will return the value
// as part of the check.  Throws SyntaxError if it does not meet
// expectations.
let value = CodeMelted.logger.checkParam("number", someVar);

// Allows you to throw a SyntaxError within your SPA if something you
// expect is violated.
CodeMelted.logger.throwSyntaxError("You violated my API");
```

#### Log Handling

```javascript
// Set the log level to what you want to appear in the console or to your log
// handler.  It defaults to ERROR
CodeMelted.logger.setLogLevel("trace");
CodeMelted.logger.setLogLevel("info");
CodeMelted.logger.setLogLevel("warn");
CodeMelted.logger.setLogLevel("error");

// The following clears the browser console or turns off logging all together
CodeMelted.logger.setLogLevel("clear");
CodeMelted.logger.setLogLevel("off");

// To access the current log log level
CodeMelted.logger.logLevel();

// If you want to bypass the browser console and handle logging differently
// say going to a cloud endpoint or something setup a log handler
function logHandler(level, msg) {
  // do whatever you want bypassing the codemelted-pwa library implementation
}
CodeMelted.logger.setLogHandler(logHandler);

// And to use the logger do the following:
CodeMelted.logger.log("error", "An error occurred");
```

#### Tracing Code Execution

```javascript
// If you wish to see the the item logged via the logger then set the 
// logging level to trace
CodeMelted.logger.setLogLevel("trace");

// Measures the execution time of logic you are interested in measuring.
let start = CodeMelted.logger.traceExecution("test");
// Some sort of processing to trace
let execTime = CodeMelted.logger.traceExecution("test", start);
```

### network

This namespace implements the ```Do Network Processing``` domain use case of the overall [CodeMelted Projects](https://codemelted.com/xplat-svcs/).  The following are examples of how to utilize it within your SPA.

#### Fetch REST API Calls

Performs a GET / POST / PUT / DELETE with a REST API hosted by a server.  The following items are how the fetch within this namespace perform.

- <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>
- <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Response">Response to Data Object Description</a>
- <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">HTTP Status Code</a>

```javascript
// Performs a get and the data is the data object to utilize
try {
  let data = await CodeMelted.network.fetch('/server');
} catch (err) {
  // Process the error
}
```

#### Protocols

The network namespace provides general methods to create a specific protocol to communicate with a server. These protocols follow a base protocol rules within the namespace wrapping the following Web APIs.

- <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API">Broadcast Channel API</a>
- <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events">Server Sent Events</a>
- <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket">Web Sockets</a>


```javascript
// Check if a protocol is supported
CodeMelted.network.isProtocolSupported("web_socket");

// Open a protocol and exchange some data
let dataRxHandler(state, data) => {
  // Do something with the ProtocolState and the data related with it
};
let id = CodeMelted.network.openProtocol("web_socket", "wss://server", dataRxHandler);
CodeMelted.network.writeToProtocol(id, "something");

// To close the protocols
CodeMelted.network.closeProtocol(id);
CodeMelted.network.closeAllProtocols();

// To get status of the protocol
let openProtocols = CodeMelted.network.protocolsOpen;
let state = CodeMelted.network.protocolState(id);

// Determine overall network availability
CodeMelted.network.isAvailable();
CodeMelted.network.onNetworkAvailable = (available) => {
  // Process the change in availability.
}
```

#### Send Beacons

Implementation of the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">sendBeacon</a> within the Network namespace.

```javascript
// Send data to an endpoint via beacon
CodeMelted.network.sendBeacon('/server', 'Its down');
```

### storage

This namespace implements the ```Do Storage Processing``` domain use case of the overall [CodeMelted Projects](https://codemelted.com/xplat-svcs/).  The following are examples of how to utilize it within your SPA.

#### Storage Methods

- ```cookie:``` Legacy method to store key/value pairs with the local environment where you can also set an expiration for the data. Browser settings could disable this or prevent the saving of the data
- ```local:``` Store key/value pairs with the local browser and when the SPA is closed, the data will be available for later retrieval
- ```session:``` Store key/value pairs with the local browser but the data is cleared once the SPA is closed

#### Using Storage

```javascript
// Set / update a value in storage
CodeMelted.storage.set("local", "key", "value");

// Access the value. Value not found will return null
let value = CodeMelted.storage.get("local", "key");

// Remove the item.  If it does not exist nothing will occur
CodeMelted.storage.remote("local", "key");

// Clear all items in the storage
CodeMelted.storage.clear("local");
```


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