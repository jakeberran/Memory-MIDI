var midiFolder;
var stageData;

function load(jsFilename) {
  // post(jsFilename)
  data = require(jsFilename)
  try {
    midiFolder = data.midiFolder
    stageData = data.stageData
    this.patcher.getnamed('numOfStages').message(stageData.length)
  } catch (error) {
    post('Error in loading data:', error)
  }
  // post('Getting MIDI files from', midiFolder)
}







//************************************************************************************************** */






autowatch = 1
var p = this.patcher

// inlets and outlets
// inlet 0: the stage number as an integer
// inlet 1: the elapsed time of the current stage
inlets = 2
outlets = 9 // values to send to the various apparatuses
// outlet names
var TEMP_OUTLET = 0;
var REC = 1; // [start|stop, name]
var PLAY = 2; // [start|stop, name, speed]
var LOOP = 3; // [start|stop, name, speed]
var MIDI = 4; // [start|stop, name, other data I have yet to decide]
var PLAY2 = 5;
var LOOP2 = 6;
var PLAY3 = 7;
var STAGE = 8;

globals = new Global('globals');
globals.recordings = [];

var current_stage_ms = 0;

// function for testing if array includes a value
function includes(array, element) {
  for (var i in array) {
    if (array[i] === element) {
      return true
    }
  }
  return false
}

// helper function for sending messages
function message(outlet_number, data) {
  if (data.length > 0) {
    var finalData = ['msg'];
    for (var i in data) {
      finalData.push(data[i]);
    }
    outlet(outlet_number, finalData);
    outlet(outlet_number, 'bang')
  }
}

// function for starting a rec
function startRec(name) {
  message(REC, ['start', name])
  globals.recordings.push({
    name: name,
    duration: null
  })
}

// function for finishing up a rec
function stopRec() {
  // store the duration if there is a "most recent recording" ready to have its duration stored
  if (globals.recordings.length > 0) {
    updateCurrentStageMs();

    // if the most recent recording doesn't have a duration then add it 
    // (to prevent stopRec at the start of a new recording from overwriting it)
    if (!globals.recordings[globals.recordings.length - 1].duration) {
      globals.recordings[globals.recordings.length - 1].duration = current_stage_ms;
    }
    // post('reported duration', current_stage_ms)
  }

  // tell to stop the recording
  message(REC, ['stop']);
}

// function for sending out a play
function startPlay(channel, name, speed, transpose, gainAdjust) {
  outletNum = {1: PLAY, 2: PLAY2, 3: PLAY3}[channel];
  message(outletNum, ['start', name, speed, transpose, gainAdjust, channel]);
}

// stop the play
function stopPlay(channels) {
  if (!Array.isArray(channels)) {
    channels = [channels]
  }

  if (includes(channels, 1)) {
    message(PLAY, ['stop']);
  }
  if (includes(channels, 2)) {
    message(PLAY2, ['stop']);
  }
  if (includes(channels, 3)) {
    message(PLAY3, ['stop']);
  }
}

// function for sending out a loop
function startLoop(channel, name, speed, pitch, gainAdjust) {
  outletNum = {1: LOOP, 2: LOOP2}[channel];
  message(outletNum, ['start', name, speed, pitch, gainAdjust]);
}

function stopLoop(channels) {
  if (!Array.isArray(channels)) {
    channels = [channels]
  }

  if (includes(channels, 1)) {
    message(LOOP, ['stop']);
  }
  if (includes(channels, 2)) {
    message(LOOP2, ['stop']);
  }
}

function startMidi(sampleName, fileName, useLoop, sampleSpeed, tempo, gainAdjust, transpose, noteOffDelay) {
  message(MIDI, ['start', sampleName, midiFolder + fileName, useLoop, sampleSpeed, tempo, gainAdjust, transpose, noteOffDelay])
}

function stopMidi() {
  message(MIDI, ['stop'])
}

function setReverb(value) {
  reverbObject = this.patcher.getnamed('reverbObject');
  reverbObject.message(['set', 'value', value]);
}

function setDelay(value) {
  delayObject = this.patcher.getnamed('delayObject');
  delayObject.message(['set', 'value', value]);
}

// Get the current timer value of the current stage
function updateCurrentStageMs() {
  theNumberObj = this.patcher.getnamed('current_stage_ms');
  theTempGrab = this.patcher.newdefault(0, 0, "grab", 1);
  this.patcher.connect(this.box, TEMP_OUTLET, theTempGrab, 0);
  this.patcher.connect(theTempGrab, 1, theNumberObj, 0);
  // thepre = this.patcher.newdefault(0, 0, "prepend", 'some prefix');
  this.patcher.connect(theTempGrab, 0, this.box, 1);
  outlet(TEMP_OUTLET, "bang");
  this.patcher.remove(theTempGrab);
  // this.patcher.remove(thepre);
}

function incrementStageIn(seconds) {
  outlet(STAGE, seconds*1000);
  outlet(STAGE, 'bang');
}

