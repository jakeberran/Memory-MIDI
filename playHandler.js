autowatch = 1
var p = this.patcher

inlets = 1
outlets = 6

var START_PLAY = 0; // Outlet 0: Start playback at position 0ms
var MSG_PLAY = 1; // Outlet 1: Set message
var SEND_MESSAGE = 2; // Outlet 2: Send message
var SET_PLAY_SPEED = 3; // Outlet 3: Set playback speed (1 is normal, 0 is none)
var SET_PLAY_PITCH = 4; // Outlet 4: Set playback pitch (speed-independent)
var SET_GAIN_ADJUST = 5;

globals = new Global('globals');

// wrapper for sending and triggering messages
function message(outlet_number, message) {
  outlet(outlet_number, message);
  outlet(SEND_MESSAGE, 'bang');
}


// function for sending out a play
function startPlay(name, speed, transpose, gainAdjust, channel) {
  var nameMsg = ['set', name];
  message(MSG_PLAY, nameMsg);
  var speedMsg = speed;
  var pitchMsg = Math.pow(2, (transpose / 12)) / Math.abs(speed)
  outlet(SET_PLAY_SPEED, speedMsg);
  message(SET_PLAY_PITCH, pitchMsg);
  outlet(SET_GAIN_ADJUST, 128 + gainAdjust);

  // grab the correct recording
  var recording = {
    duration: 0
  };
  for (var i = 0; i < globals.recordings.length; i++) {
    if (globals.recordings[i].name === name) {
      recording = globals.recordings[i];
      break;
    }
  }

  // set the start point
  if (speed < 0) {
    playStartPoint = this.patcher.getnamed('play' + String(channel) + 'StartPoint')
    playStartPoint.message(['set', recording.duration])
  }
  else {
    playStartPoint = this.patcher.getnamed('play' + String(channel) + 'StartPoint')
    playStartPoint.message(['set', 0])
  }

  // if it exists then grab its duration and use that to calculate how long the playback should take
  if (recording) {
    message(MSG_PLAY, ['loopend', recording.duration]); // set the end point to the length of the recording
    outlet(START_PLAY, 1);
  }
}


// stop the play
function stopPlay() {
  message(MSG_PLAY, ['stop']);
}


function msg() {
  // post('\nARGS', arguments.length)
  var l = arguments;
  if (l[0] === 'start') {
    var name = l[1];
    var speed = 1;
    var transpose = 0;
    var gainAdjust = 0;
    var channel = 1;
    if (l.length > 2) {
      speed = parseFloat(l[2])
    }
    if (l.length > 3) {
      transpose = parseFloat(l[3])
    }
    if (l.length > 4) {
      gainAdjust = parseInt(l[4])
    }
    if (l.length > 5) {
      channel = parseInt(l[5])
    }
    post('transpose', transpose)
    post('speed', speed)
    post('gainadjust', gainAdjust)
    post('channel', channel)
    startPlay(name, speed, transpose, gainAdjust, channel)
  }
  else if (l[0] === 'stop') {
    stopPlay()
  }
  else {
    post('Invalid list:', l)
  }
}