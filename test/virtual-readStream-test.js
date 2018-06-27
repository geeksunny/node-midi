const midi = require("../midi.js");
let virtualInput = new midi.input();
let output = new midi.output();
const assert = require('assert');
const payload = [144, 23, 81];
let called = false;

virtualInput.openVirtualPort("node-midi");

let reader = midi.createReadStream(virtualInput);
reader.pipe(process.stdout);
reader.on('data', function(buffer) {
  assert.deepEqual(buffer, new Buffer(payload));
  called = true;
});

for (let i = 0; i < output.getPortCount(); ++i) {
  if (output.getPortName(i) === 'node-midi') {
    output.openPort(i);
    break;
  }
}

output.sendMessage(payload);

setTimeout(function() {
  assert(called);
  process.exit(0);
}, 10);
