# parse-package

Parse package.json file and return intelligent object - node module

## Usage

```bash

  # setup node and npm env
  nvm install node    # install latest node version
  nvm use node        # use latest node version
  npm i -g npm        # install latest npm

  # go to your project
  ## install as depedency
  npm i -S parse-package
  ## install as dev dependency
  npm i -D parse-package

```

```javascript

  const { parsePackage } = require('parse-package')
  const out = parsePackage('./package.json')

  // out
  { filename: './package.json',
    parsed:
    { data:
        { name: 'parse-package',
          version: '1.0.0',
          description: 'Parse package.json file and return intelligent object - node module',
          main: 'src/index.js',
          scripts: [Object],
          repository: [Object],
          keywords: [Array],
          author: 'Blunt <anusaini@paypal.com>',
          license: 'MIt',
          bugs: [Object],
          homepage: 'https://github.com/anusaini/parse-package#readme',
          dependencies: [Object],
          devDependencies: [Object] },
      flattenedKeys:
        [ 'name',
          'version',
          'description',
          'main',
          'scripts.test',
          'repository.type',
          'repository.url',
          'keywords.0',
          'keywords.1',
          'keywords.2',
          'author',
          'license',
          'bugs.url',
          'homepage',
          'dependencies.flattenkeys',
          'dependencies.flattenvalues',
          'dependencies.node-path-choice',
          'dependencies.truekeys',
          'devDependencies.chai',
          'devDependencies.eslint',
          'devDependencies.eslint-config-standard',
          'devDependencies.eslint-plugin-import',
          'devDependencies.eslint-plugin-node',
          'devDependencies.eslint-plugin-promise',
          'devDependencies.eslint-plugin-standard',
          'devDependencies.jasmine' ],
      flattenedValues:
        [ [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object] ],
      keys:
        [ 'name',
          'version',
          'description',
          'main',
          'scripts',
          'repository',
          'keywords',
          'author',
          'license',
          'bugs',
          'homepage',
          'dependencies',
          'devDependencies' ] },
    errors: [],
    contains: [Function],
    get: [Function]
  }

  // out.flattenedValues
  [
    { key: 'name', val: 'parse-package' },
    { key: 'version', val: '1.0.0' },
    { key: 'description',
      val: 'Parse package.json file and return intelligent object - node module' },
    { key: 'main', val: 'src/index.js' },
    { key: 'scripts.test', val: 'jasmine' },
    { key: 'repository.type', val: 'git' },
    { key: 'repository.url',
      val: 'git+https://github.com/anusaini/parse-package.git' },
    { key: 'keywords.0', val: 'parse' },
    { key: 'keywords.1', val: 'package' },
    { key: 'keywords.2', val: 'parse package json' },
    { key: 'author', val: 'Blunt <anusaini@paypal.com>' },
    { key: 'license', val: 'MIt' },
    { key: 'bugs.url',
      val: 'https://github.com/anusaini/parse-package/issues' },
    { key: 'homepage',
      val: 'https://github.com/anusaini/parse-package#readme' },
    { key: 'dependencies.flattenkeys', val: '^1.0.0' },
    { key: 'dependencies.flattenvalues', val: '^1.0.0' },
    { key: 'dependencies.node-path-choice', val: '^2.0.0' },
    { key: 'dependencies.truekeys', val: '^2.0.0' },
    { key: 'devDependencies.chai', val: '^4.1.2' },
    { key: 'devDependencies.eslint', val: '^4.17.0' },
    { key: 'devDependencies.eslint-config-standard',
      val: '^11.0.0-beta.0' },
    { key: 'devDependencies.eslint-plugin-import', val: '^2.8.0' },
    { key: 'devDependencies.eslint-plugin-node', val: '^6.0.0' },
    { key: 'devDependencies.eslint-plugin-promise', val: '^3.6.0' },
    { key: 'devDependencies.eslint-plugin-standard', val: '^3.0.1' },
    { key: 'devDependencies.jasmine', val: '^3.0.0' }
  ]

  // out.get(['scripts'])
  [ { key: 'scripts', val: { test: 'jasmine' } } ]

```

### callback enabled

`parsePackage` also supports callback mechanism.

- Either pass a single callback,
- Or an array of callback functions

Look into tests and read code for more information.

## License

MIT 2018
