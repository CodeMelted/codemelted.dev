/**
 * @file Implements the codemelted-pwa module in accordance with the domain use
 *  cases as defined by the Cross Platform Services DESIGN NOTES.
 * @license MIT / (c) 2021 Mark Shaffer. All Rights Reserved
 */
const ABOUT_LIBRARY =
    `
    TITLE:     CodeMelted-PWA
    VERSION:   v0.5.3 (Last Updated on 23 Jan 2021)
    WEBSITE:   https://codemelted.com/xplat-svcs
    LICENSE:   MIT / (c) 2021 Mark Shaffer. All Rights Reserved.
    `;

// ----------------------------------------------------------------------------
// Types

/**
 * Converts from one unit to the other unit.
 * @enum {string}
 */
const Conversion = {
    /** Convert from square kilometers to square meters */
    area_km2_to_m2       : "area_km2_to_m2",
    /** Convert from square kilometers to square miles */
    area_km2_to_mi2      : "area_km2_to_mi2",
    /** Convert from square kilometers to square yards */
    area_km2_to_yd2      : "area_km2_to_yd2",
    /** Convert from square kilometers to square feet */
    area_km2_to_ft2      : "area_km2_to_ft2",
    /** Convert from square kilometers to square inches */
    area_km2_to_in2      : "area_km2_to_in2",
    /** Convert from square kilometers to hectares */
    area_km2_to_hectare  : "area_km2_to_hectare",
    /** Convert from square kilometers to acres */
    area_km2_to_acre     : "area_km2_to_acre",
    /** Convert from square meters to square kilometers */
    area_m2_to_km2       : "area_m2_to_km2",
    /** Convert from square meters to square miles */
    area_m2_to_mi2       : "area_m2_to_mi2",
    /** Convert from square meters to square yards */
    area_m2_to_yd2       : "area_m2_to_yd2",
    /** Convert from square meters to square feet */
    area_m2_to_ft2       : "area_m2_to_ft2",
    /** Convert from square meters to square inches */
    area_m2_to_in2       : "area_m2_to_in2",
    /** Convert from square meters to hectares */
    area_m2_to_hectare   : "area_m2_to_hectare",
    /** Convert from square meters to acres */
    area_m2_to_acre      : "area_m2_to_acre",
    /** Convert square miles to square kilometers */
    area_mi2_to_km2      : "area_mi2_to_km2",
    /** Convert square miles to square miles */
    area_mi2_to_m2       : "area_mi2_to_m2",
    /** Convert square miles to square yards */
    area_mi2_to_yd2      : "area_mi2_to_yd2",
    /** Convert square miles to square feet */
    area_mi2_to_ft2      : "area_mi2_to_ft2",
    /** Convert square miles to square inches */
    area_mi2_to_in2      : "area_mi2_to_in2",
    /** Convert square miles to hectares */
    area_mi2_to_hectare  : "area_mi2_to_hectare",
    /** Convert square miles to acres */
    area_mi2_to_acre     : "area_mi2_to_acre",
    /** Convert square yards to square kilometers */
    area_yd2_to_km2      : "area_yd2_to_km2",
    /** Convert square yards to square meters */
    area_yd2_to_m2       : "area_yd2_to_m2",
    /** Convert square yards to square miles */
    area_yd2_to_mi2      : "area_yd2_to_mi2",
    /** Convert square yards to square feet */
    area_yd2_to_ft2      : "area_yd2_to_ft2",
    /** Convert square yards to square inches */
    area_yd2_to_in2      : "area_yd2_to_in2",
    /** Convert square yards to hectares */
    area_yd2_to_hectare  : "area_yd2_to_hectare",
    /** Convert square yards to acres */
    area_yd2_to_acre     : "area_yd2_to_acre",
    /** Convert square feet to square kilometers */
    area_ft2_to_km2      : "area_ft2_to_km2",
    /** Convert square feet to square meters */
    area_ft2_to_m2       : "area_ft2_to_m2",
    /** Convert square feet to square miles */
    area_ft2_to_mi2      : "area_ft2_to_mi2",
    /** Convert square feet to square yards */
    area_ft2_to_yd2      : "area_ft2_to_yd2",
    /** Convert square feet to square inches */
    area_ft2_to_in2      : "area_ft2_to_in2",
    /** Convert square feet to hectares */
    area_ft2_to_hectare  : "area_ft2_to_hectare",
    /** Convert square feet to acres */
    area_ft2_to_acre     : "area_ft2_to_acre",
    /** Convert from square inches to square kilometers */
    area_in2_to_km2      : "area_in2_to_km2",
    /** Convert from square inches to square meters */
    area_in2_to_m2       : "area_in2_to_m2",
    /** Convert from square inches to square miles */
    area_in2_to_mi2      : "area_in2_to_mi2",
    /** Convert from square inches to square yards */
    area_in2_to_yd2      : "area_in2_to_yd2",
    /** Convert from square inches to square feet */
    area_in2_to_ft2      : "area_in2_to_ft2",
    /** Convert from square inches to hectares */
    area_in2_to_hectare  : "area_in2_to_hectare",
    /** Convert from square inches to acres */
    area_in2_to_acre     : "area_in2_to_acre",
    /** Converts from hectares to square kilometers */
    area_hectare_to_km2  : "area_hectare_to_km2",
    /** Converts from hectares to square meters */
    area_hectare_to_m2   : "area_hectare_to_m2",
    /** Converts from hectares to square miles */
    area_hectare_to_mi2  : "area_hectare_to_mi2",
    /** Converts from hectares to square yards */
    area_hectare_to_yd2  : "area_hectare_to_yd2",
    /** Converts from hectares to square feet */
    area_hectare_to_ft2  : "area_hectare_to_ft2",
    /** Converts from hectares to square inches */
    area_hectare_to_in2  : "area_hectare_to_in2",
    /** Converts from hectares to acres */
    area_hectare_to_acre : "area_hectare_to_acre",
    /** Converts from acres to square kilometers */
    area_acre_to_km2     : "area_acre_to_km2",
    /** Converts from acres to square meters */
    area_acre_to_m2      : "area_acre_to_m2",
    /** Converts from acres to square miles */
    area_acre_to_mi2     : "area_acre_to_mi2",
    /** Converts from acres to square yards */
    area_acre_to_yd2     : "area_acre_to_yd2",
    /** Converts from acres to square feet */
    area_acre_to_ft2     : "area_acre_to_ft2",
    /** Converts from acres to square inches */
    area_acre_to_in2     : "area_acre_to_in2",
    /** Converts from acres to hectares */
    area_acre_to_hectare : "area_acre_to_hectare",
    /** Converts from miles per hour to feet per second */
    speed_mph_to_fps     : "speed_mph_to_fps",
    /** Converts from miles per hour to meters per second */
    speed_mph_to_mps     : "speed_mph_to_mps",
    /** Converts from miles per hour to kilometers per hour */
    speed_mph_to_kph     : "speed_mph_to_kph",
    /** Converts from miles per hour to knots */
    speed_mph_to_knot    : "speed_mph_to_knot",
    /** Converts from feet per second to miles per hour */
    speed_fps_to_mph     : "speed_fps_to_mph",
    /** Converts from feet per second to meters per second */
    speed_fps_to_mps     : "speed_fps_to_mps",
    /** Converts from feet per second to kilometers per hour */
    speed_fps_to_kph     : "speed_fps_to_kph",
    /** Converts from feet per second to knots */
    speed_fps_to_knot    : "speed_fps_to_knot",
    /** Converts from meters per second to miles per hour */
    speed_mps_to_mph     : "speed_mps_to_mph",
    /** Converts from meters per second to feet per second */
    speed_mps_to_fps     : "speed_mps_to_fps",
    /** Converts from meters per second to kilometers per hour */
    speed_mps_to_kph     : "speed_mps_to_kph",
    /** Converts from meters per second to knots */
    speed_mps_to_knot    : "speed_mps_to_knot",
    /** Converts from kilometers per hour to miles per hour */
    speed_kph_to_mph     : "speed_kph_to_mph",
    /** Converts from kilometers per hour to feet per second */
    speed_kph_to_fps     : "speed_kph_to_fps",
    /** Converts from kilometers per hour to meters per second */
    speed_kph_to_mps     : "speed_kph_to_mps",
    /** Converts from kilometers per hour to knots */
    speed_kph_to_knot    : "speed_kph_to_knot",
    /** Converts from knots to miles per hour */
    speed_knot_to_mph    : "speed_knot_to_mph",
    /** Converts from knots to feet per second */
    speed_knot_to_fps    : "speed_knot_to_fps",
    /** Converts from knots to meters per second */
    speed_knot_to_mps    : "speed_knot_to_mps",
    /** Converts from knots to kilometers per hour */
    speed_knot_to_kph    : "speed_knot_to_kph",
    /** Converts from fahrenheit to celsius */
    temp_f_to_c          : "temp_f_to_c",
    /** Converts from fahrenheit to kelvin */
    temp_f_to_k          : "temp_f_to_k",
    /** Converts from celsius to fahrenheit */
    temp_c_to_f          : "temp_c_to_f",
    /** Converts from celsius to kelvin */
    temp_c_to_k          : "temp_c_to_k",
    /** Converts from kelvin to celsius */
    temp_k_to_c          : "temp_k_to_c",
    /** Converts from kelvin to fahrenheit */
    temp_k_to_f          : "temp_k_to_f"
};
Object.freeze(Conversion);

