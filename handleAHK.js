// Node script to turn on and off pg up/dn key remappings with AutoHotKey when the patch is opened/closed

const Max = require('max-api');
const { exec } = require('child_process');
var robot = require("robotjs");

// does closing ableton produce closebang or freebang
// use live.thisdevice or the live API or something

Max.addHandler("start", () => {
	Max.post("Starting AutoHotkey script");
  const ahk = exec(`"C:\\Program Files\\AutoHotkey\\AutoHotkey.exe" "${__dirname}\\remapPageUpDown.ahk"`)
});

Max.addHandler("stop", async () => {
  Max.post("Stopping AutoHotkey script");
  robot.keyTap('end', ['control', 'shift']) // keyboard shortcut for ending the AHK script
});