"use strict";

const Mocha = require('mocha');

module.exports = class MochaAsync extends Mocha {

    constructor(options) {
        const loader = options.loader;
        delete options.loader;
        super(options);
        this._loader = loader;
    }

    loadFiles() {
        const self = this;
        const suite = this.suite;

        return this.files.reduce((p, file) => {
            return p.then(() => {
                suite.emit('pre-require', global, file, self);
                return this._loader(file).then(mod => {
                    suite.emit('require', mod, file, self);
                    suite.emit('post-require', global, file, self);
                });
            });
        }, Promise.resolve());
    }

    run() {
        return this.loadFiles().then(() => {
            return new Promise((resolve) => {
                super.run(resolve);
            });
        });
    }
}