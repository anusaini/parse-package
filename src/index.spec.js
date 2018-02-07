'use strict'

/* global describe it */

const {expect} = require('chai')
const lib = require('./index')

describe('parse-package', () => {
    it('returns a no op function', () => {
        expect(typeof lib.noop).to.equal('function')
    })
})
