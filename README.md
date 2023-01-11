# Memory-MIDI

"Memory MIDI" is a Max for Live device I created as a tool for live acoustic music with electronics. It allows one to record any segments of the piece and play or loop them back later with pitch, speed, and amplitude transformations, or trigger a MIDI file using the recorded segments (with the same possible transformations) as the sample. Thus, whatever the soloist or ensemble plays has the potential to be musical material, audio material, or both.

Plugin as it appears on the effect rack:
![Plugin as it appears on the effect rack](Memory%20MIDI%20screenshot.jpg)

Old screenshot of the patch:
![Old screenshot of the patch](Clarinet%20Piece%20Patch.png)

## Setup

Drag the entire Memory-MIDI folder into your `Ableton\User Library\Presets\Audio Effects\Max Audio Effect` folder.

## Usage

There are two main things you need to do to write a piece with Memory MIDI. First, you must provide data for what happens at each "stage" in the manner done in `clarinetData.js`, and if using MIDI files, you must also save them all in the same folder and specify the path.

If using Windows and you have AutoHotkey, Memory-MIDI will call a node.js script to run an AHK script that remaps `PgUp` and `PgDn` to `q` and `p` respectively. This will allow you to create a key binding in Ableton between a foot pedal (sending `PgUp` and `PgDn`) and `Prev/Next Stage` by using key maps. Then, you will not need to have the Memory-MIDI panel in focus in order to change stage numbers.