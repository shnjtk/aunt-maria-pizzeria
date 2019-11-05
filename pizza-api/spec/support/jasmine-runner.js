/* global process, jasmine */
'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const Jasmine = require('jasmine');
const jrunner = new Jasmine();

let filter;

process.argv.slice(2).forEach(option => {
    if (option === 'full') {
        // Remove default reporter logs
        jrunner.configureDefaultReporter({ print() {} });
        // Add jasmine-spec-reporter
        jasmine.getEnv().addReporter(new SpecReporter());
    }

    if (option.match('^filter=')) {
        filter = option.match('^filter=(.*)')[1];
    }
});

jrunner.loadConfigFile();
jrunner.execute(undefined, filter);
