import { DisplayProcessor, SpecReporter } from 'jasmine-spec-reporter';
const { AwesomeReport } = require('jasmine-awesome-report');

export let reporter = () => {
  jasmine.getEnv().addReporter(new SpecReporter({
    customProcessors: [DisplayProcessor],
  }));

  const config = {
    fullPath: 'reports',  
    fileName: 'awesome',
    merge: true
  };

  jasmine.getEnv().addReporter(AwesomeReport.getReport(config));
};
