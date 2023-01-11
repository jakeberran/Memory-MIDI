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
    exports.bufferNames.push("rec" + String(k+1) + '_' + String(i))
  }
}



// TEMPOS
MVT_2_TEMPO = 144;
MVT_3_TEMPO = 63;
MVT_4_TEMPO = 80;

// Stage data
exports.stageData = [
  1,

  {
    rec: {
      name: 'rec1_1'
    }
  },

  2,

  {
    rec: {
      name: 'rec2_2'
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'rec2_1'
    }
  },

  {
    rec: false
  },

  {
    midi: {
      sampleName: 'rec2_2',
      fileName: 'fast 1 a1.mid',
      useLoop: false,
      gainAdjust: -8,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: -7
    }
  },

  {
    midi: {
      sampleName: 'rec2_2',
      fileName: 'fast 1 b1.mid',
      useLoop: false,
      gainAdjust: -8,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: -7
    }
  },
  
  {
    midi: {
      sampleName: 'rec2_2',
      fileName: 'fast 1 c1.mid',
      useLoop: true,
      gainAdjust: -8,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 0.5,
      transpose: 12
    }
  },

  {
    midi: {
      sampleName: 'rec2_1',
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
      sampleName: 'rec2_1',
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
      sampleName: 'rec2_2',
      fileName: 'fast 1 a3.mid',
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: -7
    }
  },

  {
    midi: {
      sampleName: 'rec2_1',
      fileName: 'fast 1 end.mid',
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_2_TEMPO,
      sampleSpeed: 1,
      transpose: 0
    }
  },

  {
    // do nothing
  },

  3, // MOVEMENT III

  {
    rec: {
      name: 'rec3_1' // the Eb one
    }
  },

  {
    rec: false
  },

  {
    midi: {
      sampleName: 'rec3_1',
      fileName: 'mvt 3 a.mid',
      useLoop: false,
      gainAdjust: -2,
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
      name: 'rec3_2' // the Db one
    }
  },

  {
    rec: false
  },

  {
    
    midi: {
      sampleName: 'rec3_1',
      fileName: 'mvt 3 b.mid',
      useLoop: false,
      gainAdjust: -2,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 9,
      noteOffDelay: 80
    }
  },

  { 
    midi: {
      sampleName: 'rec3_2',
      fileName: 'mvt 3 c.mid',
      useLoop: false,
      gainAdjust: -2,
      tempo: MVT_3_TEMPO,
      sampleSpeed: -1,
      transpose: 2,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'rec3_3' // the 124542
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'rec3_4' // the 542124
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'rec3_5' // the CGCBABAGFGA
    },

    midi: {
      fileName: 'mvt 3 d.mid', // first part of B section
      sampleName: 'rec3_3',
      useLoop: true,
      gainAdjust: -35,
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
      name: 'rec3_5',
      speed: -1,
      gainAdjust: -15,
      pitch: 12
    }
  },

  {
    midi: {
      fileName: 'mvt 3 e.mid', // b section of b section
      sampleName: 'rec3_4', // 542124
      useLoop: true,
      gainAdjust: -35,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 2,
      transpose: -11, // +1 minus an octave bc double speed
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'rec3_6' // first
    }
  },

  {
    rec: false
  },

  {
    midi: {
      fileName: 'mvt 3 f.mid',
      sampleName: 'rec3_6',
      useLoop: false,
      gainAdjust: 10,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 21,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'rec3_7' // second
    }
  },

  {
    rec: false
  },

  {
    midi: {
      fileName: 'mvt 3 g.mid',
      sampleName: 'rec3_7',
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
      name: 'rec3_8' // third
    }
  },

  {
    rec: false,

    midi: {
      fileName: 'mvt 3 h.mid',
      sampleName: 'rec3_8',
      useLoop: false,
      gainAdjust: -15,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 21,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'rec3_9' // fourth
    }
  },

  {
    rec: false
  },

  {
    midi: {
      fileName: 'mvt 3 i.mid',
      sampleName: 'rec3_9',
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_3_TEMPO,
      sampleSpeed: -1,
      transpose: -3,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'rec3_10' // fifth
    }
  },

  {
    rec: false,

    midi: {
      fileName: 'mvt 3 j.mid',
      sampleName: 'rec3_10', 
      useLoop: false,
      gainAdjust: 0,
      tempo: MVT_3_TEMPO,
      sampleSpeed: 1,
      transpose: 9,
      noteOffDelay: 50
    }
  },
  
  {
    // end of third movement
  },

  4, // MOVEMENT IV

  {
    rec: {
      name: 'rec4_1'
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'rec4_2'
    }
  },

  {
    rec: false
  },

  {
    loop: [
      {
        channel: 1,
        name: 'rec4_1',
        speed: 0.11,
        gainAdjust: -35
      },
      {
        channel: 2,
        name: 'rec4_1',
        speed: 0.005,
        pitch: -2,
        gainAdjust: -35
      }
    ],

    reverb: 1,
    delay: 0
  },

  {
    midi: {
      fileName: '4a.mid',
      sampleName: 'rec4_2', 
      useLoop: false,
      gainAdjust: -10,
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
        name: 'rec4_1',
        speed: 0.11,
        gainAdjust: -15
      },
      {
        channel: 2,
        name: 'rec4_1',
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
      sampleName: 'rec4_2', 
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_4_TEMPO,
      sampleSpeed: -1,
      transpose: -2,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'rec4_3'
    },

    loop: [
      {
        channel: 1,
        name: 'rec4_1',
        speed: 0.11,
        gainAdjust: -35
      },
      {
        channel: 2,
        name: 'rec4_1',
        speed: 0.005,
        pitch: -2,
        gainAdjust: -35
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
      name: 'rec4_4'
    }
  },

  {
    rec: false,

    midi: {
      fileName: '4c.mid',
      sampleName: 'rec4_2', 
      useLoop: false,
      gainAdjust: -10,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -2,
      noteOffDelay: 50
    }
  },

  {
    rec: {
      name: 'rec4_6'
    }
  },

  {
    rec: false,

    loop: [ // last loud
      {
        channel: 1,
        name: 'rec4_1',
        speed: 0.11,
        gainAdjust: -10
      },
      {
        channel: 2,
        name: 'rec4_1',
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
        name: 'rec4_1',
        speed: 0.2,
        pitch: -25,
        gainAdjust: -30
      },
      {
        channel: 2,
        name: 'rec4_1',
        speed: 0.15,
        pitch: -24,
        gainAdjust: -30
      }
    ],

    midi: {
      fileName: '4d.mid',
      sampleName: 'rec4_2', 
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
      sampleName: 'rec4_2', 
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
      sampleName: 'rec4_4', 
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
        name: 'rec4_1',
        speed: 0.3,
        pitch: -13,
        gainAdjust: -25
      },
      {
        channel: 2,
        name: 'rec4_1',
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
      sampleName: 'rec4_6', 
      useLoop: true,
      gainAdjust: 0,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: 5,
      noteOffDelay: 30
    }
  },

  {
    midi: {
      fileName: '4h.mid',
      sampleName: 'rec4_3', 
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
      name: 'rec4_5'
    }
  },

  {
    rec: false
  },

  {
    midi: {
      fileName: '4i.mid',
      sampleName: 'rec4_3', 
      useLoop: false,
      gainAdjust: 10,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -7,
      noteOffDelay: 30
    }
  },

  {
    midi: {
      fileName: '4j.mid',
      sampleName: 'rec4_5', 
      useLoop: true,
      gainAdjust: -10,
      tempo: MVT_4_TEMPO,
      sampleSpeed: 1,
      transpose: -2,
      noteOffDelay: 50
    },

    loop: [
      {
        channel: 1,
        name: 'rec4_1',
        speed: 0.5,
        pitch: 3,
        gainAdjust: -25
      },
      {
        channel: 2,
        name: 'rec4_1',
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
        name: 'rec4_1',
        speed: 75,
        gainAdjust: -50
      },
      {
        channel: 2,
        name: 'rec4_1',
        speed: 80,
        gainAdjust: -50
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

  5, // START OF MOVEMENT V

  {
    rec: {
      name: 'rec5_1'
    },

    reverb: 0.25,
    delay: 0
  },

  {
    rec: {
      name: 'rec5_2'
    }
  },

  {
    rec: false
  },

  {
    rec: {
      name: 'rec5_3'
    }
  },

  {
    rec: false
  },

  { // CEF#
    midi: {
      sampleName: 'rec5_1',
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
      sampleName: 'rec5_2',
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
      sampleName: 'rec5_3',
      fileName: '5c.mid',
      useLoop: false,
      gainAdjust: -10,
      tempo: 132,
      sampleSpeed: 1,
      transpose: 5
    }
  },

  {
    midi: false
  },

  6, // MOVEMENT VI
  
  {
    play: {
      name: 'rec1_1',
      speed: -1,
      gainAdjust: -10
    },
    reverb: 0.5
  },

  { // rite of spring clip
    midi: {
      sampleName: 'rec2_2',
      fileName: '6random2.mid',
      useLoop: false,
      gainAdjust: -40,
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
        name: 'rec4_1',
        speed: 0.11,
        gainAdjust: 5
      },
      {
        channel: 2,
        name: 'rec4_1',
        speed: 0.005,
        pitch: -2,
        gainAdjust: 5
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
      sampleName: 'rec3_1',
      fileName: '6random1.mid',
      useLoop: true,
      gainAdjust: -5,
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
      sampleName: 'rec2_2',
      fileName: 'fast 1 a1.mid',
      useLoop: false,
      gainAdjust: -10,
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
        name: 'rec2_1',
        speed: 0.5,
        gainAdjust: -50
      },
      {
        channel: 2,
        name: 'rec3_8',
        speed: 1,
        gainAdjust: -50
      },
      {
        channel: 3,
        name: 'rec5_2',
        speed: 0.2,
        gainAdjust: -50
      }
    ],
    loop: [
      {
        channel: 1,
        name: 'rec4_2',
        speed: 2,
        gainAdjust: -50
      },
      {
        channel: 2,
        name: 'rec5_1',
        speed: 3.5,
        gainAdjust: -50
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