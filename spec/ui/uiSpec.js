const chromedriver = require('chromedriver');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const request = require('ajax-request');

const SEC = 1000; // 1 sec
const TEN_SEC = 10000; // 10 sec
const MAX_BROWSER_STARTUP_TIME = 5*TEN_SEC; //50 sec
const HOST = "http://localhost:5000"; // use environmental variable instead?
const API = "http://localhost:5000/api/events";

var driver;

jasmine.DEFAULT_TIMEOUT_INTERVAL = MAX_BROWSER_STARTUP_TIME;

function postEvent(criticality, unixtimestamp, category, description) {
	request({
		url: API,
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		data: {"criticality": criticality, "unix_timestamp": unixtimestamp, "category": category, "description": description}
	}, () => {});
}

function getCurrentUnixTimestampInSeconds() {
	return Math.floor(Date.now() / 1000);
}

//Chrome driver navigation
describe("Chrome driver navigation", function() {

	beforeAll(function(done) {
		driver = new webdriver.Builder()
			.forBrowser(webdriver.Browser.CHROME)
			.build();
			
		done();
	});
	
	afterAll(function(done) {
		driver.quit().then(done);
	});
	
	it("should work to google", function(done) {
		driver.get('http://google.com');
		driver.getTitle().then(function(title) {
			expect(title).toBe('Google');
		});
		driver.sleep(2*SEC).then(done);
	});
	
	it("should work to changelog", function(done) {
		driver.get(HOST); // use environmental variable instead?
		driver.getTitle().then(function(title) {
			expect(title).toBe('Changelog :)');
		});
		driver.sleep(2*SEC).then(done);
		
	});
});

// Send event
describe("Dasboard view", function() {

	beforeAll(function(done) {
		driver = new webdriver.Builder()
			.forBrowser(webdriver.Browser.CHROME)
			.build();
		
		driver.get(HOST);
		
		var dashboardViewButton = driver.findElement(By.js(() =>
			$("button:contains('Dashboard view')")[0]));
		
		dashboardViewButton.click();

		driver.sleep(2*SEC).then(done);
	});
	
	afterAll(function(done) {
		driver.quit().then(done);
	});
	
	it("should show incoming events eventually", function(done) {
		var unixtimestamp = getCurrentUnixTimestampInSeconds();
		var message = "test_at_" + unixtimestamp; // this guarantees uniqueness
		
		postEvent(5, unixtimestamp, "test", message);
		
		driver.sleep(2*TEN_SEC); // wait enough for it to appear
		
		//we want to see the exact same message in the events table somewhere
		var elem = driver.findElement(
			By.xpath("//table[@id='events']//td[text()='" + message + "']"));
		
		elem.getText().then((txt) => {
			console.log(txt);
			done();
		});
	});
});