/**
 * Represents the available logging levels for the Logger namespace.  You will
 * pass the string value to the methods that accept this parameter.
 * @enum {string}
 */
const LogLevel = {
    /** For detailing calling sequences between functions and objects */
    TRACE: "trace",
    /** General information */
    INFO: "info",
    /** Warning of an impending problem condition */
    WARN: "warn",
    /** Houston we have a problem */
    ERROR: "error",
    /** Clears the browser console */
    CLEAR: "clear",
    /** Turns off the logger altogether */
    OFF: "off"
};
Object.freeze(LogLevel);

/**
 * The protocols this communication pipe supports for exchanging data
 * @enum {string}
 */
const Protocol = {
    /** 
     * Provides a broadcast channel to be opened to message between multiple
     * components within the same web origin.
     */
    BROADCAST: "broadcast",
    /**
     * A dedicated connection to receive sever sent events from a web 
     * server 
     * */
    SSE: "sse",
    /** 
     * Opens a bi-directional stream for reading / writing data with a web 
     * server 
     */
    WEB_SOCKET: "web_socket",
};
Object.freeze(Protocol);

/**
 * Represents the connection status of a protocol with its external service.
 * @enum {string}
 */
const ProtocolState = {
    /** Protocol successfully created and ready for use */
    CREATED: "created",
    /** Protocol has successfully received data */
    DATA_RX: "data_rx",
    /** Protocol failed to receive / write data */
    FAILED: "failed"
}
Object.freeze(ProtocolState);

/**
 * Represents the storage methods for the Storage namespace. You will
 * pass the string value to the methods that accept this parameter.
 * @readonly
 * @enum {string}
 */
const StorageMethod = {
    /** Accesses cookie storage from the browser */
    COOKIE: "cookie",
    /** Accesses local storage from the browser */
    LOCAL: "local",
    /** Accesses session storage from the browser */
    SESSION: "session"
}
Object.freeze(StorageMethod);

/**
 * Represents the type of tasks that can be scheduled.
 * @readonly
 * @enum {string}
 */
const Tasking = {
    /** Will schedule a Worker background task */
    BACKGROUND: "background",
    /** 
     * Will run a setTimeout() on the main browser thread wrapped in a 
     * Promise 
     */
    MAIN: "main",
};
Object.freeze(Tasking);

// ----------------------------------------------------------------------------
// Asynchronous Domain Use Case

/**
 * @typedef TaskingStats
 * @type {object}
 * @property {number} running The currently running BACKGROUND tasks.
 * @property {number} cores The available cores to run tasks.
 */

/**
 * This namespace provides the ability for scheduling tasks with a Promise of 
 * the results. The user can run them on the main thread or a background worker
 * A developer is also able to register shutdown tasks prior to a PWA exit. 
 */
class Async {
    /**
     * Constructor for the class.
     */
    constructor() {
        this._queue = {};
        this._queue[Tasking.BACKGROUND] = {};
        this._taskId = -1;
    }

