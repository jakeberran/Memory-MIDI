autowatch = 1
var p = this.patcher

inlets = 1
outlets = 5

TOGGLE_REC = 0; // Outlet 0: bang to toggle record, or 1 / 0 to set record on or off
MSG_REC = 1; // Outlet 1: Set message value
SEND_MESSAGE = 2; // Outlet 2: Bang to trigger message send to record

globals = new Global('globals');

// wrapper for sending and triggering messages
function message(outlet_number, message) {
  outlet(outlet_number, message);
  outlet(SEND_MESSAGE, 'bang');
}

// function for finishing up a rec
function endRec() {
  // tell to stop the recording
  outlet(TOGGLE_REC, 0);
}

// function for starting a rec
function startRec(name) {
  var msg = ['set', name];
  message(MSG_REC, msg);
  outlet(TOGGLE_REC, 1);
}

// Function for receiving all input
// TODO get the arguments
function msg() {
  // post('\nARGS', arguments.length)
  var l = arguments;
  if (l[0] === 'start') {
    var name = l[1];
    startRec(name)
  }
  else if (l[0] === 'stop') {
    endRec()
  }
  else {
    post('Invalid list:', l)
  }
}