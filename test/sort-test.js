const assert = require('chai').assert;
const chai = require('chai');
const Sort = require('../lib/sort.js');

describe("Sort", function() {

const fakeIdeas = [
  {title: 'haha', quality: 'critical'},
  {title: 'omg', quality: 'high'}
];

  it('should have order be false', function() {
    const sort = new Sort();
    assert.equal(false, sort.order);
  });

  it('should have an up key to quality changers', function() {
    const sort = new Sort();
    const up = {
      critical: "critical",
      high: "critical",
      normal: "high",
      low: "normal",
      none: "low"
    }
    assert.deepEqual(up, sort.qualityChangers.up);
  })

    it('should have an up key to quality changers', function() {
      const sort = new Sort();
      const down = {
        critical: "high",
        high: "normal",
        normal: "low",
        low: "none",
        none: "none"
      }
      assert.deepEqual(down, sort.qualityChangers.down);
    });

  it('should have order be false', function() {
    const sort = new Sort();
    assert.equal(false, sort.order);
  });

  it('should up sort a basic array of ideas', function() {
    const sort = new Sort();
    const upSorted = sort.upSort(fakeIdeas);
    assert.equal('haha', upSorted[0].title);
  });

  it('should down sort a basic array of ideas', function() {
    const sort = new Sort();
    const downSorted = sort.downSort(fakeIdeas);
    assert.equal('omg', downSorted[0].title);
  });

  it('should have a sort key', function() {
    const sort = new Sort();
    const sortKey = {
      critical: 4,
      high: 3,
      normal: 2,
      low: 1,
      none: 0
    }
    assert.deepEqual(sortKey, sort.sortKey);
  })



});