    /**
     * Schedules a task to occur later on the main thread event loop.
     * @private
     * @param {function(): any} task The function() to execute. Throw an error
     *  to reject the promise. The promise is resolved at the end of the task.
     *  Return a value as part of the task for the resolve to have data for later
     *  processing.
     * @param {number} delay Optional number of milliseconds to wait before
     *  executing the task.
     * @returns {Promise} 
     */
    _runMain(task, delay) {
        // Build our promise for running the task on the main thread
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(task());
                } catch (err) {
                    reject(err);
                }
            }, delay);
        });

        // Store and return the promise
        return promise;
    }

    /**
     * Runs a task on a background worker.  NOTE: task function must only 
     * utilize browser APIs available to the worker context or it will throw an 
     * error.
     * @private 
     * @param {function(): any} task A function() that will run in the
     *  background worker.  A variable 'data' will be available representing the
     *  data that is sent via the parameter by the same name.  Have the task return
     *  the results to later resolve the promise.  Throw an error if any errors
     *  occur during the background processing.  This will reject the promise.
     *  Any unhandled errors that may occur will also result in a promise reject.
     * @param {any} data Valid data to pass along to the background worker for
     *  processing if necessary.
     * @returns {Promise} 
     */
    _runBackground(task, data) {
        // Gather information to generate and run the promise
        let taskId = this._taskId++;
        let taskCode = 
            `self.onmessage = function(e) {
                let data = e.data;
                let result = (${task})();
                postMessage(result);
            };`
        let taskUrl = URL.createObjectURL(new Blob([taskCode],
            { type:'text/javascript' }));

        // Build the Promise to run in the background
        let promise = new Promise((resolve, reject) => {
            // Gather our required prebuilt data
            let _id = taskId;
            let _url = taskUrl;

            // Build a function to run the promise but if there are too many
            // scheduled workers, will try again until one is available.
            let _run = () => {
                try {
                    // We were successful in getting our worker, go run it passing
                    // our data to the background
                    let w = new Worker(_url);
                    if (w !== null) {
                        w.onmessage = (e) => {
                            resolve(e.data);
                            w.terminate();
                            delete this._queue[Tasking.BACKGROUND][_id];
                        };
                        w.onerror = (e) => {
                            w.terminate();
                            throw e;
                        };

                        // Send our data to execute the worker.
                        w.postMessage(data);
                    } else {
                        // Workers were not available, try again later.
                        setTimeout(_run, 1000);
                    }
                } catch (err) {
                    reject(err);
                    delete this._queue[Tasking.BACKGROUND][_id];
                }
            }

            // Kickoff our processing of the background worker.
            _run();
        });
        
        // Store and return the promise
        this._queue[Tasking.BACKGROUND][taskId] = promise;
        return promise;
    }

    /**
     * Adds a task to execute before the closing of a web application. You 
     * can register more than one task.
     * @param {function(): void} task A function that represents the task to
     *  run.
     */
    addShutdownHook(task) {
        INSTANCES['logger'].checkParam("function", task, 0);
        window.addEventListener("beforeunload", task);
    }

    /**
     * Schedules a task to run with a promise of a result.
     * @param {function(): any} task See the task descriptions for
     *  _runBackground(), _runMain()
     * @param {Tasking} type A string representing one of the Tasking enum 
     *  values.
     * @param {any} data Represents either a number for MAIN tasks as to when
     *  to schedule a task milliseconds into the future or actual data to be 
     *  sent to a Worker for a BACKGROUND task.
     * @return {Promise} A promise for the task to execute
     */
    run(task, type, data = undefined) {
        INSTANCES['logger'].checkParam("function", task, 0);
        let rtnPromise = undefined;
        switch (type) {
            case Tasking.BACKGROUND:
                rtnPromise = this._runBackground(task, data);
                break;
            case Tasking.MAIN:
                INSTANCES['logger'].checkParam("number", data);                
                rtnPromise = this._runMain(task, data < 0 ? 0 : data);
                break;
            default:
                INSTANCES['logger'].throwSyntaxError("Invalid Tasking received.");
                break;
        }

        return rtnPromise;
    }

    /**
     * Get statistics for the currently running background tasks as compared
     * to available hardware cores.
     * @return {TaskingStats}
     */
    stats() {
        return {
            running: Object.keys(this._queue[Tasking.BACKGROUND]).length,
            cores: window.navigator.hardwareConcurrency            
        };
    }    
}

// ----------------------------------------------------------------------------
// GIS Domain Use Case

/**
 * Represents the orientation of the SPA on a device.
 * @typedef OrientationData
 * @type {object}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTimeStamp
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
 * @property {DeviceMotionEvent} motion See DeviceMotionEvent link for details
 *  or null if no information has been gathered for the device
 * @property {DeviceOrientationEvent} orientation See DeviceOrientationEvent 
 *  link for details.
 * @property {DOMTimeStamp} timestamp See DomTimeStamp link for details  
 *  or null if no information has been gathered for the device
 * @property {GeolocationCoordinates} coords See GeolocationPosition link for more details
 *  or null if no information has been gathered for the device
 * @property {function(): PositionData} toPositionData Extracts a PositionData object from this
 *  data object or null if no information has been gathered for the device
 */

/**
 * This namespace provides the ability to get the current device orientation,
 * formulas for conversion, and you will need to supply permission to access
 * GPS information.
 */