// Handle stage changes
function handleStageChange(n) { // n is stage number
  if (n <= stageData.length) {
    var metadata = stageData[n-1];
  }
  else {
    return;
  }
  

  if (!metadata) {
    post('\ninvalid stage number!')
    return
  }

  // RECORDING
  if (metadata.hasOwnProperty('rec')) {
    // only continue a recording if rec set to true
    if (metadata.rec !== true) {
      stopRec();

      // if we are supposed to record something
      if (metadata.rec !== false) { 
        startRec(metadata.rec.name);
      }
    }
    // otherwise rec is true, do nothing
  }
  


  // PLAYING
  if (metadata.hasOwnProperty('play')) {
    if (!Array.isArray(metadata.play)) {
      metadata.play = [metadata.play]
    }
    
    for (var i in metadata.play) {
      data = metadata.play[i];

      // Handle play attribute
      if (data.stop === true) {
        stopPlay(data.channels);
      }
      else { // if there is something to play
        if (!data.hasOwnProperty('channel')) {
          data.channel = 1
        }
        if (!data.hasOwnProperty('speed')) {
          data.speed = 1
        }	
        if (!data.hasOwnProperty('transpose')) {
          data.transpose = 0
        }
        if (!data.hasOwnProperty('gainAdjust')) {
          data.gainAdjust = 0;
        }
        startPlay(data.channel, data.name, data.speed, data.transpose, data.gainAdjust);
      }
      // if play is true then do nothing
    }
  }



  // LOOPING
  if (metadata.hasOwnProperty('loop')) {
    if (!Array.isArray(metadata.loop)) {
      metadata.loop = [metadata.loop]
    }
    
    for (var i in metadata.loop) {
      data = metadata.loop[i];

      // Handle loop attribute
      if (data.stop === true) {
        stopLoop(data.channels);
      }
      else {
        if (!data.hasOwnProperty('channel')) {
          data.channel = 1
        }
        if (!data.hasOwnProperty('speed')) {
          data.speed = 1
        }
        if (!data.hasOwnProperty('pitch')) {
          data.pitch = 0
        }
        if (!data.hasOwnProperty('gainAdjust')) {
          data.gainAdjust = 0;
        }
        startLoop(data.channel, data.name, data.speed, data.pitch, data.gainAdjust);
      }
    }
  }

  // MIDI PLAYBACK
  if (metadata.hasOwnProperty('midi')) {
    if (metadata.midi === false) {
      stopMidi();
    }
    else if (metadata.midi !== true) {
      if (!metadata.midi.hasOwnProperty('useLoop')) {
        metadata.midi.useLoop = false;
      }
      if (!metadata.midi.hasOwnProperty('sampleSpeed')) {
        metadata.midi.sampleSpeed = 1;
      }
      if (!metadata.midi.hasOwnProperty('tempo')) {
        metadata.midi.tempo = 120;
      }
      if (!metadata.midi.hasOwnProperty('gainAdjust')) {
        metadata.midi.gainAdjust = 0;
      }
      if (!metadata.midi.hasOwnProperty('transpose')) {
        metadata.midi.transpose = 0;
      }
      if (!metadata.midi.hasOwnProperty('noteOffDelay')) {
        metadata.midi.noteOffDelay = 0;
      }
      startMidi(metadata.midi.sampleName, metadata.midi.fileName, metadata.midi.useLoop, metadata.midi.sampleSpeed, metadata.midi.tempo, metadata.midi.gainAdjust, metadata.midi.transpose, metadata.midi.noteOffDelay)
    }
  }

  // AUTO STAGE INCREMENT (SECONDS)
  if (metadata.hasOwnProperty('duration')) {
    if (metadata.duration !== false) {
      incrementStageIn(metadata.duration);
    }
  }

  // SET REVERB
  if (metadata.hasOwnProperty('reverb')) {
    setReverb(metadata.reverb)
  }

  // SET DELAY
  if (metadata.hasOwnProperty('delay')) {
    setDelay(metadata.delay)
  }
}



// Handler for all (int) messages
function msg_int(n) {
  // Incoming stage number
  if (this.inlet === 0) {
    post('\njust got a stage number:', n);
    if (n == 0) {
      post('\nclearing variables');
      // clear stuff
      globals.recordings = [];

      // set the gain adjust sliders to default 127
      try {
        gainAdjustSlider = this.patcher.getnamed('gain~');
        if (gainAdjustSlider) {
          gainAdjustSlider.message(127);
        }
      }
      catch (error) {
        // post(JSON.stringify(error))
      }
      
      for (i = 1; i <= 50; i++) {
        try {
          gainAdjustSlider = this.patcher.getnamed('gain~[' + String(i) + ']');
          if (gainAdjustSlider) {
            gainAdjustSlider.message(127);
          }
        }
        catch (error) {
          // post(error)
        }
      }

      stopPlay([1,2,3]);
      stopLoop([1,2]);
      stopMidi();
      stopRec();
      setReverb(0);
      setDelay(0);
      this.patcher.getnamed('buffer_clearer').message('bang')
    }
    else if (n > stageData.length) {
      post('ALL STAGES DONE')
    }
    else {
      handleStageChange(n);
    }
  }

  // Incoming duration of current stage
  else if (this.inlet == 1) {
	  post('\njust got a duration:', n);
    current_stage_ms = n;
  }
}