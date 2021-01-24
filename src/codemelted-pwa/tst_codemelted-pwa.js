/**
 * @file Tests the CodeMelted-pwa.js module
 * @license MIT / (c) 2020 Mark Shaffer. All Rights Reserved
 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// ----------------------------------------------------------------------------
// async domain use cases
let asyncIO = CodeMelted.async;

describe("Async Parameter validation", () => {
    it("SyntaxError Thrown Because Invalid Data", () => {
        chai.assert.throws(() => asyncIO.run((a, b) => { }, "background"), SyntaxError);
        chai.assert.throws(() => asyncIO.run((a, b) => { }, "main"), SyntaxError);
        chai.assert.throws(() => asyncIO.run((a, b) => { }, "duh"), SyntaxError);        
        chai.assert.throws(() => asyncIO.run(() => { }, "main", "duh"), SyntaxError);
        chai.assert.throws(() => asyncIO.run(() => { }, 99), SyntaxError);
        chai.assert.throws(() => asyncIO.addShutdownHook((a) => { }), SyntaxError);
    });
});

describe("Async::_runMain() Validation", () => {
    it("Promise Rejection According to API", (done) => {
        let promise = asyncIO.run(() => { throw Error(); }, "main", 1000);
        promise
            .then((value) => { 
                throw Error("Test failed");
            })
            .catch((err) => {
                done();
            });
    });

    it("Promises Scheduling According to API", (done) => {
        async function testFunc() {
            let promise1 = asyncIO.run(() => { return 42; }, "main", 500);
            let promise2 = asyncIO.run(() => { return "duh"; }, "main", 1000);
            let result1 = await promise1;
            let result2 = await promise2;
            chai.assert.equal(42, result1);
            chai.assert.equal("duh", result2);
            done();
        }
        testFunc();
    });
});

describe("Async::addShutdownHook() Validation", () => {
    it("Register Multiple Event", () => {
        chai.assert.doesNotThrow(() => {
            asyncIO.addShutdownHook(() => {return 1;});
            asyncIO.addShutdownHook(() => {return 1;});
        })
    });
});

describe("Async::_runBackground() Validation", () => {
    it("Confirm initial stats", () => {
        let stats = asyncIO.stats();
        chai.assert.equal(stats.running, 0);
        chai.assert.isAbove(stats.cores, 0);
    });

    it("Confirm running background task", (done) => {
        async function testFunc() {
            try {
                // Get initial status and schedule work
                let stats1 = asyncIO.stats();
                let p = asyncIO.run(() => { return data + 2; }, "background", 40);

                // Prove the work got running up in the background
                let stats2 = asyncIO.stats();
                chai.assert.equal(stats2.running, stats1.running + 1);

                // Wait a prove the work got processed in the background.
                let result = await p;
                chai.assert.equal(42, result);
                let stats3 = asyncIO.stats();
                chai.assert.equal(stats3.running, stats1.running);
                chai.assert.equal(stats3.cores, stats1.cores);
            } catch (err) {
                chai.assert.fail("Unexpected exception received");
            }
            done();
        }        
        testFunc();
    });
});

// ----------------------------------------------------------------------------
// gis domain use case
let $test = CodeMelted.gis;
CodeMelted.logger.logLevel = "off";

describe('GIS::conversion() API Violations', function() {
    it('SyntaxError when number is not specified', function() {
        chai.assert.throws(() => $test.convert("a", "area_acre_to_ft2"), SyntaxError);
    })

    it('SyntaxError when an invalid type is specified', function() {
        chai.assert.throws(() => $test.convert(2, "duh"), SyntaxError);
    });
});

describe('GIS::convert() Area Conversion Formula Tests', function() {
    it('should convert acres to other units', function() {
        // Conversion validation
        chai.assert.approximately($test.convert(2, "area_acre_to_ft2"), 87120, 0.001);
        chai.assert.approximately($test.convert(2, "area_acre_to_hectare"), 0.809, 0.001);
        chai.assert.approximately($test.convert(2, "area_acre_to_in2"), 1.255e+7, 0.001e+7);
        chai.assert.approximately($test.convert(2, "area_acre_to_km2"), 0.008, 0.001);
        chai.assert.approximately($test.convert(2, "area_acre_to_m2"), 8093.712, 0.001);
        chai.assert.approximately($test.convert(2, "area_acre_to_mi2"), 0.003, 0.001);
        chai.assert.approximately($test.convert(2, "area_acre_to_yd2"), 9680.000, 0.001);
    });

    it('should convert square feet into other units', function() {
        chai.assert.approximately($test.convert(2, "area_ft2_to_acre"), 4.5914e-5, 0.001e-5);
        chai.assert.approximately($test.convert(2, "area_ft2_to_hectare"), 1.8581e-5, 0.001e-5);
        chai.assert.approximately($test.convert(2, "area_ft2_to_in2"), 288, 0.001);
        chai.assert.approximately($test.convert(2, "area_ft2_to_km2"), 1.8581e-7, 0.001e-7);
        chai.assert.approximately($test.convert(2, "area_ft2_to_m2"), 0.185, 0.001);
        chai.assert.approximately($test.convert(2, "area_ft2_to_mi2"), 7.174e-8, 0.001e-8);
        chai.assert.approximately($test.convert(2, "area_ft2_to_yd2"), 0.222, 0.001);
    });

    it('should convert hectare into other units', function() {
        chai.assert.approximately($test.convert(2, "area_hectare_to_acre"), 4.942, 0.001);
        chai.assert.approximately($test.convert(2, "area_hectare_to_ft2"), 215278.208, 0.001);
        chai.assert.approximately($test.convert(2, "area_hectare_to_in2"), 3.1e+7, 0.001e+7);
        chai.assert.approximately($test.convert(2, "area_hectare_to_km2"), 0.020, 0.001);
        chai.assert.approximately($test.convert(2, "area_hectare_to_m2"), 20000, 0.001);
        chai.assert.approximately($test.convert(2, "area_hectare_to_mi2"), 0.007, 0.001);
        chai.assert.approximately($test.convert(2, "area_hectare_to_yd2"), 23919.8, 0.001);
    });

    it('should convert square inches into other units', function() {
        chai.assert.approximately($test.convert(2, "area_in2_to_acre"), 3.1885e-7, 0.001e-7);
        chai.assert.approximately($test.convert(2, "area_in2_to_ft2"), 0.013, 0.001);
        chai.assert.approximately($test.convert(2, "area_in2_to_hectare"), 1.2903e-7, 0.001e-7);
        chai.assert.approximately($test.convert(2, "area_in2_to_km2"), 1.2903e-9, 0.001e-7);
        chai.assert.approximately($test.convert(2, "area_in2_to_m2"), 0.001, 0.001);
        chai.assert.approximately($test.convert(2, "area_in2_to_mi2"), 4.982e-10, 0.001e-10);
        chai.assert.approximately($test.convert(2, "area_in2_to_yd2"), 0.001, 0.001);
    });

    it('should convert square kilometers into other units', function() {
        chai.assert.approximately($test.convert(2, "area_km2_to_acre"), 494.210, 0.001);
        chai.assert.approximately($test.convert(2, "area_km2_to_ft2"), 2.153e+7, 0.001e+7);
        chai.assert.approximately($test.convert(2, "area_km2_to_hectare"), 200, 0.001);
        chai.assert.approximately($test.convert(2, "area_km2_to_in2"), 3.1e+9, 0.001e+9);
        chai.assert.approximately($test.convert(2, "area_km2_to_m2"), 2e+6, 0.001e+6);
        chai.assert.approximately($test.convert(2, "area_km2_to_mi2"), 0.772, 0.001);
        chai.assert.approximately($test.convert(2, "area_km2_to_yd2"), 2.392e+6, 0.001e+6);
    });

    it('should convert square meters into other units', function() {
        chai.assert.approximately($test.convert(2, "area_m2_to_acre"), 0.000494211, 0.00001);
        chai.assert.approximately($test.convert(2, "area_m2_to_ft2"), 21.527, 0.001);
        chai.assert.approximately($test.convert(2, "area_m2_to_hectare"), 0.0002, 0.0001);
        chai.assert.approximately($test.convert(2, "area_m2_to_in2"), 3100.006, 0.001);
        chai.assert.approximately($test.convert(2, "area_m2_to_km2"), 2e-6, 0.001e-6);
        chai.assert.approximately($test.convert(2, "area_m2_to_mi2"), 7.722e-7, 0.001e-7);
        chai.assert.approximately($test.convert(2, "area_m2_to_yd2"), 2.391, 0.001);
    });

    it('should convert square miles into other units', function() {
        chai.assert.approximately($test.convert(2, "area_mi2_to_acre"), 1280, 0.001);
        chai.assert.approximately($test.convert(2, "area_mi2_to_ft2"), 5.576e+7, 0.001e+7);
        chai.assert.approximately($test.convert(2, "area_mi2_to_hectare"), 517.998, 0.001);
        chai.assert.approximately($test.convert(2, "area_mi2_to_in2"), 8.029e+9, 0.001e+9);
        chai.assert.approximately($test.convert(2, "area_mi2_to_km2"), 5.179, 0.001);
        chai.assert.approximately($test.convert(2, "area_mi2_to_m2"), 5.18e+6, 0.001e+6);
        chai.assert.approximately($test.convert(2, "area_mi2_to_yd2"), 6.195e+6, 0.001e+6);
    });

    it('should convert square yards into other units', function() {
        chai.assert.approximately($test.convert(2, "area_yd2_to_acre"), 0.0004, 0.0001);
        chai.assert.approximately($test.convert(2, "area_yd2_to_ft2"), 18, 0.001);
        chai.assert.approximately($test.convert(2, "area_yd2_to_hectare"), 0.0001, 0.0001);
        chai.assert.approximately($test.convert(2, "area_yd2_to_in2"), 2592, 0.001);
        chai.assert.approximately($test.convert(2, "area_yd2_to_km2"), 1.6723e-6, 0.001e-6);
        chai.assert.approximately($test.convert(2, "area_yd2_to_m2"), 1.672, 0.001);
        chai.assert.approximately($test.convert(2, "area_yd2_to_mi2"), 6.4566e-7, 0.001e-7);
    });
});

describe('GIS::convert() Speed Conversion Formula Tests', function() {
    it('should convert miles per hour to other units', function() {
        chai.assert.approximately($test.convert(2.5, "speed_mph_to_fps"), 3.667, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_mph_to_knot"), 2.172, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_mph_to_kph"), 4.023, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_mph_to_mps"), 1.117, 0.001);
    });

    it('should convert foot per second to other units', function() {
        chai.assert.approximately($test.convert(2.5, "speed_fps_to_knot"), 1.481, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_fps_to_kph"), 2.743, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_fps_to_mph"), 1.704, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_fps_to_mps"), 0.762, 0.001);
    });

    it('should convert meter per second to other units', function() {
        chai.assert.approximately($test.convert(2.5, "speed_mps_to_fps"), 8.202, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_mps_to_knot"), 4.859, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_mps_to_kph"), 9.000, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_mps_to_mph"), 5.592, 0.001);
    });

    it('should convert kilometer per hour to other units', function() {
        chai.assert.approximately($test.convert(2.5, "speed_kph_to_fps"), 2.278, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_kph_to_knot"), 1.349, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_kph_to_mph"), 1.553, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_kph_to_mps"), 0.694, 0.001);
    });

    it('should convert knot to other units', function() {
        chai.assert.approximately($test.convert(2.5, "speed_knot_to_fps"), 4.219, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_knot_to_kph"), 4.630, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_knot_to_mph"), 2.877, 0.001);
        chai.assert.approximately($test.convert(2.5, "speed_knot_to_mps"), 1.286, 0.001);
    });
});

describe('GIS::convert() Temperature Conversion Formula Tests', function() {
    it('should convert from celsius to other units', function() {
        chai.assert.approximately($test.convert(-273.15, "temp_c_to_f"), -459.67, 0.001);
        chai.assert.approximately($test.convert(0, "temp_c_to_f"), 32, 0.001);
        chai.assert.approximately($test.convert(100, "temp_c_to_f"), 212, 0.001);

        chai.assert.approximately($test.convert(-273.15, "temp_c_to_k"), 0, 0.001);
        chai.assert.approximately($test.convert(0, "temp_c_to_k"), 273.15, 0.001);
        chai.assert.approximately($test.convert(100, "temp_c_to_k"), 373.15, 0.001);
    });

    it('should convert from fahrenheit to other units', function() {
        chai.assert.approximately($test.convert(-459.67, "temp_f_to_c"), -273.15, 0.001);
        chai.assert.approximately($test.convert(32, "temp_f_to_c"), 0, 0.001);
        chai.assert.approximately($test.convert(212, "temp_f_to_c"), 100, 0.001);

        chai.assert.approximately($test.convert(-459.67, "temp_f_to_k"), 0, 0.001);
        chai.assert.approximately($test.convert(32, "temp_f_to_k"), 273.15, 0.001);
        chai.assert.approximately($test.convert(212, "temp_f_to_k"), 373.15, 0.001);
    });

    it('should convert from kelvin to other units', function() {
        chai.assert.approximately($test.convert(0, "temp_k_to_c"), -273.15, 0.001);
        chai.assert.approximately($test.convert(273.15, "temp_k_to_c"), 0, 0.001);
        chai.assert.approximately($test.convert(373.15, "temp_k_to_c"), 100, 0.001);

        chai.assert.approximately($test.convert(0, "temp_k_to_f"), -459.67, 0.001);
        chai.assert.approximately($test.convert(273.15, "temp_k_to_f"), 32, 0.001);
        chai.assert.approximately($test.convert(373.15, "temp_k_to_f"), 212, 0.001);
    });
});

let badLatitude = {
    latitude: null,
    longitude: "duh",
    timestamp: null,
};
let badLongitude = {
    latitude: "duh",
    longitude: undefined,
    timestamp: null,
};
let badTimestamp = {
    latitude: 50.25,
    longitude: -33.65,
    timestamp: null,
};

let startPos = {
    timestamp: 0,
    latitude: -24.875975,
    longitude: 152.352298,
};

let endPos = {
    timestamp: 120000,
    latitude: -24.993289,
    longitude: 151.960336,
};

describe("Validate Formulas::calcHeadingDegrees()", () => {
    it("Validate Throws on Garbage Data", () => {
        chai.assert.throws(() => $test.calcHeadingDegrees("duh", "duh"), SyntaxError);
        chai.assert.throws(() => $test.calcHeadingDegrees(badLatitude, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcHeadingDegrees(badLongitude, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcHeadingDegrees(badTimestamp, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcHeadingDegrees(badTimestamp, badLongitude), SyntaxError);
        chai.assert.doesNotThrow(() => $test.calcHeadingDegrees(badTimestamp, badTimestamp));
    });

    it("Validate proper calculation between two geodetic points", () => {
        // As compared to https://www.sunearthtools.com/tools/distance.php
        chai.assert.approximately(251.73, $test.calcHeadingDegrees(startPos, endPos), 0.5);
    });    
});

describe("Validate Formulas::calcDistanceMeters()", () => {
    it("Validate Throws on Garbage Data", () => {
        chai.assert.throws(() => $test.calcDistanceMeters("duh", "duh"), SyntaxError);
        chai.assert.throws(() => $test.calcDistanceMeters(badLatitude, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcDistanceMeters(badLongitude, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcDistanceMeters(badTimestamp, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcDistanceMeters(badTimestamp, badLongitude), SyntaxError);
        chai.assert.doesNotThrow(() => $test.calcDistanceMeters(badTimestamp, badTimestamp));
    });

    it("Validate proper calculation between two geodetic points", () => {
        // As compared to https://www.cqsrg.org/tools/GCDistance/
        chai.assert.approximately(41667.730, $test.calcDistanceMeters(startPos, endPos), 3.0);
    });    
});

describe("Validate Formulas::calcSpeedMetersPerSecond()", () => {
    it("Validate Throws on Garbage Data", () => {
        chai.assert.throws(() => $test.calcSpeedMetersPerSecond("duh", "duh"), SyntaxError);
        chai.assert.throws(() => $test.calcSpeedMetersPerSecond(badLatitude, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcSpeedMetersPerSecond(badLongitude, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcSpeedMetersPerSecond(badTimestamp, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcSpeedMetersPerSecond(startPos, badLatitude), SyntaxError);
        chai.assert.throws(() => $test.calcSpeedMetersPerSecond(startPos, badLongitude), SyntaxError);
        chai.assert.throws(() => $test.calcSpeedMetersPerSecond(startPos, badTimestamp), SyntaxError);
        chai.assert.doesNotThrow(() => $test.calcSpeedMetersPerSecond(startPos, endPos));
    });

    it("Validate proper calculation between two geodetic points", () => {
        // https://www.smartconversion.com/unit_calculation/Velocity_Speed_calculator.aspx
        // Plugging in the values from the other test
        chai.assert.approximately(347.231083333333, $test.calcSpeedMetersPerSecond(startPos, endPos), 0.5);
    });
});

// ----------------------------------------------------------------------------
// logger domain use case
let Logger = CodeMelted.logger;

class TestHelper {
    constructor() {
        this.level = "";
        this.msg = "";
    }

    reset() {
        this.level = "";
        this.msg = "";
    }
}
let helper = new TestHelper();
let logHandler = (level, msg) => {
    console.log(level, msg);
    helper.level = level;
    helper.msg = msg;
}

describe("Logger::throwSyntaxError() Throws", function() {
    it("Confirm it throws", function() {
        chai.assert.throws(() => Logger.throwSyntaxError("Hello"), SyntaxError);
    });
});

describe("Logger::checkParam Validation", function() {
    it("Validate Regular Parameters", function() {
        let v = 42;
        chai.assert.throws(() => Logger.checkParam(42, v), SyntaxError);
        chai.assert.throws(() => Logger.checkParam("string", v), SyntaxError);
        chai.assert.equal(Logger.checkParam("number", v), 42);
    });

    it("Validate Function Parameter Count", function() {
        // eslint-disable-next-line no-unused-vars
        let handler = (a, b) => { };
        chai.assert.throws(() => Logger.checkParam("string", handler, "duh"), SyntaxError);
        chai.assert.throws(() => Logger.checkParam("function", handler, "duh"), SyntaxError);
        chai.assert.throws(() => Logger.checkParam("function", handler, -2), SyntaxError);
        chai.assert.notEqual(Logger.checkParam("function", handler, 2), undefined);
    });
});

describe("Logger::traceExecution() Validation", function() {
    it("Expected Syntax Errors", function() {
        chai.assert.throws(() => Logger.traceExecution(), SyntaxError);
        chai.assert.throws(() => Logger.traceExecution("hello", ""), SyntaxError);
    });

    it("Confirm Trace But No Logging", function() {
        Logger.logHandler = logHandler;
        let start = Logger.traceExecution("test");
        // eslint-disable-next-line no-empty
        for (let x = 0; x < 10000; x++) { }
        let execTime = Logger.traceExecution("test", start);
        chai.assert.notEqual(0, start);
        chai.assert.notEqual(0, execTime);
        chai.assert.notEqual(start, execTime);
        chai.assert.equal("", helper.level);
        chai.assert.equal("", helper.msg);
        helper.reset();
    });

    it("Confirm Trace With Logging", function() {
        Logger.logHandler = logHandler;
        Logger.logLevel = "trace";
        let start = Logger.traceExecution("test");
        // eslint-disable-next-line no-empty
        for (let x = 0; x < 10000; x++) { }
        let execTime = Logger.traceExecution("test", start);
        chai.assert.notEqual(0, start);
        chai.assert.notEqual(0, execTime);
        chai.assert.notEqual(start, execTime);
        chai.assert.equal("trace", helper.level);
        chai.assert.notEqual("", helper.msg);
        helper.reset();
        Logger.logLevel = "error";
    });
});

describe("Logger::log() Validation", function() {
    it("Confirm API Violation", function() {
        chai.assert.throws(() => Logger.log("", "Hello"), SyntaxError);
        chai.assert.throws(() => Logger.log("duh", "Hello"), SyntaxError);
    });
    
    it("Confirm Setting Log Level Type", function() {
        Logger.logLevel = "info";
        chai.assert.equal("info", Logger.logLevel);
    });

    it("Confirm logging with log handler", function() {
        Logger.logHandler = logHandler;
        Logger.logLevel = "trace";
        Logger.log("trace", "trace");
        chai.assert.equal("trace", helper.level);
        chai.assert.equal("trace", helper.msg);

        Logger.log("trace", "trace");
        chai.assert.equal("trace", helper.level);
        chai.assert.equal("trace", helper.msg);

        Logger.log("info", "info");
        chai.assert.equal("info", helper.level);
        chai.assert.equal("info", helper.msg);

        Logger.log("warn", "warn");
        chai.assert.equal("warn", helper.level);
        chai.assert.equal("warn", helper.msg);

        Logger.log("error", "error");
        chai.assert.equal("error", helper.level);
        chai.assert.equal("error", helper.msg);

        helper.reset();
    });

    it("Confirm logging with no log handler", function() {
        helper.reset();
        chai.assert.doesNotThrow(() => {
            Logger.logHandler = null;
            Logger.logLevel = "trace";
            Logger.log("trace", "trace");
            Logger.log("info", "info");
            Logger.log("warn", "warn");
            Logger.log("error", "error");
            Logger.log("clear");
        });
        chai.assert.equal("", helper.level);
        chai.assert.equal("", helper.msg);
    });
});

// ----------------------------------------------------------------------------
// network domain use case
$network = CodeMelted.network;

describe("Validating::onNetworkAvailable()", () => {
    it("Invalid API Call", () => {
        let invalidHandler = (a, b) => { }
        chai.assert.throws(() => $network.onNetworkAvailable = 99, SyntaxError);
        chai.assert.throws(() => $network.onNetworkAvailable = null, SyntaxError);
        chai.assert.throws(() => $network.onNetworkAvailable = undefined, SyntaxError);
        chai.assert.throws(() => $network.onNetworkAvailable = invalidHandler, SyntaxError);
    });

    it("Add the Handler", () => {
        let available = null;
        let handler = (v) => {
            available = v;
        };

        $network.onNetworkAvailable = handler;
        chai.assert.isNotNull(available);
        chai.assert.isBoolean(available);
    });
});

describe("Validate Network::fetch()", () => {
    it("Invalid API Call", () => {
        chai.assert.throws(() => $network.fetch(99), SyntaxError);
    });

    it("Valid Call But Error Encountered", (done) => {
        async function test() {
            try {
                let resp = await $network.fetch("/server");
                chai.assert.fail();
            } catch (err) {
                done();
            }
        }
        test();
    });

    // TODO: Add a fetch server to our test infrastructure
});

describe("Validate Network::isSupported()", () => {
    it("Invalid API Calls", () => {
        chai.assert.throws(() => $network.isProtocolSupported(99), SyntaxError);
        chai.assert.throws(() => $network.isProtocolSupported("duh"), SyntaxError);
    });

    it("Valid API Calls", () => {
        chai.assert.isBoolean($network.isProtocolSupported("broadcast"));
        chai.assert.isBoolean($network.isProtocolSupported("sse"));
        chai.assert.isBoolean($network.isProtocolSupported("web_socket"));
    });
});

describe("Validate Network::sendBeacon()", () => {
    it("Invalid API Calls", () => {
        chai.assert.throws(() => $network.sendBeacon(99), SyntaxError);
        chai.assert.throws(() => $network.sendBeacon("/server", null), SyntaxError);
        chai.assert.throws(() => $network.sendBeacon("/server", undefined), SyntaxError);
        chai.assert.throws(() => $network.sendBeacon("/server"), SyntaxError);
    });

    it("Send a Beacon", () => {
        chai.assert.isBoolean($network.sendBeacon("/server", "Sent by a beacon!"));
    });
});

describe("Validate Protocol Usage", () => {
    it("Invalid API Calls", () => {
        chai.assert.throws(() => $network.openProtocol("duh", "", (a, b, c) => { }), SyntaxError);
        chai.assert.throws(() => $network.openProtocol("duh", null, (a, b) => { }), SyntaxError);
        chai.assert.throws(() => $network.openProtocol("duh", undefined, (a, b) => { }), SyntaxError);
        chai.assert.throws(() => $network.openProtocol(99, "/server", (a, b) => { }), SyntaxError);
        chai.assert.throws(() => $network.openProtocol("duh", "/server", (a, b) => { }), SyntaxError);
    });

    it("BroadcastProtocol - Creation / Read / Write / Close ", () => {
        let count = 0;
        let handler = (state, data) => {
            count++;
        };

        // Open the protocol
        let id = $network.openProtocol("broadcast", "test_channel", handler);
        chai.assert.isAbove(id, 0);
        chai.assert.equal($network.protocolsOpen, 1);
        chai.assert.isString($network.protocolState(id));
        chai.assert.isNull($network.protocolState(-1));

        // Write some data
        chai.assert.isFalse($network.writeToProtocol(-1));
        chai.assert.isTrue($network.writeToProtocol(id));

        // Close the protocol
        chai.assert.isFalse($network.closeProtocol(-1));
        chai.assert.isTrue($network.closeProtocol(id));
        chai.assert.equal($network.protocolsOpen, 0);

        chai.assert.isAbove(count, 0);
    });

    it("SSEProtocol - Creation / Read / Write / Close ", () => {
        let count = 0;
        let handler = (state, data) => {
            count++;
        };

        // Open the protocol
        let id = $network.openProtocol("sse", "/server", handler);
        chai.assert.isAbove(id, 0);
        chai.assert.equal($network.protocolsOpen, 1);
        chai.assert.isString($network.protocolState(id));
        chai.assert.isNull($network.protocolState(-1));

        // Write some data
        chai.assert.isFalse($network.writeToProtocol(-1));
        chai.assert.isTrue($network.writeToProtocol(id));

        // Close the protocol
        chai.assert.isFalse($network.closeProtocol(-1));
        chai.assert.isTrue($network.closeProtocol(id));
        chai.assert.equal($network.protocolsOpen, 0);

        chai.assert.isAbove(count, 0);
    });

    it("WebSocketProtocol - Creation / Read / Write / Close ", () => {
        let count = 0;
        let handler = (state, data) => {
            count++;
        };

        // Open the protocol
        let id = $network.openProtocol("web_socket", "ws://server", handler);
        chai.assert.isAbove(id, 0);
        chai.assert.equal($network.protocolsOpen, 1);
        chai.assert.isString($network.protocolState(id));
        chai.assert.isNull($network.protocolState(-1));

        // Write some data
        chai.assert.isFalse($network.writeToProtocol(-1));
        chai.assert.isTrue($network.writeToProtocol(id));

        // Close the protocol
        chai.assert.isFalse($network.closeProtocol(-1));
        chai.assert.isTrue($network.closeProtocol(id));
        chai.assert.equal($network.protocolsOpen, 0);

        chai.assert.isAbove(count, 0);
    });
});

// ----------------------------------------------------------------------------
// storage domain use case
let $storage = CodeMelted.storage;
CodeMelted.logger.setLogLevel("off");

describe("Storage Namespace Validating API Violations", () => {
    it("Storage::set() Violations", () => {
        chai.assert.throws(() => $storage.set(-1, 0, 0), SyntaxError);
        chai.assert.throws(() => $storage.set(99, 0, 0), SyntaxError);
        chai.assert.throws(() => $storage.set("cookie", 0, 0), SyntaxError);
        chai.assert.throws(() => $storage.set("cookie", "key", 0), SyntaxError);
        chai.assert.throws(() => $storage.set("cookie", "key", "value", "expire please"), SyntaxError);
    });

    it("Storage::get() Violations", () => {
        chai.assert.throws(() => $storage.get(-1, 0), SyntaxError);
        chai.assert.throws(() => $storage.get(99, 0), SyntaxError);
        chai.assert.throws(() => $storage.get("cookie", 0), SyntaxError);
    });

    it("Storage::remove() Violations", () => {
        chai.assert.throws(() => $storage.remove(-1, 0), SyntaxError);
        chai.assert.throws(() => $storage.remove(99, 0), SyntaxError);
        chai.assert.throws(() => $storage.remove("cookie", 0), SyntaxError);
    });

    it("Storage::clear() Violations", () => {
        chai.assert.throws(() => $storage.clear(-1), SyntaxError);
        chai.assert.throws(() => $storage.clear("duh"), SyntaxError);
    });
});

describe("Validating Storage Methods", () => {
    it("COOKIE Storage Method", () => {
        // Add test
        $storage.set("cookie", "key1", "value1");
        $storage.set("cookie", "key2", "value2");
        $storage.set("cookie", "key3", "value3");
        chai.assert.equal("value1", $storage.get("cookie", "key1"));
        chai.assert.equal("value2", $storage.get("cookie", "key2"));
        chai.assert.equal("value3", $storage.get("cookie", "key3"));
        
        // Remove single item
        chai.assert.doesNotThrow(() => {
            $storage.remove("cookie", "key1");
            $storage.remove("cookie", "key1");
        });
        chai.assert.equal(null, $storage.get("cookie", "key1"));
        chai.assert.equal("value2", $storage.get("cookie", "key2"));
        chai.assert.equal("value3", $storage.get("cookie", "key3"));

        // Change an item
        $storage.set("cookie", "key2", "v2");
        chai.assert.equal(null, $storage.get("cookie", "key1"));
        chai.assert.equal("v2", $storage.get("cookie", "key2"));
        chai.assert.equal("value3", $storage.get("cookie", "key3"));

        // Clear remaining items
        $storage.clear("cookie");
        chai.assert.equal(null, $storage.get("cookie", "key1"));
        chai.assert.equal(null, $storage.get("cookie", "key2"));
        chai.assert.equal(null, $storage.get("cookie", "key3"));
    });

    it("LOCAL Storage Method", () => {
        // Add test
        $storage.set("local", "key1", "value1");
        $storage.set("local", "key2", "value2");
        $storage.set("local", "key3", "value3");
        chai.assert.equal("value1", $storage.get("local", "key1"));
        chai.assert.equal("value2", $storage.get("local", "key2"));
        chai.assert.equal("value3", $storage.get("local", "key3"));
        
        // Remove single item
        chai.assert.doesNotThrow(() => {
            $storage.remove("local", "key1");
            $storage.remove("local", "key1");
        });
        chai.assert.equal(null, $storage.get("local", "key1"));
        chai.assert.equal("value2", $storage.get("local", "key2"));
        chai.assert.equal("value3", $storage.get("local", "key3"));

        // Change an item
        $storage.set("local", "key2", "v2");
        chai.assert.equal(null, $storage.get("local", "key1"));
        chai.assert.equal("v2", $storage.get("local", "key2"));
        chai.assert.equal("value3", $storage.get("local", "key3"));

        // Clear remaining items
        $storage.clear("local");
        chai.assert.equal(null, $storage.get("local", "key1"));
        chai.assert.equal(null, $storage.get("local", "key2"));
        chai.assert.equal(null, $storage.get("local", "key3"));
    });

    it("SESSION Storage Method", () => {
        // Add test
        $storage.set("session", "key1", "value1");
        $storage.set("session", "key2", "value2");
        $storage.set("session", "key3", "value3");
        chai.assert.equal("value1", $storage.get("session", "key1"));
        chai.assert.equal("value2", $storage.get("session", "key2"));
        chai.assert.equal("value3", $storage.get("session", "key3"));
        
        // Remove single item
        chai.assert.doesNotThrow(() => {
            $storage.remove("session", "key1");
            $storage.remove("session", "key1");
        });
        chai.assert.equal(null, $storage.get("session", "key1"));
        chai.assert.equal("value2", $storage.get("session", "key2"));
        chai.assert.equal("value3", $storage.get("session", "key3"));

        // Change an item
        $storage.set("session", "key2", "v2");
        chai.assert.equal(null, $storage.get("session", "key1"));
        chai.assert.equal("v2", $storage.get("session", "key2"));
        chai.assert.equal("value3", $storage.get("session", "key3"));

        // Clear remaining items
        $storage.clear("session");
        chai.assert.equal(null, $storage.get("session", "key1"));
        chai.assert.equal(null, $storage.get("session", "key2"));
        chai.assert.equal(null, $storage.get("session", "key3"));
    });
});