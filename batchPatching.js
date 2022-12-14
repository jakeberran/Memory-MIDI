var data;

function load(jsFilename) {
  post(jsFilename);
  data = require(jsFilename);
  deleteBuffers();
  createBuffers();
}

autowatch = 1;

var clearMsg = this.patcher.getnamed('buffer_clearer');

function createBuffers() {
  var totalCount = 0;
  for (i = 0; i < data.bufferNames.length; i++) {
    bufferName = data.bufferNames[i];
    var objName = "buffer~ " + bufferName + " 180000" // max length of a minute
    var buffer = this.patcher.newdefault(1800, 200 + 50*totalCount, objName)
    this.patcher.connect(clearMsg, 0, buffer, 0);
    totalCount++
  }
}

function deleteBuffers() {
  o = this.patcher.firstobject
  while (o) {
    next = o.nextobject
    // post(o.maxclass)
    if (o.maxclass == 'buffer~') {
      this.patcher.remove(o)
    }
    o = next
  }
}