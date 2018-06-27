const midi = require("../midi.js");

const outputName = "node-midi Virtual Output";
const inputName = "node-midi Virtual Input";

let virtualOutput = new midi.output();
let virtualInput = new midi.input();

virtualOutput.openVirtualPort(outputName);
virtualInput.on('message', function(deltaTime, message) {
  console.log('Virtual input recieved m:' + message + ' d:' + deltaTime);
  virtualOutput.sendMessage([
    message[0],
    message[1] + 10,
    message[2]
  ]);
});
virtualInput.openVirtualPort(inputName);

setTimeout(function() {
  let output = new midi.output();
  let input = new midi.input();

  input.on('message', function(deltaTime, message) {
    console.log('Input recieved m:' + message + ' d:' + deltaTime);
  });

  console.log('Enumerating inputs');
  for (let i = 0; i < input.getPortCount(); ++i) {
    console.log('Input found: ' + input.getPortName(i));
    if (input.getPortName(i) == outputName) {
      console.log('Opening ' + input.getPortName(i));
      input.openPort(i);
    }
  }

  console.log('Enumerating outputs');
  for (let i = 0; i < output.getPortCount(); ++i) {
    console.log('Output found: ' + input.getPortName(i));
    if (output.getPortName(i) == inputName) {
      console.log('Opening ' + output.getPortName(i));
      output.openPort(i);
    }
  }

  let id = setInterval(function() {
    console.log('Sending message');
    output.sendMessage([144, 23, 81]);
  }, 1000);

  setTimeout(function() {
    clearInterval(id);

    setTimeout(function() {
      input.closePort();
      output.closePort();
      virtualInput.closePort();
      virtualOutput.closePort();
    }, 100);
  }, 10000);
}, 500);
