# mocha-async

Use a different loader than nodejs' `require` to resolve modules, for example `systemjs`.

## Example

This snippet uses `systemjs` which is configured to transpile and typecheck using TypeScript to run tests (written in TypeScript).

```
const MochaAsync = require('mocha-async');
const glob = require('glob');
const System = require('systemjs');
require('../config.js');

const runTests = (err, files) => {
    const mochaAsync = new MochaAsync({
        // options.loader is specific to mocha-async, rest is passed down to mocha
        loader: (...args) => System.import(...args),
        watch: true
    });
    files.forEach(f => mochaAsync.addFile(f));

    mochaAsync.run().catch(e => console.error(e));
};

glob('src/**/__tests__/**/*.ts', runTests);
glob('src/**/test.ts', runTests);
```

A test would look like this, nothing unusual:

```
import {expect} from 'chai';
import someOtherModule from '../somewhere';

describe('test', () => {
    it('should be a meaningful test', () => {
        /* ... */
    });
});

```

