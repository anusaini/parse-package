require('node-path-choice').blatant(__dirname)
const fs = require('fs')
const { truekeys } = require('truekeys')
const flattenkeys = require('flattenkeys')

function parsePackage(filename) {
    const out = {
        filename: filename,
        parsed: {},
        errors: [],
        contains: null,
        get: null
    }
    if (fs.existsSync(filename)) {
        const data = fs.readFileSync(filename)
        out.parsed.data = JSON.parse(data)
        out.parsed.flattenedKeys = flattenkeys(out.parsed.data)
        out.parsed.keys = Object.keys(out.parsed.data)
        /**
         *
         * @param {string[]} keys
         */
        out.contains = function(keys) {
            return truekeys(out.parsed.data, keys)
        }
        out.get = function(keys) {
            return out.contains(keys) ? keys.map(k => { return { key: k, val: out.parsed.data[k] } }) : []
        }
    } else {
        out.errors.push(`File ${filename} doesn't exists.`)
    }
    return out
}

module.exports = {
    parsePackage
}
