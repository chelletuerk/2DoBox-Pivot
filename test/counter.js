const assert = require('chai').assert
const chai = require('chai');

const Counter = require('../lib/counter.js')

describe("Counter", function(){

  it('should have a method called countTitle', function () {
    const counter = new Counter();
    assert.isFunction(counter.countTitle);
  });

  it('should have a method called countBody', function () {
    const counter = new Counter();
    assert.isFunction(counter.countBody);
  });

});