class GIS {
    /**
     * Constructor for the class.
     */    
    constructor() {
        // The access to the geolocation
        this._geolocation = "geolocation" in navigator ? 
            navigator.geolocation : undefined;        

        // Setup our capture of the device's orientation
        this._orientation = {
            motion: null,
            orientation: null,
            timestamp: null,
            coords: null,
            toPositionData: function() {
                let me = this;
                return {
                    timestamp: me.timestamp,
                    latitude: me.coords.latitude,
                    longitude: me.coords.longitude
                }
            }
        };            
        window.addEventListener("devicemotion", (ev) => this._orientation.motion = ev);
        window.addEventListener("deviceorientation", (ev) => this._orientation.orientation = ev);

        // Build the dictionary with the formulas
        this._conversionMap = {  }
        this._conversionMap[Conversion.area_km2_to_m2]       = (v) => v * 1e+6;
        this._conversionMap[Conversion.area_km2_to_mi2]      = (v) => v / 2.59;
        this._conversionMap[Conversion.area_km2_to_yd2]      = (v) => v * 1.196e+6;
        this._conversionMap[Conversion.area_km2_to_ft2]      = (v) => v * 1.076e+7;
        this._conversionMap[Conversion.area_km2_to_in2]      = (v) => v * 1.55e+9;
        this._conversionMap[Conversion.area_km2_to_hectare]  = (v) => v * 100;
        this._conversionMap[Conversion.area_km2_to_acre]     = (v) => v * 247.105;
        this._conversionMap[Conversion.area_m2_to_km2]       = (v) => v / 1e+6;
        this._conversionMap[Conversion.area_m2_to_mi2]       = (v) => v / 2.59e+6;
        this._conversionMap[Conversion.area_m2_to_yd2]       = (v) => v * 1.196;
        this._conversionMap[Conversion.area_m2_to_ft2]       = (v) => v * 10.764;
        this._conversionMap[Conversion.area_m2_to_in2]       = (v) => v * 1550.003;
        this._conversionMap[Conversion.area_m2_to_hectare]   = (v) => v / 10000;
        this._conversionMap[Conversion.area_m2_to_acre]      = (v) => v / 4046.856;
        this._conversionMap[Conversion.area_mi2_to_km2]      = (v) => v * 2.59;
        this._conversionMap[Conversion.area_mi2_to_m2]       = (v) => v * 2.59e+6;
        this._conversionMap[Conversion.area_mi2_to_yd2]      = (v) => v * 3.098e+6;
        this._conversionMap[Conversion.area_mi2_to_ft2]      = (v) => v * 2.788e+7;
        this._conversionMap[Conversion.area_mi2_to_in2]      = (v) => v * 4.014e+9;
        this._conversionMap[Conversion.area_mi2_to_hectare]  = (v) => v * 258.999;
        this._conversionMap[Conversion.area_mi2_to_acre]     = (v) => v * 640;
        this._conversionMap[Conversion.area_yd2_to_km2]      = (v) => v / 1.196e+6;
        this._conversionMap[Conversion.area_yd2_to_m2]       = (v) => v / 1.196;
        this._conversionMap[Conversion.area_yd2_to_mi2]      = (v) => v / 3.098e+6;
        this._conversionMap[Conversion.area_yd2_to_ft2]      = (v) => v * 9;
        this._conversionMap[Conversion.area_yd2_to_in2]      = (v) => v * 1296;
        this._conversionMap[Conversion.area_yd2_to_hectare]  = (v) => v / 11959.9;
        this._conversionMap[Conversion.area_yd2_to_acre]     = (v) => v / 4840;
        this._conversionMap[Conversion.area_ft2_to_km2]      = (v) => v / 1.076e+7;
        this._conversionMap[Conversion.area_ft2_to_m2]       = (v) => v / 10.764;
        this._conversionMap[Conversion.area_ft2_to_mi2]      = (v) => v / 2.788e+7;
        this._conversionMap[Conversion.area_ft2_to_yd2]      = (v) => v / 9;
        this._conversionMap[Conversion.area_ft2_to_in2]      = (v) => v * 144;
        this._conversionMap[Conversion.area_ft2_to_hectare]  = (v) => v / 107639.104;
        this._conversionMap[Conversion.area_ft2_to_acre]     = (v) => v / 43560;
        this._conversionMap[Conversion.area_in2_to_km2]      = (v) => v / 1.55e+9;
        this._conversionMap[Conversion.area_in2_to_m2]       = (v) => v / 1550.003;
        this._conversionMap[Conversion.area_in2_to_mi2]      = (v) => v / 4.014e+9;
        this._conversionMap[Conversion.area_in2_to_yd2]      = (v) => v / 1296;
        this._conversionMap[Conversion.area_in2_to_ft2]      = (v) => v / 144;
        this._conversionMap[Conversion.area_in2_to_hectare]  = (v) => v / 1.55e+7;
        this._conversionMap[Conversion.area_in2_to_acre]     = (v) => v / 6.273e+6;
        this._conversionMap[Conversion.area_hectare_to_km2]  = (v) => v / 100;
        this._conversionMap[Conversion.area_hectare_to_m2]   = (v) => v * 10000;
        this._conversionMap[Conversion.area_hectare_to_mi2]  = (v) => v / 258.999;
        this._conversionMap[Conversion.area_hectare_to_yd2]  = (v) => v * 11959.9;
        this._conversionMap[Conversion.area_hectare_to_ft2]  = (v) => v * 107639.104;
        this._conversionMap[Conversion.area_hectare_to_in2]  = (v) => v * 1.55e+7;
        this._conversionMap[Conversion.area_hectare_to_acre] = (v) => v * 2.471;
        this._conversionMap[Conversion.area_acre_to_km2]     = (v) => v / 247.105;
        this._conversionMap[Conversion.area_acre_to_m2]      = (v) => v * 4046.856;
        this._conversionMap[Conversion.area_acre_to_mi2]     = (v) => v / 640;
        this._conversionMap[Conversion.area_acre_to_yd2]     = (v) => v * 4840;
        this._conversionMap[Conversion.area_acre_to_ft2]     = (v) => v * 43560;
        this._conversionMap[Conversion.area_acre_to_in2]     = (v) => v * 6.273e+6;
        this._conversionMap[Conversion.area_acre_to_hectare] = (v) => v / 2.471;
        this._conversionMap[Conversion.speed_mph_to_fps]     = (v) => v * 1.467;
        this._conversionMap[Conversion.speed_mph_to_mps]     = (v) => v / 2.237;
        this._conversionMap[Conversion.speed_mph_to_kph]     = (v) => v * 1.609;
        this._conversionMap[Conversion.speed_mph_to_knot]    = (v) => v / 1.151;
        this._conversionMap[Conversion.speed_fps_to_mph]     = (v) => v / 1.467;
        this._conversionMap[Conversion.speed_fps_to_mps]     = (v) => v / 3.281;
        this._conversionMap[Conversion.speed_fps_to_kph]     = (v) => v * 1.097;
        this._conversionMap[Conversion.speed_fps_to_knot]    = (v) => v / 1.688;
        this._conversionMap[Conversion.speed_mps_to_mph]     = (v) => v * 2.237;
        this._conversionMap[Conversion.speed_mps_to_fps]     = (v) => v * 3.281;
        this._conversionMap[Conversion.speed_mps_to_kph]     = (v) => v * 3.600;
        this._conversionMap[Conversion.speed_mps_to_knot]    = (v) => v * 1.944;
        this._conversionMap[Conversion.speed_kph_to_mph]     = (v) => v / 1.609;
        this._conversionMap[Conversion.speed_kph_to_fps]     = (v) => v / 1.097;
        this._conversionMap[Conversion.speed_kph_to_mps]     = (v) => v / 3.600;
        this._conversionMap[Conversion.speed_kph_to_knot]    = (v) => v / 1.852;
        this._conversionMap[Conversion.speed_knot_to_mph]    = (v) => v * 1.151;
        this._conversionMap[Conversion.speed_knot_to_fps]    = (v) => v * 1.688;
        this._conversionMap[Conversion.speed_knot_to_mps]    = (v) => v / 1.944;
        this._conversionMap[Conversion.speed_knot_to_kph]    = (v) => v * 1.852;
        this._conversionMap[Conversion.temp_f_to_c]          = (v) => (v - 32) * (5/9);
        this._conversionMap[Conversion.temp_f_to_k]          = (v) => (v - 32) * (5/9) + 273.15;
        this._conversionMap[Conversion.temp_c_to_f]          = (v) => (v * (9/5)) + 32;
        this._conversionMap[Conversion.temp_c_to_k]          = (v) => v + 273.15;
        this._conversionMap[Conversion.temp_k_to_c]          = (v) => v - 273.15;
        this._conversionMap[Conversion.temp_k_to_f]          = (v) => (v - 273.15) * (9/5) + 32;            
    }

    /**
     * Ensures we have a valid latitude and longitude items in order before 
     * processing the data.
     * @private
     * @param {PositionData} data The data to validate.
     * @param {boolean} checkTime True to check the time parameter of the 
     *  PositionData object.
     */
    _validatePositionData(data, checkTime = false) {
        INSTANCES['logger'].checkParam("number", data.latitude);
        INSTANCES['logger'].checkParam("number", data.longitude);
        INSTANCES['logger'].checkParam("number", data.latitude);
        INSTANCES['logger'].checkParam("number", data.longitude);
        if (checkTime) {
            INSTANCES['logger'].checkParam("number", data.timestamp);
        }
    }

    /**
     * Calculates the distance between to geodetic points. <br /> <br />
     * NOTE: minimum of latitude and longitude are required for the 
     * PositionData objects
     * @param {PositionData} startPos The starting position
     * @param {PositionData} endPos The ending position
     * @returns {number} The distance in meters
     */
    calcDistanceMeters(startPos, endPos) {
        // Check our parameters:
        this._validatePositionData(startPos);
        this._validatePositionData(endPos);

        // Convert degrees to radians
        let lat1 = startPos.latitude * Math.PI / 180.0;
        let lon1 = startPos.longitude * Math.PI / 180.0;
    
        let lat2 = endPos.latitude * Math.PI / 180.0;
        let lon2 = endPos.longitude * Math.PI / 180.0;
    
        // radius of earth in metres
        let r = 6378100;
    
        // P
        let rho1 = r * Math.cos(lat1);
        let z1 = r * Math.sin(lat1);
        let x1 = rho1 * Math.cos(lon1);
        let y1 = rho1 * Math.sin(lon1);
    
        // Q
        let rho2 = r * Math.cos(lat2);
        let z2 = r * Math.sin(lat2);
        let x2 = rho2 * Math.cos(lon2);
        let y2 = rho2 * Math.sin(lon2);
    
        // Dot product
        let dot = (x1 * x2 + y1 * y2 + z1 * z2);
        let cos_theta = dot / (r * r);
        let theta = Math.acos(cos_theta);
    
        // Distance in Meters
        return r * theta;       
    }

