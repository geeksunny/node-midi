const midi = require("../midi.js");

let output = new midi.output();
let input = new midi.input();

output.openVirtualPort("node-midi Virtual Output");
input.on('message', function(deltaTime, message) {
  console.log('m:' + message + ' d:' + deltaTime);
  output.sendMessage([
    message[0],
    message[1] + 10,
    message[2]
  ]);
});
input.openVirtualPort("node-midi Virtual Input");
setTimeout(function() {
  input.closePort();
  output.closePort();
}, 60000);
