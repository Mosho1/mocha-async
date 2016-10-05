"use strict"

module.exports = class JSONReporter {
    constructor(runner) {
        var self = this;
        this.tests = [];
        this.failures = [];
        this.passes = [];

        this.runner = runner;

        this.listenToRunner(runner);
    }

    listenToRunner(runner) {
        runner.on('test end', test => {
            this.tests.push(test);
        });

        runner.on('pass', test => {
            this.passes.push(test);
        });

        runner.on('fail', test => {
            this.failures.push(test);
        });

        runner.on('end', () => {
            runner.testResults = this.stats = {
                tests: this.tests.length,
                failures: this.failures.length,
                passes: this.passes.length
            };
        });
    }

    done(failures, fn) {
        fn(this.runner);
    }
}