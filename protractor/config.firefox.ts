import { browser, Config } from 'protractor';
import { reporter } from './helpers/reporter';

export let config: Config = {
  framework: 'jasmine',
  specs: ['../test/**/*.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  noGlobals: true,
  getPageTimeout: 30000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: 'firefox',
    acceptSslCerts: true,
    shardTestFiles: false,
    marionette: true
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000
  },
  onPrepare: () => {
    reporter();
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(0);
  }
};
