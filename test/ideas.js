const assert = require('chai').assert
const chai = require('chai');

const Ideas = require('../lib/ideas.js')
const Idea = require('../lib/idea.js')



describe("Ideas", function(){

  it('should have store idea as a method', function () {
    const ideas = new Ideas;
    assert.isFunction(ideas.storeIdea);
  });

  it('storeIdea should push an argument to the array', function(){
    localStorage.clear()
    const idea = new Idea;
    const ideas = new Ideas;
    ideas.storeIdea(idea);
    assert.deepEqual(ideas.all[0], idea)
  });



});