    /**
     * Calculates the heading based on two geodetic points. <br /> <br />
     * NOTE: minimum of latitude and longitude are required for the 
     * PositionData objects
     * @param {PositionData} startPos The starting position
     * @param {PositionData} endPos The ending position
     * @returns {number} The heading in degrees, indicates how far off from heading 
     *  due north.  Meaning 0 is true north. NaN is returned if the points are
     *  the same geodetic latitude and longitude
     */
    calcHeadingDegrees(startPos, endPos) {
        // Check our parameters:
        this._validatePositionData(startPos);
        this._validatePositionData(endPos);

        // Get the initial data from our variables:
        let lat1 = startPos.latitude * (Math.PI / 180);
        let lon1 = startPos.longitude * (Math.PI / 180);
        let lat2 = endPos.latitude * (Math.PI / 180);
        let lon2 = endPos.longitude * (Math.PI / 180);

        // Set up our calculations
        let y = Math.sin(lon2 - lon1) * Math.cos(lat2);
        let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * 
            Math.cos(lat2) * Math.cos(lon2 - lon1);
        let rtnval = Math.atan2(y, x) * (180 / Math.PI);
        rtnval = (rtnval + 360) % 360;

        return rtnval;
    }    

    /**
     * Calculates the speed between two geodetic points.
     * @param {PositionData} startPos The starting position
     * @param {PositionData} endPos The ending position
     * @returns {number} The speed in meters per second
     */
    calcSpeedMetersPerSecond(startPos, endPos) {
        // Check our parameters:
        this._validatePositionData(startPos, true);
        this._validatePositionData(endPos, true);

        // Now go perform our calculation:
        let distMeters = GIS.calcDistanceMeters(startPos, endPos);
        let time_s = (endPos.timestamp - startPos.timestamp) / 1000.0;
        return distMeters / time_s;
    }    

    /**
     * Converts from one unit to the other
     * @param {number} v The unit to convert
     * @param {Conversion} type Enumeration identifying what conversion to 
     *  perform
     * @returns {number} The converted unit
     */    
    convert(v, type) {
        INSTANCES['logger'].checkParam("number", v);
        let converter = this._conversionMap[type];
        if (converter === undefined) {
            INSTANCES['logger'].throwSyntaxError(
                "[type] specified was not a Conversion value");
        }
        return converter(v);
    }

    /**
     * Accesses the current orientation of the device
     * @returns {Promise<OrientationData>} resolves to the OrientationData or a rejection with a
     *  reason it could not carry out the promise.
     */
    orientation() {
        return new Promise((resolve, reject) => {
            if (this._geolocation) {
                this._geolocation.getCurrentPosition((pos) => {
                    this._orientation.position = pos.coords;
                    this._orientation.timestamp = pos.timestamp;
                    resolve(Object.assign({}, this._orientation));
                }, (err) => {
                    reject(err);
                });
            } else {
                reject("navigator.geolocation is not supported");
            }
        });
    }
}

// ----------------------------------------------------------------------------
// Logger Domain Use Case

/**
 * This namespace provides a logging facility to report, troubleshoot, and 
 * debug a web application.  Results are logged either to the browser console
 * or via a log handler. This namespace also provides the ability for API
 * checking throughout the library throwing a SyntaxError in the event of a 
 * library violation or invalid parameter types.
 */
class Logger {
    /**
     * Constructor for the class.
     */
    constructor() {
        this._logLevel = LogLevel.ERROR;
        this._logHandler = undefined;
    }

    /**
     * Gets the current index of a specified log level. 
     * @private
     * @param {LogLevel} level String value representing a LogLevel enumeration
     * @returns {number} Index position of the log level.
     */
    _logLevelIndex(level) {
        switch(level.toLowerCase()) {
            case LogLevel.TRACE: return 0;
            case LogLevel.INFO:  return 1;
            case LogLevel.WARN:  return 2;
            case LogLevel.ERROR: return 3;
            case LogLevel.CLEAR: return 4;
            case LogLevel.OFF:   return 5;
        }
        throw new SyntaxError("[level] was not a valid LogLevel");
    }

    /**
     * The current Logger log level to set or get.
     * @type {LogLevel}
     */
    set logLevel(level) {
        this._logLevelIndex(level);
        this._logLevel = level;
    }

    get logLevel() {
        return this._logLevel;
    }

    /**
     * Sets a handler 'function(level, any): void' to bypass logging to the 
     * browser's console.  Set to undefined to clear it.
     * @type {function}
     */
    set logHandler(handler) {
        if (handler !== null && handler !== undefined) {
            this.checkParam("function", handler, 2);
            this._logHandler = handler;
        } else {
            this._logHandler = undefined;
        }
    }

    /**
     * Performs a check to ensure the parameter is what is expected.
     * @param {string} type string identifying the expected type
     * @param {any} v The parameter to be checked
     * @param {number} count Optional if checking a function for an
     *  expected number of parameters
     * @return {any} v specified paramter
     * @throws {SyntaxError} if this API is violated or a parameter is not of an
     *  expected type.
     */
    checkParam(type, v, count = undefined) {
        // Validate our expected parameters and perform our check
        if (typeof type !== "string") {
            this.throwSyntaxError("type parameter is expected as a string");
        } else if (typeof v !== type) {
            this.throwSyntaxError("v parameter is not of type " + type);
        }

        // Okay now see if we are checking against a function
        if (count !== undefined) {
            if (typeof v !== "function") {
                this.throwSyntaxError(
                    "v was not a function to check against count");
            } else if (typeof count !== "number") {
                this.throwSyntaxError(
                    "count was not a number to check against v");
            }

            if (v.length !== count) {
                this.throwSyntaxError("v function did not have expected " + 
                    count + " parameters");
            }
        }

        return v;  
    }

    /**
     * Logs an entry with this namespace either to the browser's console
     * or via a set handler to report via other means.  
     * @param {LogLevel} level The log level of the message.
     * @param {any} msg A message to associate with log entry.
     */
    log(level, msg) {
        let currentLogLevel = this._logLevelIndex(this._logLevel);
        let levelToLog = this._logLevelIndex(level);
        if (level === LogLevel.CLEAR) {
            console.clear();
        } else if (levelToLog >= currentLogLevel) {
            if (this._logHandler !== undefined) {
                this._logHandler(level, msg);
            } else {
                switch (level) {
                    case LogLevel.TRACE: console.trace(msg); break;
                    case LogLevel.INFO:  console.info(msg); break;
                    case LogLevel.WARN:  console.warn(msg); break;
                    case LogLevel.ERROR: console.error(msg); break;
                }
            }
        }
    }

    /**
     * Logs a SyntaxError signaling a library violation and then throws that
     * error.
     * @param {string} msg The message of the violation
     * @throws {SyntaxError} Representing the library violation.
     */    
    throwSyntaxError(msg) {
        let err = new SyntaxError(msg);
        this.log(LogLevel.ERROR, err);
        throw err;
    }

    /**
     * Provides the ability to trace a methods execution time.  Will only log
     * within a TRACE configuration   
     * @param {string} label Label to associate with the logged TRACE message
     * @param {number} startMS A previous execution of this method capturing
     *  the timestamp of the start of execution
     * @returns {number} Result of start capture or when the final execution
     *  time if startMS was provided
     */
    traceExecution(label, startMS = -1) {
        this.checkParam("string", label);
        this.checkParam("number", startMS);
        let rtnval = performance.now();
        let execTime = rtnval - startMS;
        if (startMS !== -1) {
            this.log(LogLevel.TRACE, 
                `${label} execution time ${execTime} milliseconds`);
        }
 
        return rtnval;
    }
}

