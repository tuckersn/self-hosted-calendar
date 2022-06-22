import { getWeekRangeOfDate, getMonthRangeOfDate, endOfDate } from "../src/time"

//TODO: Add more test cases, test other functions from ../src/time.ts

const tests = {
	test1: {start: new Date(2022, 5, 21), interval: {start: new Date(2022, 5, 19), end: new Date(2022, 5, 25, 23, 59, 59, 999)}},
	// more tests for getWeekRangeOfData function go here
}

var assert = require('assert');
describe('Verify week ranges accuracy', function () {
	describe('getWeekRangeOfDate()', function () {
		for (const key in tests) {
			const value = tests[key as keyof typeof tests]
			it (key, function () {
				assert.deepEqual(getWeekRangeOfDate(value.start), value.interval)
			})
		}
	})
})

