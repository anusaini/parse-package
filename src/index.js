require('node-path-choice').blatant(__dirname)
const fs = require('fs')
const { truekeys } = require('truekeys')
const flattenkeys = require('flattenkeys')
const flattenvalues = require('flattenvalues')

/**
 *
 * @param {string} filename - input filename: './package.json' by default
 * @param {function|[function]} whenDone - callback or array of callbacks to be called after processing and before returning
 */
function parsePackage(filename, whenDone) {
    filename = filename || './package.json'
    const out = {
        filename: filename,
        parsed: {},
        errors: [],
        contains: null,
        get: null
    }
    if (fs.existsSync(filename)) {
        const data = fs.readFileSync(filename)
        const parsed = JSON.parse(data)
        out.parsed.data = parsed
        out.parsed.flattenedKeys = flattenkeys(parsed)
        out.parsed.flattenedValues = flattenvalues(parsed)
        out.parsed.keys = Object.keys(parsed)
        /**
         *
         * @param {string[]} keys
         * @returns {boolean} true if keys exist and are truthy
         */
        out.contains = function(keys) {
            return truekeys(parsed, keys)
        }
        /**
         *
         * @param {string[]} keys
         * @returns {string[]}
         */
        out.get = function(keys) {
            return out.contains(keys) ? keys.map(k => { return { key: k, val: out.parsed.data[k] } }) : []
        }
    } else {
        out.errors.push(`File ${filename} doesn't exists.`)
    }
    if (whenDone) {
        // convert whenDone to array
        whenDone = Array.isArray(whenDone) ? whenDone : [ whenDone ]
        // callback each with out value
        whenDone.forEach(fn => fn(out))
    }
    return out
}

module.exports = {
    parsePackage
}
