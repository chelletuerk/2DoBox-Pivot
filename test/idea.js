const assert = require('chai').assert
const chai = require('chai');

const Idea = require('../lib/idea.js')



describe("Idea", function(){

  it('should take the first argument and set it as the "title" property', function () {
    var idea = new Idea('Best');
    assert.equal(idea.title, 'Best');
  });

  it('should take the second argument and set it as the "body" property', function () {
    var idea = new Idea('Best', 'Ever');
    assert.equal(idea.body, 'Ever');
  });

  it('shouldhave a default quality of "normal"', function(){
    var idea = new Idea('Best', 'Ever');
    assert.equal(idea.quality, 'normal')
  });

  it('shouldhave a default completed value of "false"', function(){
    var idea = new Idea('Best', 'Ever');
    assert.equal(idea.completed, false)
  });

});
