const chromedriver = require('chromedriver');

const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
	
const MAX_BROWSER_START_TIME_IN_MILLIS = 100000; //100 sec
	
var driver;

//jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe("Chrome driver", function() {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	
	beforeAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = MAX_BROWSER_START_TIME_IN_MILLIS; 
	});
	
	afterAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
	beforeEach(function(done) {
		let builder = new webdriver.Builder();
		
		//build browser
		builder.forBrowser(webdriver.Browser.CHROME)
			.build()
			.then(d => {
				driver = d;
				done();
			});
	});
	
	afterEach(function(done) {
        driver.quit().then(done);
    });
	
	it("should navigate to google ", function() {
		driver.get('http://google.com');
		driver.getTitle().then(function(title) {
			expect(title).toBe('Google');
		});
	});
});
