/** CONFIGURATIONS **/

// Script-wide timeout for wait and waitAndFind functions (in ms)
var DefaultTimeout = 60000;
// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
var UserAgent = "default";
var URL = "";
var FieldUsername="UserName";
var FieldPassword="Password";
var LoginId="login";

/** HELPER FUNCTIONS **/

var assert = require('assert'),
  By = $driver.By,
  startTime = new Date(),
  thisStep = 0,
  VARS = {};
var log = function(msg) {
    var elapsedSecs = (new Date() - startTime) / 1000.0;
        if (elapsedSecs > 100000000000000000) {

    }
    console.log('Step ' + thisStep + ': ' + elapsedSecs.toFixed(1) + 's: ' + msg);
    thisStep++;
};
// 1st log is sometimes ignored for some reason, so this is a dummy
log('init');
function isAlertPresent() {
  try {
    var thisAlert = $browser.switchTo().alert();
    return true;
  } catch (err) { return false; }
}
function isElementSelected(el) { return $browser.findElement(el).isSelected(); }
function isTextPresent(text) {
  return $browser.findElement(By.tagName('html')).getText()
  .then(function (wholetext) {
    return wholetext.indexOf(text) != -1;
  });
}

/** BEGINNING OF SCRIPT **/

// Setting User Agent is not then-able, so we do this first (if defined and not default)
if ((typeof UserAgent !== 'undefined') && (UserAgent != 'default')) {
  $browser.addHeader('User-Agent', UserAgent);
  log('Setting User-Agent to ' + UserAgent);
}

// Get browser capabilities and do nothing with it, so that we start with a then-able command
$browser.getCapabilities().then(function () { })
.then(function () {
  log('get ' + URL);
  return $browser.get(URL);
})

.then(function () {
  log('setElementText ' + FieldUsername);
  return $browser.waitForAndFindElement(By.id(FieldUsername), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys($secure.SUPPORTUSERNAME); })

.then(function () {
  log('setElementText ' + FieldPassword);
  return $browser.waitForAndFindElement(By.id(FieldPassword), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys($secure.SUPPORT); })

.then(function () {
  log('clickElement ' + LoginId);
  return $browser.waitForAndFindElement(By.id(LoginId), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

.then (function (){
  log('clickElement Search');
  return $browser.waitForAndFindElement(By.id('s2id_EnvironmentConfiguration_ImpersonatedUser'), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

.then (function (){
  log('searchUser Johnny Test');
  return $browser.waitForAndFindElement(By.id('s2id_autogen2_search'), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys("Johnny_Test");
})

.then (function (){
  log('selectUser Johnny Test')
  return $browser.waitForAndFindElement(By.className('select2-result-label'), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

.then (function (){
  log('clickElement OK');
  return $browser.waitForAndFindElement(By.id('setEnvOkButton'), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

//Click on the Main Menu
.then (function (){
  log('clickElement Menu');
  return $browser.waitForAndFindElement(By.id('MainMenu'), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

//Click to view options for Mark Reporting
.then (function (){
  log('clickElement Mark Reporting');
  return $browser.waitForAndFindElement(By.id("sg-mm-5"), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

//Click ReportCardSummary Menu
.then (function (){
  log('clickElement ReportCardSummary');
  return $browser.waitForAndFindElement(By.xpath(''), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

//Click to expand the search
.then (function (){
  log('clickElement searchCriteria');
  return $browser.waitForAndFindElement(By.xpath(''));
})
.then(function (el) { $browser.actions().click(el).perform(); })

//Filter the students by last name that starts with AB
.then (function (){
  log('setElement Last Name')
  return $browser.waitForAndFindElement(By.id('Filter_Predicates_0__Value'));
})
.then(function (el) {
  el.clear();
  el.sendKeys("ab");
  $browser.actions().sendKeys($driver.Key.ENTER).perform();
})

//Click on the first user displayed
.then (function (){
  log('clickElement searchColumn1Student');
  return $browser.waitForAndFindElement(By.xpath('//*[@id="1"]/td[1]/a'), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

//Log out of the Application
.then(function () {
  log('clickElement "btnLogout"');
  return $browser.waitForAndFindElement(By.xpath("//a[@title='Log out of application']"), DefaultTimeout); })
.then(function (el) { $browser.actions().click(el).perform(); })

.then(function() {
  $browser.takeScreenshot();
})

.then(function() {
  log('Browser script execution SUCCEEDED.');
}, function(err) {
  log ('Browser script execution FAILED.');
  throw(err);
});
