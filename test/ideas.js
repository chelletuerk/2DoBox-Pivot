const assert = require('chai').assert
const chai = require('chai');

const Ideas = require('../lib/ideas.js')



describe("Ideas", function(){

  it('should take the first argument and set it as the "title" property', function () {
    var idea = new Idea('Best');
    assert.equal(idea.title, 'Best');
  });



});
