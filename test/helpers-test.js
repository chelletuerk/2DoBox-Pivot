const assert = require('chai').assert
const chai = require('chai');

const {checkField, emptyIdeas} = require('../lib/helpers.js')



describe('checkField', function() {

  it('checkField should be a function', function() {
    assert.isFunction(checkField);
  });

});

describe('emptyIdeas', function() {

  it('emptyIdeas should be a function', function () {
    assert.isFunction(emptyIdeas);
  });

});
