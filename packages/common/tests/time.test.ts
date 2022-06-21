import { addDays, subDays } from "date-fns";
import { getWeekRangeOfDate, getMonthRangeOfDate, endOfDate } from "../src/time";

// TODO: individually test each function
// TODO: add to getWeekRangeOfDate test set

/* Date notes:              YYYY-MM-DD
 * new Date(2020, 0, 0) === 2019-12-31
 * new Date(2020, 1, 1) === 2020-02-01
 * new Date(2020, 0, 1) === 2020-01-01
 */

const tests = {
    test1: {start: new Date(2022, 5, 21), interval: {start: new Date(2022, 5, 29), end: new Date(2022, 5, 4)}},
    // more tests for getWeekRangeOfData function go here
};

var assert = require('assert');
describe('Verify week ranges accuracy', function () {
    describe('getWeekRangeOfDate()', function () {
        for (const key in tests) {
            const value = tests[key as keyof typeof tests];
            it (key, function () {
                assert.deepEqual(getWeekRangeOfDate(value.start), value.interval);
            });
        };
    });
});

