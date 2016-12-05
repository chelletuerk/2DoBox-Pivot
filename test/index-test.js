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
})//bottom test bracket
