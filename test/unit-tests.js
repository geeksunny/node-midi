const should = require('should');
const EventEmitter = require('eventemitter3');
const Midi = require('../midi');

describe('midi.input', function() {
  it('should raise when not called with new', function() {
    (function() {
      Midi.input();
    }).should.throw('Use the new operator to create instances of this object.');
  });

  it('should be an emitter', function() {
    let input = new Midi.input();
    input.should.be.an.instanceOf(EventEmitter);
  });

  describe('.getPortCount', function() {
    let input = new Midi.input();
    it('should return an integer', function() {
      // I feel like having more than 255 ports indicates a problem.
      input.getPortCount().should.be.within(0, 255);
    });
  });

  describe('.getPortName', function() {
    let input = new Midi.input();

    it('requires an argument', function() {
      (function() {
        input.getPortName();
      }).should.throw('First argument must be an integer');
    });

    it('requires an integer', function() {
      (function() {
        input.getPortName('asdf');
      }).should.throw('First argument must be an integer');
    });

    it('returns an empty string for unknown port', function() {
      input.getPortName(999).should.eql('');
    });
  });

  describe('.openPort', function() {
    let input = new Midi.input();

    it('requires an argument', function() {
      (function() {
        input.openPort();
      }).should.throw('First argument must be an integer');
    });

    it('requires an integer', function() {
      (function() {
        input.openPort('asdf');
      }).should.throw('First argument must be an integer');
    });

    it('requires a valid port', function() {
      (function() {
        input.openPort(999);
      }).should.throw('Invalid MIDI port number');
    });
  });

  describe('.openVirtualPort', function() {
    let input = new Midi.input();

    it('requires an argument', function() {
      (function() {
        input.openVirtualPort();
      }).should.throw('First argument must be a string');
    });

    it('requires a string', function() {
      (function() {
        input.openVirtualPort(999);
      }).should.throw('First argument must be a string');
    });
  });

  describe('.closePort', function() {
    let input = new Midi.input();

    it('allows you to close a port that was not opened', function() {
      input.closePort();
    });
  });
});

describe('midi.output', function() {
  it('should raise when not called with new', function() {
    (function() {
      Midi.output();
    }).should.throw('Use the new operator to create instances of this object.');
  });

  it('should not be an emitter', function() {
    let output = new Midi.output();
    output.should.not.be.an.instanceOf(EventEmitter);
  });

  describe('.getPortCount', function() {
    let output = new Midi.output();
    it('should return an integer', function() {
      // I feel like having more than 255 ports indicates a problem.
      output.getPortCount().should.be.within(0, 255);
    });
  });

  describe('.getPortName', function() {
    let output = new Midi.output();

    it('requires an argument', function() {
      (function() {
        output.getPortName();
      }).should.throw('First argument must be an integer');
    });

    it('requires an integer', function() {
      (function() {
        output.getPortName('asdf');
      }).should.throw('First argument must be an integer');
    });

    it('returns an empty string for unknown port', function() {
      output.getPortName(999).should.eql('');
    });
  });

  describe('.openPort', function() {
    let output = new Midi.output();

    it('requires an argument', function() {
      (function() {
        output.openPort();
      }).should.throw('First argument must be an integer');
    });

    it('requires an integer', function() {
      (function() {
        output.openPort('asdf');
      }).should.throw('First argument must be an integer');
    });

    it('requires a valid port', function() {
      (function() {
        output.openPort(999);
      }).should.throw('Invalid MIDI port number');
    });
  });

  describe('.openVirtualPort', function() {
    let output = new Midi.output();

    it('requires an argument', function() {
      (function() {
        output.openVirtualPort();
      }).should.throw('First argument must be a string');
    });

    it('requires a string', function() {
      (function() {
        output.openVirtualPort(999);
      }).should.throw('First argument must be a string');
    });
  });

  describe('.closePort', function() {
    let output = new Midi.output();

    it('allows you to close a port that was not opened', function() {
      output.closePort();
    });
  });
});
