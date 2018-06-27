const midi = require("../midi.js");
let virtualInput = new midi.input();
let output = new midi.output();
const assert = require('assert');
const fs = require('fs');
const expect = [144, 23, 81];
let called = false;
let writer = midi.createWriteStream(output);

virtualInput.openVirtualPort("node-midi");
virtualInput.on('message', function(deltaTime, buffer) {
  assert.deepEqual(buffer, expect);
  called = true;
});


for (var i = 0; i < output.getPortCount(); ++i) {
  if (output.getPortName(i) === 'node-midi') {
    output.openPort(i);
    break;
  }
}

fs.createReadStream(__dirname + '/fixture/144-23-81.bin').pipe(writer);

setTimeout(function() {
  assert(called);
  output.closePort();
  virtualInput.closePort();
  process.exit(0);
}, 100);
