var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
	driver;

describe("Chrome", function() {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
	
	beforeEach(function(done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		
		let builder = new webdriver.Builder();
		
		builder.forBrowser('chrome')
			.build()
			.then(d => { driver = d; done(); }, err => console.log(err) );
	});
	
	afterEach(function(done) {
        driver.quit().then(done);
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
	
	it("should navigate to google.com", function() {
		driver.get('http://google.com');
		driver.getTitle().then(function(title) {
			expect(title).toBe('Google');
		});
	});
});
