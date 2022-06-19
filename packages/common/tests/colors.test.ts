import { verifyColorIsHex } from "../src/colors";

const tests = {
    '': false,
    '#000': true,
    '#FFF': true,
    '#000000': true,
    '#FFFFFF': true,
    '#G': false,
    '#1234': false,
    '#1234567': false,
    '#12345G': false
};

let assert = require('assert');

describe('Verify if valid hexadecimal color code', function () {
    describe('verifyColorIsHex()', function () {
        for (const key in tests) {
            const value = tests[key as keyof typeof tests];
            it (key, function () {
                assert.equal(verifyColorIsHex(key), value);
            });
        };
    });
});
