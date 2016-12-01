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
      console.log(bodytext)
      assert.equal(bodytext, "Please")
    })

    driver.findElement({id: 'idea-title'}).then(function(title){
      return title.getText()
    }).then(function(text){
      assert.equal(text, "Work")
    })

    })
  })
