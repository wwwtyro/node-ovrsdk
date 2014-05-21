
### Node FFI wrapper for the 0.3.1 Oculus VR SDK C API  

This wrapper includes a compiled Windows DLL (others will be released when the SDK supports them), so no need to compile it (unless you want to, that's fine too).

Not all functionality is yet included. Please see the source for more details.

### Installation

```
npm install node-ovrsdk
```

### Usage

```javascript
"use strict";

var libovr = require("node-ovrsdk");
var printf = require("printf");

libovr.ovr_Initialize();
var hmd = libovr.ovrHmd_Create(0);
var desc = new libovr.ovrHmdDesc;
libovr.ovrHmd_GetDesc(hmd, desc.ref());
libovr.ovrHmd_StartSensor(hmd, ovrHmdCap_Orientation, ovrHmdCap_Orientation);

setInterval(function() {
    var ss = libovr.ovrHmd_GetSensorState(hmd, libovr.ovr_GetTimeInSeconds());
    var pose = ss.Predicted.Pose.Orientation;
    console.log(printf("%5f %5f %5f %5f", pose.x, pose.y, pose.z, pose.w));
}, 10);
```

Console output (I'm using MinGW/msys here):

```
$ node main.js
OVR::DeviceManager - initialized.
OVR::DeviceManagerThread - running (ThreadId=0x22C0).
*** SensorFusion Startup: TimeSeconds = 0.000000
OVR::Win32::HIDDevice - Opened '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
                    Manufacturer:'Oculus VR, Inc.'  Product:'Tracker DK'  Serial#:'8D85478C4855'  Version:'18'
OVR::SensorDevice - Closed '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
OVR::Win32::HIDDevice - Closed '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
OVR::Win32::HIDDevice - Opened '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
                    Manufacturer:'Oculus VR, Inc.'  Product:'Tracker DK'  Serial#:'8D85478C4855'  Version:'18'
OVR::SensorDevice - Closed '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
OVR::Win32::HIDDevice - Closed '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
OVR::Win32::HIDDevice - Opened '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
                    Manufacturer:'Oculus VR, Inc.'  Product:'Tracker DK'  Serial#:'8D85478C4855'  Version:'18'
OVR::SensorDevice - Closed '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
OVR::Win32::HIDDevice - Closed '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
OVR::Win32::HIDDevice - Opened '\\?\hid#vid_2833&pid_0001#7&39ea44fd&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}'
                    Manufacturer:'Oculus VR, Inc.'  Product:'Tracker DK'  Serial#:'8D85478C4855'  Version:'18'
Sensor created.
0.124330 0.000007 0.023191 0.991970
0.124329 0.000009 0.023193 0.991970
0.124326 0.000004 0.023201 0.991970
0.124325 -0.000001 0.023195 0.991970
0.124327 -0.000007 0.023197 0.991970
0.124336 -0.000004 0.023206 0.991969
0.124333 -0.000001 0.023207 0.991969
0.124328 0.000006 0.023213 0.991970
```
