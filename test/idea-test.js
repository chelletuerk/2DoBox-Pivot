const assert = require('chai').assert
const chai = require('chai');

const Idea = require('../lib/idea.js')




describe("Idea", function(){

  it('is an Object', function(){
    var idea = new Idea();
    assert.isObject(idea);
  });

  it('should be a function', function () {
    var idea = new Idea();
    assert.isFunction(idea);
  });

  it('should take the first argument and set it as the "title" property', function () {
    var idea = new Idea('Best');
    assert.equal(idea.title, 'Best');
  });

  it('should take the second argument and set it as the "body" property', function () {
    var idea = new Idea('Best', 'Ever');
    assert.equal(idea.body, 'Ever');
  });



});
