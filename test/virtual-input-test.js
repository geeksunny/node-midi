const midi = require("../midi.js");

let input = new midi.input();
input.on('message', function(deltaTime, message) {
  console.log('m:' + message + ' d:' + deltaTime);
});
input.openVirtualPort("node-midi Virtual Input");
setTimeout(function() {
  input.closePort();
}, 20000);
