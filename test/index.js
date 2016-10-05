"use strict";

const assert = require('assert');
const Reporter = require('./reporter');

describe('should run tests in module.js', () => {

    const MochaAsync = require('../index');

    const mocha = new MochaAsync({
        reporter: Reporter,
        loader: file => new Promise(resolve => resolve(require(file)))
    });

    let stats;
    before(() => {
        mocha.addFile('./module.js');
        return mocha.run()
            .then((runner) => stats = runner.testResults)
            .catch(e => console.error(e));
    });

    it('should have two tests', () => {
        assert(stats.tests === 2);
    });

    it('should have one passed test', () => {
        assert(stats.passes === 1);
    });

    it('should have one failed test', () => {
        assert(stats.failures === 1);
    });

});
