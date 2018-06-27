const midi = require("../midi.js");

let input = new midi.input();

console.log('Is open ', input.isPortOpen());
input.openPort(0);
console.log('Is open ', input.isPortOpen());

input.closePort();
