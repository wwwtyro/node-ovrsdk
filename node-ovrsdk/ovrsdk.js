var ffi = require('ffi');
var ref = require('ref');
var Struct = require('ref-struct');
var ArrayType = require('ref-array');
var path = require('path');

var voidPtr = ref.refType(ref.types.void);

var ovrHmd = voidPtr;
var ovrBool = ref.types.char;

exports.ovrHmdCap_Present = ovrHmdCap_Present = 0x0001;
exports.ovrHmdCap_Available = ovrHmdCap_Available = 0x0002;
exports.ovrHmdCap_LowPersistence = ovrHmdCap_LowPersistence = 0x0080;
exports.ovrHmdCap_LatencyTest = ovrHmdCap_LatencyTest = 0x0100;
exports.ovrHmdCap_DynamicPrediction = ovrHmdCap_DynamicPrediction = 0x0200;
exports.ovrHmdCap_NoVSync = ovrHmdCap_NoVSync = 0x1000;
exports.ovrHmdCap_NoRestore = ovrHmdCap_NoRestore = 0x4000;
exports.ovrHmdCaps = ovrHmdCaps = ref.types.uint32;

exports.ovrSensorCap_Orientation = ovrSensorCap_Orientation = 0x0010;
exports.ovrSensorCap_YawCorrection = ovrSensorCap_YawCorrection = 0x0020;
exports.ovrSensorCap_Position = ovrSensorCap_Position = 0x0040;
exports.ovrSensorCaps = ovrSensorCaps = ref.types.uint32;

ovrEye_Left = 0;
ovrEye_Right = 1;
ovrEye_Count = 2;
ovrEyeType = ref.types.uint32;

var ovrVector2i = Struct({
    'x': ref.types.int,
    'y': ref.types.int
});
exports.ovrVector2i = ovrVector2i;

var ovrSizei = Struct({
    'w': ref.types.int,
    'h': ref.types.int
});
exports.ovrSizei = ovrSizei;

var ovrFovPort = Struct({
    UpTan: ref.types.float,
    DownTan: ref.types.float,
    LeftTan: ref.types.float,
    RightTan: ref.types.float
});
exports.ovrFovPort = ovrFovPort;

var ovrHmdDesc = Struct({
    Handle: ovrHmd,
    Type: ref.types.uint32,
    ProductName: ref.types.CString,
    Manufacturer: ref.types.CString,
    Caps: ref.types.uint32,
    DistortionCaps: ref.types.uint32,
    Resolution: ovrSizei,
    WindowsPos: ovrVector2i,
    DefaultEyeFov: ArrayType(ovrFovPort, ovrEye_Count),
    MaxEyeFov: ArrayType(ovrFovPort, ovrEye_Count),
    EyeRenderOrder: ArrayType(ref.types.uint32, ovrEye_Count),
    DisplayDeviceName: ref.types.CString,
    DisplayId: ref.types.long
});
var ovrHmdDescPtr = ref.refType(ovrHmdDesc);
exports.ovrHmdDesc = ovrHmdDesc;

var ovrVector3f = Struct({
    x: ref.types.float,
    y: ref.types.float,
    z: ref.types.float
});
exports.ovrVector3f = ovrVector3f;

var ovrQuatf = Struct({
    x: ref.types.float,
    y: ref.types.float,
    z: ref.types.float,
    w: ref.types.float
});
exports.ovrQuatf = ovrQuatf;

var ovrPosef = Struct({
    Orientation: ovrQuatf,
    Position: ovrVector3f
});
exports.ovrPosef = ovrPosef;

var ovrPoseStatef = Struct({
    Pose: ovrPosef,
    AngularVelocity: ovrVector3f,
    LinearVelocity: ovrVector3f,
    AngularAcceleration: ovrVector3f,
    LinearAcceleration: ovrVector3f,
    TimeInSeconds: ref.types.double
});
exports.ovrPoseStatef = ovrPoseStatef;

var ovrSensorState = Struct({
    Predicted: ovrPoseStatef,
    Recorded: ovrPoseStatef,
    Temperature: ref.types.float,
    StatusFlags: ref.types.uint32
});
exports.ovrSensorState = ovrSensorState;

var libovr = ffi.Library(path.resolve(__dirname, 'libovr'), {
    ovr_Initialize: [ovrBool, []],
    ovr_Shutdown: [ref.types.void, []],
    ovr_GetTimeInSeconds: [ref.types.double, []],
    ovrHmd_Create: [ovrHmd, [ref.types.int]],
    ovrHmd_Destroy: [ref.types.void, [ovrHmd]],
    ovrHmd_GetDesc: [ref.types.void, [ovrHmd, ovrHmdDescPtr]],
    ovrHmd_StartSensor: [ovrBool, [ovrHmd, ref.types.uint32, ref.types.uint32]],
    ovrHmd_GetSensorState: [ovrSensorState, [ovrHmd, ref.types.double]],
    ovrHmd_ResetSensor: [ref.types.void, [ovrHmd]],
});

exports.ovr_Initialize = libovr.ovr_Initialize;
exports.ovr_Shutdown = libovr.ovr_Shutdown;
exports.ovr_GetTimeInSeconds = libovr.ovr_GetTimeInSeconds;
exports.ovrHmd_Create = libovr.ovrHmd_Create;
exports.ovrHmd_Destroy = libovr.ovrHmd_Destroy;
exports.ovrHmd_GetDesc = libovr.ovrHmd_GetDesc;
exports.ovrHmd_StartSensor = libovr.ovrHmd_StartSensor;
exports.ovrHmd_GetSensorState = libovr.ovrHmd_GetSensorState;
exports.ovrHmd_ResetSensor = libovr.ovrHmd_ResetSensor;