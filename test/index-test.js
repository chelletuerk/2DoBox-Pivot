const chai = require('chai');
const assert = require('chai').assert;
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('our test bundle', function () {
  var driver;
  test.beforeEach(function(){
    this.timeout(10000)
    driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get('http://localhost:8080');
  })

  test.afterEach(function(){
    driver.quit()
  })

  test.it('should work', function () {
    driver.findElement({id: 'title'}).sendKeys('Work')
    driver.findElement({id: 'body'}).sendKeys('Please')
    driver.findElement({id: 'save'}).click()
    driver.findElement({id: 'idea-body'}).then(function(body){
      return body.getText();
    }).then(function(bodytext){
      assert.equal(bodytext, "Please")
    })

    driver.findElement({id: 'idea-title'}).then(function(title){
      return title.getText()
    }).then(function(text){
      assert.equal(text, "Work")
    })
  })

  test.it('should delete an element off the dom', function() {
    driver.findElement({id: 'title'}).sendKeys('This is a title');
    driver.findElement({id: 'body'}).sendKeys('This is a task');
    driver.findElement({id: 'save'}).click();
    driver.findElement({id: 'delete-btn'}).click();
    const ideas = driver.findElement({id: 'ideas'});
    ideas.getText().then(function(html) {
      assert.equal("", html);
    })
  })

  test.it('should count characters in text fields', function() {
    driver.findElement({id: 'title'}).sendKeys('xxx');
    const titleCount = driver.findElement({id: 'titleCount'})
    titleCount.getText().then(function(count) {
      assert.equal("Total Characters: 3", count)
    })
  })

    test.it('should count characters in text fields', function() {
      driver.findElement({id: 'body'}).sendKeys('xxxx');
      const bodyCount = driver.findElement({id: 'bodyCount'})
      bodyCount.getText().then(function(count) {
        assert.equal("Total Characters: 4", count)
      })
    })

    test.it('should be able to change up quality', function() {
      driver.findElement({id: 'title'}).sendKeys('This is a title');
      driver.findElement({id: 'body'}).sendKeys('This is a task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'up-btn'}).click();
      const quality = driver.findElement({id: 'quality'});
      quality.getText().then(function(html) {
        assert.equal("quality: high", html);
      })
    })

    test.it('should be able to change down quality', function() {
      driver.findElement({id: 'title'}).sendKeys('This is a title');
      driver.findElement({id: 'body'}).sendKeys('This is a task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'down-btn'}).click();
      const quality = driver.findElement({id: 'quality'});
      quality.getText().then(function(html) {
        assert.equal("quality: low", html);
      })
    })

    test.it('should be able to sort ideas by quality', function() {
      driver.findElement({id: 'title'}).sendKeys('Critical');
      driver.findElement({id: 'body'}).sendKeys('Task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'up-btn'}).click();
      driver.findElement({id: 'up-btn'}).click();
      driver.findElement({id: 'title'}).sendKeys('High');
      driver.findElement({id: 'body'}).sendKeys('Task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'up-btn'}).click();
      driver.findElement({id: 'title'}).sendKeys('Normal');
      driver.findElement({id: 'body'}).sendKeys('Task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Low');
      driver.findElement({id: 'body'}).sendKeys('Task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'down-btn'}).click();
      driver.findElement({id: 'title'}).sendKeys('None');
      driver.findElement({id: 'body'}).sendKeys('Task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'down-btn'}).click();
      driver.findElement({id: 'down-btn'}).click();
      driver.findElement({id: 'sort'}).click();
      const firstTitle = driver.findElement({id: 'idea-title'});
      firstTitle.getText().then(function(html) {
        assert.equal("Critical", html);
      })
    })

    test.it('should display ideas with low quality', function() {
      driver.findElement({id: 'title'}).sendKeys('This is a title');
      driver.findElement({id: 'body'}).sendKeys('This is a task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'down-btn'}).click();
      driver.findElement({id: 'low'}).click();
      const quality = driver.findElement({id: 'quality'});
      quality.getText().then(function(html) {
        assert.equal("quality: low", html);
      })
    })

    test.it('should display ideas with none quality', function() {
      driver.findElement({id: 'title'}).sendKeys('This is a title');
      driver.findElement({id: 'body'}).sendKeys('This is a task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'down-btn'}).click();
      driver.findElement({id: 'down-btn'}).click();
      driver.findElement({id: 'none'}).click();
      const quality = driver.findElement({id: 'quality'});
      quality.getText().then(function(html) {
        assert.equal("quality: none", html);
      })
    })

    test.it('should display ideas with normal quality', function() {
      driver.findElement({id: 'title'}).sendKeys('This is a title');
      driver.findElement({id: 'body'}).sendKeys('This is a task');
      driver.findElement({id: 'save'}).click();
      const quality = driver.findElement({id: 'quality'});
      quality.getText().then(function(html) {
        assert.equal("quality: normal", html);
      })
    })

    test.it('should display ideas with high quality', function() {
      driver.findElement({id: 'title'}).sendKeys('This is a title');
      driver.findElement({id: 'body'}).sendKeys('This is a task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'up-btn'}).click();
      const quality = driver.findElement({id: 'quality'});
      quality.getText().then(function(html) {
        assert.equal("quality: high", html);
      })
    })

    test.it('should display ideas with critical quality', function() {
      driver.findElement({id: 'title'}).sendKeys('This is a title');
      driver.findElement({id: 'body'}).sendKeys('This is a task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'up-btn'}).click();
      driver.findElement({id: 'up-btn'}).click();
      const quality = driver.findElement({id: 'quality'});
      quality.getText().then(function(html) {
        assert.equal("quality: critical", html);
      })
    })

    test.it('should display ten ideas at a time', function() {
      driver.findElement({id: 'title'}).sendKeys('Title 1');
      driver.findElement({id: 'body'}).sendKeys('Task 1');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 2');
      driver.findElement({id: 'body'}).sendKeys('Task 2');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 2');
      driver.findElement({id: 'body'}).sendKeys('Task 2');
      driver.findElement({id: 'save'}).click();      driver.findElement({id: 'title'}).sendKeys('Title 3');
      driver.findElement({id: 'body'}).sendKeys('Task 3');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 4');
      driver.findElement({id: 'body'}).sendKeys('Task 4');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 5');
      driver.findElement({id: 'body'}).sendKeys('Task 5');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 6');
      driver.findElement({id: 'body'}).sendKeys('Task 6');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 7');
      driver.findElement({id: 'body'}).sendKeys('Task 7');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 8');
      driver.findElement({id: 'body'}).sendKeys('Task 8');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 9');
      driver.findElement({id: 'body'}).sendKeys('Task 9');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 10');
      driver.findElement({id: 'body'}).sendKeys('Task 10');
      driver.findElement({id: 'title'}).sendKeys('Title 11');
      driver.findElement({id: 'body'}).sendKeys('Task 11');
      driver.findElement({id: 'save'}).click();
      const firstTitle = driver.findElement({id: 'idea-title'});
      firstTitle.getText().then(function(html) {
        assert.equal("Title 9", html);
      })
    })

    test.it('should be able to display all ideas', function() {
      driver.findElement({id: 'title'}).sendKeys('Title 1');
      driver.findElement({id: 'body'}).sendKeys('Task 1');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 2');
      driver.findElement({id: 'body'}).sendKeys('Task 2');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 2');
      driver.findElement({id: 'body'}).sendKeys('Task 2');
      driver.findElement({id: 'save'}).click();      driver.findElement({id: 'title'}).sendKeys('Title 3');
      driver.findElement({id: 'body'}).sendKeys('Task 3');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 4');
      driver.findElement({id: 'body'}).sendKeys('Task 4');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 5');
      driver.findElement({id: 'body'}).sendKeys('Task 5');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 6');
      driver.findElement({id: 'body'}).sendKeys('Task 6');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 7');
      driver.findElement({id: 'body'}).sendKeys('Task 7');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 8');
      driver.findElement({id: 'body'}).sendKeys('Task 8');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 9');
      driver.findElement({id: 'body'}).sendKeys('Task 9');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 10');
      driver.findElement({id: 'body'}).sendKeys('Task 10');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'title'}).sendKeys('Title 11');
      driver.findElement({id: 'body'}).sendKeys('Task 11');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'all-ideas'}).click();
      const firstTitle = driver.findElement({id: 'idea-title'});
      firstTitle.getText().then(function(html) {
        assert.equal("Title 11", html);
      })
    })

    test.it('should display completed ideas', function() {
      driver.findElement({id: 'title'}).sendKeys('Completed');
      driver.findElement({id: 'body'}).sendKeys('Task');
      driver.findElement({id: 'save'}).click();
      driver.findElement({id: 'complete-btn'}).click();
      driver.findElement({id: 'title'}).sendKeys('Incomplete');
      driver.findElement({id: 'body'}).sendKeys('Task');
      driver.findElement({id: 'save'}).click();
      driver.navigate().refresh();
      driver.findElement({id: 'show-completed-btn'}).click();
      const completedTitle = driver.findElement({id: 'idea-title'});
      completedTitle.getText().then(function(html) {
        assert.equal("Completed", html);
      })
    })

})//bottom test bracket
