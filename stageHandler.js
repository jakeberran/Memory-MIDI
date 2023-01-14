var midiFolder;
var stageData;
var movements;
var dir;
var prerecs = [];

function load(jsFilename) {
  // post(jsFilename)
  data = require(jsFilename)
  try {
    midiFolder = data.midiFolder
    stageData = [];
    movements = {}; // treat as array, with integer keys
    // post('orig length', data.stageData.length)
    for (i = 0; i < data.stageData.length; i++) {
      stageDatum = data.stageData[i];
      if (typeof stageDatum ==  'number') {
        movements[stageDatum] = {
          stageNum: i - stageDatum + 1, // so movement 1 starts at 0, and each one is adjusted by one more
          enabled: true 
        }
      }
      else {
        stageData.push(stageDatum)
      }
    }
    // post('split length', stageData.length, '+', Object.keys(movements).length)
    // TODO also have this edit the values of the number hotkey stage numbers
    this.patcher.getnamed('numOfStages').message(stageData.length)
  } catch (error) {
    post('Error in loading data:', error.message)
  }
  // post('Getting MIDI files from', midiFolder)
}

// Update the movements which are included
function setMovements() {
  post(arguments)
  try {
    binaryArray = arguments

    for (i = 0; i < Object.keys(binaryArray).length; i++) {
      // post(JSON.stringify(movements[i+1]))
      if (binaryArray[i] == 1) {
        movements[i+1].enabled = true;
      }
      else {
        movements[i+1].enabled = false;
      }
    }
    // post(JSON.stringify(movements))
  }
  catch (error) {
    post(error.message)
  }
}

// List elements in a folder
function listFolder(path)
{
  out = [];
  
  f = new Folder(path);
  while(!f.end)
  {
    if (f.filetype != 'fold') {
      out.push(f.filename); // excludes subfolders, idk why
    }
    f.next();
  }

  return out;
}

function setPrerecs() {
  if (arguments[0] == 0) {
    prerecs = [];
  }
  else if (arguments[0] == 1) {
    prerecs = [];
    folderPath = arguments[1];

    filenames = listFolder(folderPath);

    prerecQueue = this.patcher.getnamed('prerecQueue')
    // clear the name queue
    prerecQueue.message('zlclear');

    // loop over the file names and set up the connections
    for (i in filenames) {
      filename = filenames[i];
      bufferName = filename.split('.')[0];

      if (bufferName) {
        prerecs.push({
          name: bufferName,
          duration: null // appended from sfinfo later
        })

        // connect the right things
        bufferImport = this.patcher.getnamed('bufferImport');
        buffer = null;
        try {
          buffer = this.patcher.getnamed('buffer_' + bufferName);
        }
        catch (error) {
          post('Skipping unknown prerecording name', bufferName);
          continue;
        }
        bufferInfo = this.patcher.getnamed('bufferInfo');
        
        this.patcher.connect(bufferImport, 0, buffer, 0);
        this.patcher.connect(buffer, 1, bufferInfo, 0);
      }
    }

    // now send all the messages
    for (i in filenames) {
      filename = filenames[i];
      bufferName = filename.split('.')[0];

      if (bufferName) {
        // send the message to set off everything
        this.patcher.getnamed('prerecPath').message([bufferName, folderPath + filename])
      }
    }
    
    this.patcher.getnamed('horribleWorkaround').message('bang'); // todo fix this, last one doesn't get banged properly
  }
  else {
    post('Unexpected first argument in setPrerecs:', arguments[0])
  }
}

function loadPrerecLength(ms, name) {
  for (i in prerecs) {
    if (prerecs[i].name == name) {
      // post('MATCH', ms, name)
      prerecs[i].duration = ms;
    }
  }

  post(JSON.stringify(prerecs));

  // clear out the patch cords
  buffer = this.patcher.getnamed('buffer_' + name);
  bufferInfo = this.patcher.getnamed('bufferInfo');
  bufferImport = this.patcher.getnamed('bufferImport');
  this.patcher.disconnect(buffer, 1, bufferInfo, 0);
  this.patcher.disconnect(bufferImport, 0, buffer, 0);
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
  for (i in prerecs) { // loop over indices
    prerec = prerecs[i];
    if (prerec.name == name) {
      globals.recordings.push({
        name: name,
        duration: prerec.duration
      })
      return; // leave, don't start recording
    }
  }
  // record normally if not a specified prerec
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
    else if (n === stageData.length) {
      handleStageChange(n);
    }
    else if (n > stageData.length) { // because it takes stageData[n-1]
      post('ALL STAGES DONE')
      this.patcher.getnamed('counter').message('dec')
    }
    else {
      mvts = Object.keys(movements).map(function(key) {
        return movements[key];
      })

      // add on a dummy last stage so that the last movement can be correctly described
      mvts.push({
        stageNum: stageData.length + 1,
        enabled: false
      }) 

      try {
        for (i = 0; i < mvts.length-1; i++) {
          if (mvts[i].stageNum <= n && n < mvts[i+1].stageNum) { // is within the ith movement (from that stageNum), inclusive of that movement's stated stageNum
            if (mvts[i].enabled) {
              handleStageChange(n);
            }
            else if (mvts[i+1]) { // movement not enabled, so recursively go to the next movement start if applicable
              post('SKIPPING MVT', i+1)
              cntr = this.patcher.getnamed('counter')
              cntr.message(['set', Math.min(mvts[i+1].stageNum, stageData.length)])
              cntr.message('bang')
            }
            break; // stop the loop once we've found the movement we're potentially in
          }
        }
      } catch (error) {
        post('Error in processing non-zero valid stage number: ', error.message)
      }
    }
  }

  // Incoming duration of current stage
  else if (this.inlet == 1) {
	  post('\njust got a duration:', n);
    current_stage_ms = n;
  }
}