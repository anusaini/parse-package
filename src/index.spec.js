'use strict'

/* global describe it */

const { expect } = require('chai')
const lib = require('./index')

describe('parse-package module', () => {
    it('module contains a parsePackage function', () => {
        const expected = 'function'
        const actual = typeof lib.parsePackage
        expect(actual).to.equal(expected)
    })
    it('parsePackage function accepts two params', () => {
        const expected = 2
        const actual = lib.parsePackage.length
        expect(actual).to.equal(expected)
    })
    describe('parsePaclage function', () => {
        it('returns an object with known keys', () => {
            const retVal = lib.parsePackage('./index')
            const actual = Object.keys(retVal)
            const expected = [
                'filename',
                'parsed',
                'errors',
                'contains',
                'get'
            ]
            expect(actual).to.deep.equal(expected)
        })

        it('returns errors in errors array if invalid filename is sent', () => {
            const filename = './i-do-not-exist.json'
            const retVal = lib.parsePackage(filename)
            const expectedErrors = [
                `File ${filename} doesn't exists.`
            ]
            expect(retVal.errors).to.deep.equal(expectedErrors)
        })

        it('successful parsing returns js object', () => {
            const filename = './package.json'
            const retVal = lib.parsePackage(filename)
            expect(retVal.errors.length).to.equal(0)
            expect(retVal.filename).to.equal(filename)
            expect(retVal.contains([
                'dependencies',
                'devDependencies'
            ])).to.equal(true)
        })

        it('successful parsing returns valid `dependencies` values', () => {
            const expected = [
                'flattenkeys',
                'flattenvalues',
                'node-path-choice',
                'truekeys'
            ]
            const filename = './package.json'
            const retVal = lib.parsePackage(filename)
            const dependenciesObject = retVal.get([
                'dependencies'
            ])[0].val
            const actual = Object.keys(dependenciesObject)
            expect(actual).to.deep.equal(expected)
        })

        it('successfully flattens keys', () => {
            const expected = [
                'name',
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
                'devDependencies.jasmine'
            ]
            const actual = lib.parsePackage('./package.json').parsed.flattenedKeys
            expect(actual).to.deep.equal(expected)
        })

        it('successfully flattens values', () => {
            const expected = [
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
            const actual = lib.parsePackage('./package.json').parsed.flattenedValues
            expect(Object.keys(actual)).to.deep.equal(Object.keys(expected))
        })

        it('callback works properly', () => {
            let retVal = null
            const callback = processed => {
                retVal = processed
            }
            lib.parsePackage('./package.json', callback)
            const expectedKeyLength = 5
            expect(Object.keys(retVal).length).to.equal(expectedKeyLength)
        })
    })
})
