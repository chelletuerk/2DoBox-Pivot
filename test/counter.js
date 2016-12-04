const assert = require('chai').assert
const chai = require('chai');

const Counter = require('../lib/idea.js')

describe("Counter", function(){

  it.skip('should have a method called countTitle', function () {
    var counter = new Counter();
    assert.isFunction(Counter.countTitle);
  });

  it.skip('should have a method called countBody', function () {
    var counter = new Counter();
    assert.isFunction(Counter.countBody);
  });

});
