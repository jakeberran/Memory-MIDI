autowatch = 1
var p = this.patcher

inlets = 1
outlets = 9

START = 0; // Outlet 0: Start playback at position 0ms
STOP = 1;
MSG_MIDI = 2; // Outlet 1: Set message
SEND_MSG_MIDI = 3; // Outlet 2: Send message
MSG_GROOVE = 4; // Outlet 1: Set message
SEND_MSG_GROOVE = 5; // Outlet 2: Send message
SET_SAMPLE_SPEED = 6;
SET_MIDI_SPEED = 7;
SET_GAIN_ADJUST = 8;

globals = new Global('globals');

// wrapper for sending and triggering messages
function messageSeq(message) {
  outlet(MSG_MIDI, message);
  outlet(SEND_MSG_MIDI, 'bang');
}

function messageGroove(message) {
  outlet(MSG_GROOVE, message);
  outlet(SEND_MSG_GROOVE, 'bang');
}

function startMidi(sampleName, fileName, useLoop, sampleSpeed, tempo, gainAdjust, transpose, noteOffDelay) {

  // set the buffer to be used
  messageGroove(['set', sampleName])
  
  // set the midi file to be read
  messageSeq(['read', fileName])
  
  // set whether to loop the sample
  if (useLoop) {
    messageGroove(['loop', 1]);
    messageGroove(['loopinterp', 1]);
  }
  else {
    messageGroove(['loop', 0]);
    messageGroove(['loopinterp', 0]);
  }

  // set the speeds
  outlet(SET_SAMPLE_SPEED, sampleSpeed)
  post('tempo', tempo)
  outlet(SET_MIDI_SPEED, ['start', Math.floor(1024*tempo/120)]);

  // set gain adjust
  tempgain = 128 + parseInt(gainAdjust)
  post('gain is', tempgain)
  outlet(SET_GAIN_ADJUST, tempgain)

  // set the transpose
  midiTranspose = this.patcher.getnamed('midiTranspose'); // [' + String(i) + ']
  midiTranspose.message(transpose)
  

  // set the note off delay
  noteOffDelayObj = this.patcher.getnamed('noteOffDelay');
  noteOffDelayObj.message(noteOffDelay)
  
  // grab the correct recording
  var recording = null;
  for (var i = 0; i < globals.recordings.length; i++) {
    post('Looking', globals.recordings[i].name, globals.recordings[i].duration)

    if (globals.recordings[i].name === sampleName) {
      recording = globals.recordings[i];
      post(recording.duration)
      break;
    }
  }

  // set the start point
  if (sampleSpeed < 0) { // TODO clean this up, for some reason it works
    if (useLoop) {
      messageGroove(['loopend', 0])
    }
    this.patcher.getnamed('midiSampleStartPoint').message(['set', recording.duration])
  }
  else {
    if (useLoop) {
      messageGroove(['loopend', recording.duration])
    }
    this.patcher.getnamed('midiSampleStartPoint').message(['set', 0])
  }

  // start the midi playback, depends on loop or not
  if (useLoop) {
    messageGroove('startloop')
  }
  // else {
  //   post('shouldnt be looping')
  //   // if it exists then grab its duration and use that to calculate how long the playback should take
  //   if (recording) {
  //     // messageGroove(['loopend', recording.duration]); // set the end point to the length of the recording
  //   }
  // }
  outlet(START, 'bang');
}

function stopMidi() {
	outlet(STOP, 'bang');
}

// handling incoming messages
function msg() {
  try {
    post('\nARGS', arguments.length)
    var l = arguments;
    if (l[0] === 'start') {
      var sampleName = l[1];
      var fileName = l[2];
      var useLoop = false;
      var sampleSpeed = 1;
      var tempo = 120;
      var gainAdjust = 0;
      var transpose = 0;
      var noteOffDelay = 0;
      if (l.length > 3) {
        useLoop = eval(l[3])
      }
      if (l.length > 4) {
        sampleSpeed = parseFloat(l[4])
      }
      if (l.length > 5) {
        tempo = parseFloat(l[5])
      }
      if (l.length > 6) {
        gainAdjust = parseInt(l[6])
      }
      if (l.length > 7) {
        transpose = parseInt(l[7])
      }
      if (l.length > 8) {
        noteOffDelay = parseInt(l[8])
      }
      startMidi(sampleName, fileName, useLoop, sampleSpeed, tempo, gainAdjust, transpose, noteOffDelay)
    }
    else if (l[0] === 'stop') {
      stopMidi();
    }
    else {
      post('Invalid list:', l)
    }
  }
  catch (error) {
    post(JSON.stringify(error))
  }
}