// ----------------------------------------------------------------------------
// Network Domain Use Case

/**
 * Base class establishing the rules for the protocols within this namespace
 * to work with the public API.
 * @private
 */
class IProtocol {
    /**
     * Constructor for the base class.  Sets up helper methods for the child
     * classes.
     * @param {Protocol} type Identifies the type of protocol
     * @param {object} config The configuration specific for the protocol 
     * @param {function(ProtocolState, object): void} dataRxHandler A 
     *  function(ProtocolState, object) definition for receiving data from a
     *  created protocol.
     */    
    constructor(type, config, dataRxHandler) {
        this._type = type;
        this._config = config;
        this._state = ProtocolState.CREATED;
        this._dataRxHandler = dataRxHandler;        
    }

    /**
     * Gets the current ConnState of the protocol.
     * @returns {ProtocolState}
     */
    state() { return this._state; }    

    /**
     * Identifies the Protocol.
     * @returns {Protocol}
     */
    type() { return this._type; }

    /**
     * Sends data to the connected service.
     * @param {any} data Object specific to the protocol.
     */
    // eslint-disable-next-line no-unused-vars
    write(data) { }

    /**
     * Used to close the protocol and clear the dataRxHandler.
     */    
    close() {
        this._dataRxHandler = undefined;
    }

    /**
     * Helper method for implementing protocols to transition the protocol
     * state and pass on the received data.
     * @param {ProtocolState} state The current state of the protocol. 
     * @param {object} data The data that was received.  Either a reason for
     * an error or the received data.
     */
    handleRxData(state, data) {
        this._state = state;
        this._dataRxHandler(state, data);
        if (state === ProtocolState.FAILED) {
            INSTANCES['logger'].log("error", data);
        } else if (state === ProtocolState.CREATED) {
            INSTANCES['logger'].log("info", data);
        }
    }
}

/**
 * Allows simple communication between browsing contexts.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
 * @augments IProtocol
 * @private
 */
class BroadcastProtocol extends IProtocol {
    /**
     * Constructor for the class
     * @param {string} config URL for the protocol
     * @param {function(ProtocolState, object): void} dataRxHandler A 
     *  function(ProtocolState, object) definition for receiving data from a
     *  created protocol.
     */
    constructor(config, dataRxHandler) {
        super(Protocol.BROADCAST, config, dataRxHandler);
        INSTANCES['logger'].checkParam("string", config);
        let me = this;
        this._bc = new BroadcastChannel(config);
        this._bc.onmessage = (e) => {
            me.handleRxData("data_rx", e.data);
        }
        this._bc.onmessageerror = () => {
            me.handleRxData("failed", 
                `${me._config} de-serialization error`);
        }
        this.handleRxData("created", 
            `${this._config} broadcast protocol created`);
    }

    /** @override */
    write(data) {
        try {
            this._bc.postMessage(data);
        } catch (err) {
            this.handleRxData("failed", 
                `${this._config} failed to broadcast message`);
        }
    }

    /** @override */
    close() {
        try {
            this._bc.close();
        } catch (err) {
            INSTANCES['logger'].log("error", 
                `${this._config} failed to close the broadcast protocol`);
        }
    }
}

/**
 * Receives Server Sent Events (SSE) from a web server via HTTP
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
 * @augments IProtocol
 * @private
 */
class SSEProtocol extends IProtocol {
    /**
     * Constructor for the class
     * @param {string} config URL for the protocol
     * @param {function(ProtocolState, object): void} dataRxHandler A 
     *  function(ProtocolState, object) definition for receiving data from a
     *  created protocol.
     */
    constructor(config, dataRxHandler) {
        super(Protocol.SSE, config, dataRxHandler);
        INSTANCES['logger'].checkParam("string", config);
        let me = this;
        this._sse = new EventSource(config);
        this._sse.onerror = () => {
            me.handleRxData(ProtocolState.FAILED, 
                `SSE failed to connect to ${me._config}`);
        }
        this._sse.onopen = () => {
            me.handleRxData(ProtocolState.CREATED, 
                `SSE successfully connected to ${me._config}`);
        }
        this._sse.onmessage = (e) => {
            me.handleRxData(ProtocolState.DATA_RX, e.data);
        }
    }

    /** @override */
    // eslint-disable-next-line no-unused-vars
    write(data) {
        this.handleRxData(ProtocolState.FAILED, "SSE does not support write");
    }

    /** @override */
    close() {
        this._sse.close();
        super.close();
    }
}

/**
 * Opens a dedicated streaming TCP socket with a web server.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 * @augments IProtocol
 * @private
 */
class WebSocketProtocol extends IProtocol {
    /**
     * Constructor for the class.
     * @param {string} config A string representing the URL and what web socket
     *  protocol to utilize. 
     * @param {function(ProtocolState, object): void} dataRxHandler A 
     *  function(ProtocolState, object) definition for receiving data from a
     *  created protocol.
     */
    constructor(config, dataRxHandler) {
        super(Protocol.WEB_SOCKET, config, dataRxHandler);
        INSTANCES['logger'].checkParam("string", config);
        this._s = undefined;
        this._isProtocolBeingClosed = false;
        this.createSocket();
    }

    /**
     * Will attempt to create the WebSocket and register with the event
     * handlers.
     */
    createSocket() {
        let me = this;
        try {
            this._s = new WebSocket(me._config);
            // eslint-disable-next-line no-unused-vars
            this._s.onopen = (e) => {
                me.handleRxData(ProtocolState.CREATED, 
                    `Web socket connected to ${me._config} `);
            }
            this._s.onerror = (e) => {
                me.handleRxData(ProtocolState.FAILED, 
                    `Web socket lost connection to ${me._config}. Reason: ${e}`
                );
            }
            // eslint-disable-next-line no-unused-vars
            this._s.onclose = (e) => {
                me.reconnectSocket();
            }
            this._s.onmessage = (e) => {
                me.handleRxData(ProtocolState.DATA_RX, e.data);
            }
        } catch (err) {
            me.handleRxData(ProtocolState.FAILED, err);
            me.reconnectSocket();
        }
    }

    /**
     * Will attempt a socket reconnect in the event of a socket error that
     * causes the protocol to disconnect.
     */
    reconnectSocket() {
        if (!this._isProtocolBeingClosed) {
            setTimeout(this.createSocket, 500);
        }
    }

    /**
     * Provides the ability to close the socket providing a code and reason for
     * the socket closure.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
     * @param {number} code See the status code links for details of the codes
     * @param {string} reason Textual reason for the closure.
     */
    closeSocket(code, reason) {
        try {
            this._s.close(code, reason);
        } catch (err) {
            INSTANCES['logger'].log("error", err);
        }
    }

    /** @override */
    write(data) {
        try {
            this._s.send(data);
        } catch (err) {
            this.closeSocket(1000, `Protocol failed to send data. ${err}`);
        }
    }

    /** @override */
    close() {
        if (!this._isProtocolBeingClosed) {
            this._isProtocolBeingClosed = true;
            this.closeSocket(1000, "Protocol ordered to close by client");
            super.close();
        }
    }
}

