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
    it('parsePackage function accepts single input', () => {
        const expected = 1
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
    })
})
