"use strict";

var libovr = require("node-ovrsdk");
var printf = require("printf");
var colors = require("colors");

console.log("\nTesting node-ovrsdk".yellow.bold);
console.log("-------------------".yellow.bold);

console.log("Initializing...".cyan.bold);
libovr.ovr_Initialize();

console.log("Creating HMD...".cyan.bold);
var hmd = libovr.ovrHmd_Create(0);

console.log("Creating desc object...".cyan.bold);
var desc = new libovr.ovrHmdDesc;

console.log("Getting ovrHmdDesc...".cyan.bold);
libovr.ovrHmd_GetDesc(hmd, desc.ref());
console.log("Type".blue.bold, desc.Type);
console.log("ProductName".blue.bold, desc.ProductName);
console.log("Manufacturer".blue.bold, desc.Manufacturer);
console.log("Caps".blue.bold, desc.Caps);
console.log("DistortionCaps".blue.bold, desc.DistortionCaps);
console.log("DisplayId".blue.bold, desc.DisplayId);

console.log("Getting ovrEyeRenderDesc for left eye...".cyan.bold);
var lerd = libovr.ovrHmd_GetRenderDesc(hmd, libovr.ovrEye_Left, desc.DefaultEyeFov[0]);
console.log("View Adjust, left eye x-component".blue.bold, lerd.ViewAdjust.x);

console.log("Getting ovrEyeRenderDesc for right eye...".cyan.bold);
var rerd = libovr.ovrHmd_GetRenderDesc(hmd, libovr.ovrEye_Right, desc.DefaultEyeFov[0]);
console.log("View Adjust, right eye x-component".blue.bold, rerd.ViewAdjust.x);

console.log("Starting sensor...".cyan.bold);
libovr.ovrHmd_StartSensor(hmd, ovrSensorCap_Orientation, ovrSensorCap_Orientation);

console.log("Acquiring pose...".cyan.bold);
var ss = libovr.ovrHmd_GetSensorState(hmd, libovr.ovr_GetTimeInSeconds());
var initialPose = ss.Predicted.Pose.Orientation;

console.log("Detecting sensor activity...".cyan.bold);
var sensorActive = false;
for (var i = 0; i < 1000; i++) {
    var ss = libovr.ovrHmd_GetSensorState(hmd, libovr.ovr_GetTimeInSeconds());
    var newPose = ss.Predicted.Pose.Orientation;
    var dx = initialPose.x - newPose.x;
    var dy = initialPose.y - newPose.y;
    var dz = initialPose.z - newPose.z;
    var dw = initialPose.w - newPose.w;
    if (dx != 0 || dy != 0 || dz != 0 || dw != 0) {
        console.log(printf("Sensor active. [%1.2e, %1.2e, %1.2e, %1.2e]", dx, dy, dz, dw).green.bold);
        sensorActive = true;
        break;
    }
}
if (!sensorActive) {
    console.log("Sensor appears inactive after 1000 samples.".red.bold);
    console.log("Try unplugging and plugging in the USB cable on the Rift.".red.bold);
    process.exit();
}

console.log("Resetting sensor...".cyan.bold);
libovr.ovrHmd_ResetSensor(hmd);

console.log("Acquiring pose...".cyan.bold);
var ss = libovr.ovrHmd_GetSensorState(hmd, libovr.ovr_GetTimeInSeconds());
var initialPose = ss.Predicted.Pose.Orientation;

console.log("Detecting sensor activity...".cyan.bold);
var sensorActive = false;
for (var i = 0; i < 1000; i++) {
    var ss = libovr.ovrHmd_GetSensorState(hmd, libovr.ovr_GetTimeInSeconds());
    var newPose = ss.Predicted.Pose.Orientation;
    var dx = initialPose.x - newPose.x;
    var dy = initialPose.y - newPose.y;
    var dz = initialPose.z - newPose.z;
    var dw = initialPose.w - newPose.w;
    if (dx != 0 || dy != 0 || dz != 0 || dw != 0) {
        console.log(printf("Sensor active. [%1.2e, %1.2e, %1.2e, %1.2e]", dx, dy, dz, dw).green.bold);
        sensorActive = true;
        break;
    }
}
if (!sensorActive) {
    console.log("Sensor appears inactive after 1000 samples.".red.bold);
    console.log("Try unplugging and plugging in the USB cable on the Rift.".red.bold);
    process.exit();
}

console.log("Destroying HMD...".cyan.bold);
libovr.ovrHmd_Destroy(hmd);

console.log("Shutting down...".cyan.bold);
libovr.ovr_Shutdown();

console.log("Test complete.".green.bold);