/**
 * This namespace provides the ability for an SPA to send / receive data from 
 * an external service.  An external service can be a device or a web server.
 * Wrapped are dedicated protocols or helper functions for REST API calls or
 * sending a beacon.
 */
class Network {
    /**
     * Constructor for the class.
     */
    constructor() {
        // Tracking information
        this._protocolTracker = { };
        this._protocolId = 0;

        // Setup out announcing changes in the network availability
        this._networkAvailableHandler = undefined;
        let _onNetworkAvailable = (v) => {
            if (this._networkAvailableHandler) {
                this._networkAvailableHandler(v);
            }
        };
        window.addEventListener("offline", _onNetworkAvailable);
        window.addEventListener("online", _onNetworkAvailable);
    }

    /**
     * Queries for currently opened protocols.
     * @private
     * @param {number} id The associated id to query and return
     * @returns {IProtocol} object of the queried protocol or null if not found
     */
    _getProtocol(id) {
        INSTANCES['logger'].checkParam("number", id);
        let protocol = null;
        try {
            protocol = this._protocolTracker[id];
        } catch (err) {
            // do nothing
        }

        return protocol;
    }

    /**
     * Closes all currently created protocols.
     */    
    closeAllProtocols() {
        let ids = Object.keys(this._protocolTracker);
        ids.forEach((id) => {
            this._protocolTracker[id].close();
            delete this._protocolTracker[id];
        });
    }    

    /**
     * Closes the identified protocol
     * @param {number} id The id associated with the given protocol
     * @returns {boolean} true if protocol found and closed, false otherwise.
     */    
    closeProtocol(id) {
        let protocol = this._getProtocol(id);
        let success = false;
        if (protocol) {
            protocol.close();
            delete this._protocolTracker[id];
            success = true;
        }

        return success;
    }

    /**
     * Wraps the fetch() API call but provides additional checking on the 
     * status code to provide logging and rejection of the promise before
     * returning the response as part of the Promise chain.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Response
     * @param {string} url String representing where to make the request.
     * @param {any} options Options to carry out with the request. See attached
     *  website for details.
     * @returns {Promise<any>} The resulting data retrieved. See attached 
     *  website for details of the methods.
     */
    fetch(url, options = undefined) {
        INSTANCES['logger'].checkParam("string", url);
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then((resp) => {
                    if (resp.ok) {
                        let header = resp.headers.get("Content-Type");
                        if (header.indexOf("application/json") !== -1) {
                            resolve(resp.json());
                        } else if (header.indexOf("form-data") !== -1) {
                            resolve(resp.formData());
                        } else if (header.indexOf("application/octet-stream") !== -1) {
                            resolve(resp.blob());
                        } else if (header.indexOf("text/") !== -1) {
                            resolve(resp.text());
                        } else {
                            resolve();
                        }
                    } else  {
                        // The data was not ok, go reject it.
                        let err = `HTTP Error Code ${resp.status}. ${resp.statusText}`
                        INSTANCES['logger'].log("warn", err);
                        reject(err);
                    }
                })
                .catch ((err) => {
                    // Unknown error, go reject this
                    INSTANCES['logger'].log("error", err);
                    reject(err);
                });
        });
    }

    /**
     * Determines the current status of the network from the SPA.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
     * @returns {boolean} true if available, false otherwise.
     */
    isAvailable() {
        return (window.navigator.onLine) ? window.navigator.onLine : false;
    }

    /**
     * Determines if the specified protocol is supported on the given platform.
     * @param {Protocol} type Type to check to see if it is supported.
     * @return {boolean} true if it is supported, false if not.
     */    
    isProtocolSupported(type) {
        INSTANCES['logger'].checkParam("string", type);
        let isSupported = false;
        if (type === Protocol.BROADCAST) {
            isSupported = ("BroadcastChannel" in window);
        } else if (type === Protocol.SSE) {
            isSupported = ("EventSource" in window);
        } else if (type === Protocol.WEB_SOCKET) {
            isSupported = ("WebSocket" in window);
        } else {
            INSTANCES['logger'].throwSyntaxError("Invalid Protocol parameter specified");
        }
        return isSupported;
    }

    /**
     * Sets a handler 'function(boolean): void' to listen for realtime changes 
     * in the network availability.  
     * @type {function}
     */
    set onNetworkAvailable(handler) {
        INSTANCES['logger'].checkParam("function", handler, 1);
        this._networkAvailableHandler = handler;
        this._networkAvailableHandler(this.isAvailable());
    }

    /**
     * Opens a protocol to exchange data with an external service.  See 
     * specific protocol for what the config object can represent.
     * @param {Protocol} type A Protocol enumeration to create and open
     * @param {object} config A config of how to open the protocol.  Typically a URL.
     * @param {function(string, any): void} dataRxHandler A 
     *  function(ProtocolState, any) in order to receive state and data from the
     *  protocol.
     * @returns {number} The id assigned for the opened protocol for utilizing
     *  with this namespace.
     */    
    openProtocol(type, config, dataRxHandler) {
        // Validate our parameters
        INSTANCES['logger'].checkParam("function", dataRxHandler, 2);
        if (!(config)) {
            INSTANCES['logger'].throwSyntaxError("[config] was not specified");
        }

        // Go create our protocols:
        if (type === Protocol.BROADCAST) {
            this._protocolTracker[++this._protocolId] = new BroadcastProtocol(
                config, dataRxHandler);
        } else if (type === Protocol.SSE) {
            this._protocolTracker[++this._protocolId] = new SSEProtocol(
                config, dataRxHandler);
        }  else if (type === Protocol.WEB_SOCKET) {
            this._protocolTracker[++this._protocolId] = new WebSocketProtocol(
                config, dataRxHandler);
        } else {
            INSTANCES['logger'].throwSyntaxError(
                "[type] specified is not a valid Protocol.");
        }

        return this._protocolId;
    }

    /**
     * Number of created protocols being tracked by this namespace.   
     * @type {number}
     */    
    get protocolsOpen() {
        return Object.keys(this._protocolTracker).length;
    }

    /**
     * Gets the current state of a protocol.
     * @param {number} id The id associated with a opened protocol
     * @returns {ProtocolState} Current state of protocol or null if not found.
     */
    protocolState(id) {
        let p = this._getProtocol(id);
        let state = null;
        if (p) {
            state = p.state();
        }

        return state;
    }

    /**
     * Provides the ability to send a small amount of data over http to a web 
     * server.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
     * @param {string} url The url to send the data
     * @param {any} data Supported data that can be sent over the beacon.
     *  See website description.
     * @returns {boolean} true if the user agent successfully queued the data 
     *  for transfer, false otherwise.
     */
    sendBeacon(url, data) {
        INSTANCES['logger'].checkParam("string", url);
        if (!(data)) {
            INSTANCES['logger'].throwSyntaxError("data is an expected parameter");
        }
        let success = false;
        if ("sendBeacon" in navigator) {
            success = navigator.sendBeacon(url, data);
        }

        return success;        
    }

    /**
     * Writes data over the given protocol.  See specific protocol for 
     * supported data types.
     * @param {number} id The id associated with the given protocol
     * @param {object} data The data associated with the given protocol
     * @returns {boolean} true if protocol found and data queued for write, 
     *  false otherwise.
     */    
    writeToProtocol(id, data) {
        let p = this._getProtocol(id);
        let success = false;
        if (p) {
            p.write(data);
            success = true;
        }

        return success;
    }    
}

