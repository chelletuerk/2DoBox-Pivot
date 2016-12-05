const assert = require('chai').assert
const chai = require('chai');

const Ideas = require('../lib/ideas.js');
const Idea = require('../lib/idea.js');

describe('Ideas', function(){

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

  it('deleteIdea should remove an idea from the array', function() {
      localStorage.clear();
      const idea = new Idea;
      const ideas = new Ideas;
      ideas.storeIdea(idea);
      assert.equal(1, ideas.all.length)
      const ideaId = ideas.all[0].id
      ideas.deleteIdea(ideaId)
      assert.equal(0, ideas.all.length)
  });

  it('should find an idea by its Id', function() {
    localStorage.clear();
    const idea = new Idea;
    const ideas = new Ideas;
    ideas.storeIdea(idea);
    const foundIdea = ideas.findIdeaById(idea.id);
    assert.deepEqual(idea, foundIdea);
  });

  it('should find an idea by its quality', function() {
    localStorage.clear();
    const idea = new Idea;
    const ideas = new Ideas;
    ideas.storeIdea(idea);
    const foundIdea = ideas.findIdeaByQuality(idea.quality);
    assert.deepEqual(idea, foundIdea[0]);
  });
});
