describe('UI-test', function() {
	var webdriver = require('selenium-webdriver'),
		By = webdriver.By,
		until = webdriver.until;

	var driver = new webdriver.Builder()
		.forBrowser('firefox')
		.build();
		
	it('tests the UI', function() {
		driver.get('http://www.google.com');
		driver.findElement(By.name('q')).sendKeys('webdriver');
		driver.findElement(By.name('btnG')).click();
		driver.wait(until.titleIs('webdriver - Google Search'), 1000);
		driver.quit();
	});
});