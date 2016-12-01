const assert = require('chai').assert
const chai = require('chai');

//const Idea = require('lib/idea.js')

it('is an Object', function(){
  var idea = new Idea();
  assert.isObject(idea);
});
