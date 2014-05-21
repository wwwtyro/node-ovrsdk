
# Node FFI wrapper for the 0.3.1 Oculus VR SDK C API  

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