// Data for Six Etudes for bass clarinet and electronics

// Folder with midi files
exports.midiFolder = 'C:/Users/jacob/Local Documents/Ableton/User Library/Presets/Audio Effects/Max Audio Effect/Memory MIDI/Six Etudes/Cut Midi Files'

if (exports.midiFolder.charAt(exports.midiFolder.length - 1) != '/') {
  exports.midiFolder += '/'
}

// Buffer names
exports.bufferNames = [];

var numOfBuffers = [1, 2, 10, 10, 3]

for (var k = 0; k < numOfBuffers.length; k++) {
  for (var i = 1; i <= numOfBuffers[k]; i++) {
    exports.bufferNames.push("stage" + String(k+1) + '_' + String(i))
  }
}



// TEMPOS
MVT_2_TEMPO = 144;
MVT_3_TEMPO = 63;
MVT_4_TEMPO = 80;

// Stage data
exports.stageData = [
  // 1
  {
    rec: {
      name: 'stage1_1'
    }
  },

  {
    rec: {
      name: 'stage2_2'
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'stage2_1'
    }
  },

  {
    rec: false
  },

  // 6
  {
    midi: {
      sampleName: 'stage2_2',
      fileName: 'fast 1 a1.mid',
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: -7
    }
  },

  {
    midi: {
      sampleName: 'stage2_2',
      fileName: 'fast 1 b1.mid',
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: -7
    }
  },
  
  {
    midi: {
      sampleName: 'stage2_2',
      fileName: 'fast 1 c1.mid',
      useLoop: true,
      gainAdjust: 0,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 0.5,
      transpose: 12
    }
  },

  {
    midi: {
      sampleName: 'stage2_1',
      fileName: 'fast 1 c2.mid',
      useLoop: true,
      gainAdjust: 0,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 0.25,
      transpose: 24
    }
  },

  {
    midi: {
      sampleName: 'stage2_1',
      fileName: 'fast 1 a2.mid',
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: 0
    }
  },

  {
    midi: {
      sampleName: 'stage2_2',
      fileName: 'fast 1 a3.mid',
      useLoop: false,
      gainAdjust: 20,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: -7
    }
  },

  {
    midi: {
      sampleName: 'stage2_1',
      fileName: 'fast 1 end.mid',
      useLoop: false,
      gainAdjust: 20,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: 0
    }
  },

  {
    // do nothing
  },

  // III
  {
    rec: {
      name: 'stage3_1' // the Eb one
    }
  },

  {
    rec: false
  },

  {
    midi: {
      sampleName: 'stage3_1',
      fileName: 'mvt 3 a.mid',
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 9,
      noteOffDelay: 80
    },

    reverb: 1,
    delay: 0
  },

  {
    rec: {
      name: 'stage3_2' // the Db one
    }
  },

  {
    rec: false
  },

  {
    
    midi: {
      sampleName: 'stage3_1',
      fileName: 'mvt 3 b.mid',
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 9,
      noteOffDelay: 80
    }
  },

  { 
    midi: {
      sampleName: 'stage3_2',
      fileName: 'mvt 3 c.mid',
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: -1,
      transpose: 2,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'stage3_3' // the 124542
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'stage3_4' // the 542124
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'stage3_5' // the CGCBABAGFGA
    },

    midi: {
      fileName: 'mvt 3 d.mid', // first part of B section
      sampleName: 'stage3_3',
      useLoop: true,
      gainAdjust: -40,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 2,
      transpose: -5, // +7 minus an octave
      noteOffDelay: 50
    },

    reverb: 0.5
  },

  {
    rec: false
  },

  {
    play: {
      name: 'stage3_5',
      speed: -1,
      gainAdjust: -15,
      pitch: 12
    }
  },

  {
    midi: {
      fileName: 'mvt 3 e.mid', // b section of b section
      sampleName: 'stage3_4', // 542124
      useLoop: true,
      gainAdjust: -40,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 2,
      transpose: -11, // +1 minus an octave bc double speed
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'stage3_6' // first
    }
  },

  {
    rec: false
  },

  {
    midi: {
      fileName: 'mvt 3 f.mid',
      sampleName: 'stage3_6',
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 21,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'stage3_7' // second
    }
  },

  {
    rec: false
  },

  {
    midi: {
      fileName: 'mvt 3 g.mid',
      sampleName: 'stage3_7',
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: -1,
      transpose: -8,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'stage3_8' // third
    }
  },

  {
    rec: false,

    midi: {
      fileName: 'mvt 3 h.mid',
      sampleName: 'stage3_8',
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 21,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'stage3_9' // fourth
    }
  },

  {
    rec: false
  },

  {
    midi: {
      fileName: 'mvt 3 i.mid',
      sampleName: 'stage3_9',
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: -1,
      transpose: -3,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'stage3_10' // fifth
    }
  },

  {
    rec: false,

    midi: {
      fileName: 'mvt 3 j.mid',
      sampleName: 'stage3_10', 
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 9,
      noteOffDelay: 50
    }
  },
  
  {
    // end of third movement
  },

  // IV
  {
    rec: {
      name: 'stage4_1'
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'stage4_2'
    }
  },

  {
    rec: false
  },

  {
    loop: [
      {
        channel: 1,
        name: 'stage4_1',
        speed: 0.11,
        gainAdjust: -40
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 0.005,
        pitch: -2,
        gainAdjust: -40
      }
    ],

    reverb: 1,
    delay: 0
  },

  {
    midi: {
      fileName: '4a.mid',
      sampleName: 'stage4_2', 
      useLoop: false,
      gainAdjust: 20,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -2,
      noteOffDelay: 50
    }
  },

  {
    loop: [
      {
        channel: 1,
        name: 'stage4_1',
        speed: 0.11,
        gainAdjust: -15
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 0.005,
        pitch: -2,
        gainAdjust: -15
      }
    ],

    reverb: 1,
    delay: 0
  },

  {
    midi: {
      fileName: '4b.mid',
      sampleName: 'stage4_2', 
      useLoop: false,
      gainAdjust: 30,
      tempo: MVT_4_TEMPO,
      sampleSpeed: -1,
      transpose: -2,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'stage4_3'
    },

    loop: [
      {
        channel: 1,
        name: 'stage4_1',
        speed: 0.11,
        gainAdjust: -40
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 0.005,
        pitch: -2,
        gainAdjust: -40
      }
    ],

    reverb: 0,
    delay: 1
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'stage4_4'
    }
  },

  {
    rec: false,

    midi: {
      fileName: '4c.mid',
      sampleName: 'stage4_2', 
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -2,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'stage4_6'
    }
  },

  {
    rec: false,

    loop: [ // last loud
      {
        channel: 1,
        name: 'stage4_1',
        speed: 0.11,
        gainAdjust: -10
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 0.005,
        pitch: -2,
        gainAdjust: -10
      }
    ],

    reverb: 1,
    delay: 1
  },

  {
    loop: [ // low
      {
        channel: 1,
        name: 'stage4_1',
        speed: 0.2,
        pitch: -25,
        gainAdjust: -30
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 0.15,
        pitch: -24,
        gainAdjust: -30
      }
    ],

    midi: {
      fileName: '4d.mid',
      sampleName: 'stage4_2', 
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 2,
      transpose: -14,
      noteOffDelay: 20
    },

    reverb: 1,
    delay: 0.7
  },

  {
    midi: {
      fileName: '4e.mid',
      sampleName: 'stage4_2', 
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -2,
      noteOffDelay: 50
    }
  },

  {
    midi: {
      fileName: '4f.mid',
      sampleName: 'stage4_4', 
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: 5,
      noteOffDelay: 30
    }
  },

  {
    loop: [ // med
      {
        channel: 1,
        name: 'stage4_1',
        speed: 0.3,
        pitch: -13,
        gainAdjust: -25
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 0.2,
        pitch: -12,
        gainAdjust: -25
      }
    ],

    reverb: 1,
    delay: 0.5
  },

  {
    midi: {
      fileName: '4g.mid',
      sampleName: 'stage4_6', 
      useLoop: true,
      gainAdjust: 30,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: 5,
      noteOffDelay: 30
    }
  },

  {
    midi: {
      fileName: '4h.mid',
      sampleName: 'stage4_3', 
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -7,
      noteOffDelay: 30
    }
  },

  {
    rec: {
      name: 'stage4_5'
    }
  },

  {
    rec: false
  },

  {
    midi: {
      fileName: '4i.mid',
      sampleName: 'stage4_3', 
      useLoop: false,
      gainAdjust: 20,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -7,
      noteOffDelay: 30
    }
  },

  {
    midi: {
      fileName: '4j.mid',
      sampleName: 'stage4_5', 
      useLoop: true,
      gainAdjust: -25,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -2,
      noteOffDelay: 50
    },

    loop: [
      {
        channel: 1,
        name: 'stage4_1',
        speed: 0.5,
        pitch: 3,
        gainAdjust: -25
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 0.75,
        pitch: -1,
        gainAdjust: -25
      }
    ],

    reverb: 1,
    delay: 1
  },

  {
    midi: false
  },

  {

    loop: [
      {
        channel: 1,
        name: 'stage4_1',
        speed: 75,
        gainAdjust: -40
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 80,
        gainAdjust: -40
      }
    ],

    reverb: 1,
    delay: 1
  },

  {
    loop: {
      stop: true,
      channels: [1,2]
    }
  },

  // START OF MOVEMENT V
  {
    rec: {
      name: 'stage5_1'
    },

    reverb: 0.25,
    delay: 0
  },

  {
    rec: {
      name: 'stage5_2'
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'stage5_3'
    }
  },

  {
    rec: false
  },

  { // CEF#
    midi: {
      sampleName: 'stage5_1',
      fileName: '5a.mid',
      useLoop: false,
      gainAdjust: -20,
      tempo: 132,
      sampleSpeed: 1,
      transpose: 12
    }
  },

  { // CDb
    midi: {
      sampleName: 'stage5_2',
      fileName: '5b.mid',
      useLoop: true,
      gainAdjust: -20,
      tempo: 132,
      sampleSpeed: 1,
      transpose: 0
    }
  },

  { // CEF#
    midi: {
      sampleName: 'stage5_3',
      fileName: '5c.mid',
      useLoop: false,
      gainAdjust: -20,
      tempo: 132,
      sampleSpeed: 1,
      transpose: 5
    }
  },

  {
    midi: false
  },

  // START OF MOVEMENT VI
  {
    play: {
      name: 'stage1_1',
      speed: -1,
      gainAdjust: -10
    },
    reverb: 0.5
  },

  { // rite of spring clip
    midi: {
      sampleName: 'stage2_2',
      fileName: '6random2.mid',
      useLoop: false,
      gainAdjust: -30,
      tempo: 110,
      sampleSpeed: 1,
      transpose: -7
    }
  },

  {
    midi: false
  },

  { // movement 4 clip
    loop: [
      {
        channel: 1,
        name: 'stage4_1',
        speed: 0.11,
        gainAdjust: 20
      },
      {
        channel: 2,
        name: 'stage4_1',
        speed: 0.005,
        pitch: -2,
        gainAdjust: 20
      }
    ]
  },

  {
    loop: {
      stop: true,
      channels: [1,2]
    }
  },

  {
    midi: { // moonlight sonata clip
      sampleName: 'stage3_1',
      fileName: '6random1.mid',
      useLoop: true,
      gainAdjust: 25,
      tempo: 100,
      sampleSpeed: 1,
      transpose: 9
    }
  },

  {
    midi: false
  },

  { // movement 2 clip
    midi: {
      sampleName: 'stage2_2',
      fileName: 'fast 1 a1.mid',
      useLoop: false,
      gainAdjust: 20,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: -7
    }
  },

  {
    midi: false
  },

  { // final messy thing
    play: [
      {
        channel: 1,
        name: 'stage2_1',
        speed: 0.5,
        gainAdjust: -10
      },
      {
        channel: 2,
        name: 'stage3_8',
        speed: 1,
        gainAdjust: -10
      },
      {
        channel: 3,
        name: 'stage5_2',
        speed: 0.2,
        gainAdjust: -10
      }
    ],
    loop: [
      {
        channel: 1,
        name: 'stage4_2',
        speed: 2,
        gainAdjust: -10
      },
      {
        channel: 2,
        name: 'stage5_1',
        speed: 3.5,
        gainAdjust: -10
      }
    ]
  },

  {
    play: {
      stop: true,
      channels: [1,2,3]
    },
    loop: {
      stop: true,
      channels: [1,2]
    }
  }

]