// ----------------------------------------------------------------------------
// Storage Domain Use Case

/**
 * Represents the ability to manage cookies with a browser but with methods
 * that mirror local and session storage objects.  Approach adapted from 
 * demonstration at the identified links.
 * @private
 * @see https://www.w3schools.com/js/js_cookies.asp
 * @see https://stackoverflow.com/questions/595228/how-can-i-delete-all-cookies-with-javascript
 */
class CookieManager {
    /**
     * Ensures cookies are enabled for the browser when using it for saving data.
     * @throws {SyntaxError} If cookies are not enabled.
     */
    checkCookiesEnabled() {
        if (!navigator.cookieEnabled) {
            INSTANCES['logger'].throwSyntaxError("Cookies are not enabled for this browser");
        }
    }

    /**
     * Sets or updates a key/value pair within the cookie storage.
     * @param {string} key The key to for lookup
     * @param {string} value The value associated with the key
     * @param {number} expDays How long before the value expires with the browser
     */
    setItem(key, value, expDays) {
        this.checkCookiesEnabled();
        let expDate = expDays >= 0 ? new Date() : new Date(0);
        if (expDays >= 0) {
            expDate.setTime(expDate.getTime() + (expDays * 24 * 60 * 60 * 1000));
        }
        document.cookie = 
            `${key}=${value};expires=${expDate.toUTCString()};path=/`;
    }

    /**
     * Gets the value associated with the key.
     * @param {string} key The key to look up amongst the cookies
     * @return {string} Representing the associated value or null if not 
     *  association exists with that key.
     */
    getItem(key) {
        this.checkCookiesEnabled();
        let name = key + "=";
        let ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return null;
    }

    /**
     * Removes a cookie key from the storage.
     * @param {string} key The cookie key to remove. 
     */
    removeItem(key) {
        this.checkCookiesEnabled();
        this.setItem(key, "", -1);
    }

    /**
     * Clears all the cookies.
     */
    clear() {
        this.checkCookiesEnabled();
        document.cookie.split(";").forEach((c) => { 
            document.cookie = c.replace(/^ +/, "").replace(
                /=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
    }
}

/**
 * This namespace provides the ability to store data via string key/value pairs 
 * with the browser as identified by the StorageMethod enumeration. 
 */
class Storage {
    /**
     * Constructor for the class.
     */
    constructor() {
        this._cookieManager = new CookieManager();
        this._localStorage = window.localStorage;
        this._sessionStorage = window.sessionStorage;
    }

    /**
     * Supports the Storage namespace. <br /> <br />
     * Will get the storage object to support the namespace.
     * @private
     * @param {StorageMethod} type number as defined by StorageMethod
     * @returns {Object}
     */
    _getStorageObject(type) {
        INSTANCES['logger'].checkParam("string", type);
        let rtnval = undefined;
        switch (type) {
            case StorageMethod.COOKIE:   rtnval = this._cookieManager; break;
            case StorageMethod.LOCAL:    rtnval = this._localStorage; break;
            case StorageMethod.SESSION:  rtnval = this._sessionStorage; break;
            default: INSTANCES['logger'].throwSyntaxError("[type] is not a StorageMethod object");
        }

        if (rtnval === undefined) {
            INSTANCES['logger'].throwSyntaxError(
                "Internal module storage object was unavailable");
        }

        return rtnval;
    }

    /**
     * Clears all key/value pairs with the storage session.
     * @param {StorageMethod} type Identifies what storage to access from
     *  the browser
     */
    clear(type) {
        let storage = this._getStorageObject(type);
        storage.clear();
    }

    /**
     * Gets the value associated with the key.
     * @param {StorageMethod} type Identifies what storage to access from
     *  the browser
     * @param {string} key The key to access the value within the storage
     * @returns {string} The value associated with the key or null if
     *  the key has no associated value.
     */
    get(type, key) {
        let storage = this._getStorageObject(type);
        INSTANCES['logger'].checkParam("string", key);
        return storage.getItem(key);
    }

    /**
     * Sets or updates a key/value pair within the browser storage
     * @param {StorageMethod} type Identifies what storage to access from
     *  the browser
     * @param {string} key The key to access the value within the storage
     * @param {string} value The value associated with the key
     * @param {number} expDays How long a value will last if utilizing a COOKIE
     */
    set(type, key, value, expDays=60) {
        let storage = this._getStorageObject(type);
        INSTANCES['logger'].checkParam("string", key);
        INSTANCES['logger'].checkParam("string", value);
        INSTANCES['logger'].checkParam("number", expDays);
        if (type === StorageMethod.COOKIE) {
            storage.setItem(key, value, expDays);
        } else {
            storage.setItem(key, value);
        }
    }

    /**
     * Removes the key/value pair from the storage object
     * @param {StorageMethod} type Identifies what storage to access from
     *  the browser
     * @param {string} key The key to access the value within the storage
     */
    remove(type, key) {
        let storage = this._getStorageObject(type);
        INSTANCES['logger'].checkParam("string", key);
        storage.removeItem(key);
    }
}

// ----------------------------------------------------------------------------
// Public API

const INSTANCES = {
    'async': new Async(),
    'gis': new GIS(),
    'logger': new Logger(),
    'network': new Network(),
    'storage': new Storage(),
};

/**
 * This is the main entry point into the library.  It provides the ability to 
 * access domains as namespaces specific to Single Page Application. These 
 * namespaces represent wrapped browser APIs to implement those domains. For 
 * example, Storage where cookies, local, and session storage are behind a 
 * singular module API represented as a namespace.
 * <br /> <br />
 * This library will take advantage of the SyntaxError object in JavaScript to
 * represent any violations of this library.  Any other thrown error may be a 
 * bug against the library or something that is thrown by the wrapped browser
 * API.  Those APIs will be represented in this documentation.
 * @module
 */
export default class CodeMelted {
    /**
     * Accesses information about the library for inclusion in help systems.
     * @type {string}
     * @readonly
     */
    static get aboutLibrary() { return ABOUT_LIBRARY; }

    /**
     * Accesses the async namespaces implementing the async domain use case of
     * the codemelted-pwa library.
     * @type {Async}
     */
    static get async() { return INSTANCES['async']; }

    /**
     * Accesses the gis namespaces implementing the gis domain use case of the 
     * codemelted-pwa library.
     * @type {GIS}
     */
    static get gis() { return INSTANCES['gis']; }

    /**
     * Accesses the logger namespaces implementing the logger domain use case 
     * of the codemelted-pwa library.
     * @type {Logger}
     */
    static get logger() { return INSTANCES['logger']; }

    /**
     * Accesses the network namespaces implementing the network domain use case 
     * of the codemelted-pwa library.
     * @type {Network}
     */    
    static get network() { return INSTANCES['network']; }

    /**
     * Accesses the storage namespaces implementing the storage domain use case
     * of the codemelted-pwa library.
     * @type {Storage}
     */
    static get storage() { return INSTANCES['storage']; }
} 
window["CodeMelted"] = CodeMelted;