autowatch = 1
var p = this.patcher

inlets = 1
outlets = 6

TOGGLE_LOOP = 0; // Outlet 0: Start playback at position 0ms
MSG_LOOP = 1; // Outlet 1: Set message
SEND_MESSAGE = 2; // Outlet 2: Send message
SET_LOOP_SPEED = 3; // Outlet 3: Set playback speed (1 is normal, 0 is none)
SET_LOOP_PITCH = 4; // Outlet 4: Set playback pitch (speed-independent)
SET_GAIN_ADJUST = 5;

globals = new Global('globals');

// wrapper for sending and triggering messages
function message(outlet_number, message) {
  outlet(outlet_number, message);
  outlet(SEND_MESSAGE, 'bang');
}


// function for sending out a loop
function startLoop(name, speed, pitch, gainAdjust) {
  var nameMsg = ['set', name];
  message(MSG_LOOP, nameMsg);
  var speedMsg = speed;
  var pitchMsg = Math.pow(2, (pitch / 12)) / Math.abs(speed)
  outlet(SET_LOOP_SPEED, speedMsg);
  message(SET_LOOP_PITCH, pitchMsg);
  post()
  outlet(SET_GAIN_ADJUST, gainAdjust + 128);
  message(MSG_LOOP, ['loopinterp', 1])

  // grab the correct recording
  var recording = null;
  for (var i = 0; i < globals.recordings.length; i++) {
    if (globals.recordings[i].name === name) {
      recording = globals.recordings[i];
      break;
    }
  }

  // if it exists then grab its duration and use that to calculate how long the playback should take
  if (recording) {
    message(MSG_LOOP, ['setloop', 0, recording.duration])
    outlet(TOGGLE_LOOP, 1);
  }
}

function stopLoop() {
  outlet(TOGGLE_LOOP, 0);
  message(MSG_LOOP, ['stop']);
}


function msg() {
  try {
    // post('\nARGS', arguments.length)
    var l = arguments;
    if (l[0] === 'start') {
      var name = l[1];
      var speed = 1;
      var pitch = 0;
      var gainAdjust = 0;
      if (l.length > 2) {
        speed = parseFloat(l[2])
      }
      if (l.length > 3) {
        pitch = parseFloat(l[3])
      }
      if (l.length > 4) {
        gainAdjust = parseInt(l[4])
      }
      post('pitch', pitch)
      post('speed', speed)
      startLoop(name, speed, pitch, gainAdjust);
    }
    else if (l[0] === 'stop') {
      stopLoop();
    }
    else {
      post('Invalid list:', l)
    }
  } catch (error) {
    post('line', error.lineNumber, ':', error.message)
  }
}