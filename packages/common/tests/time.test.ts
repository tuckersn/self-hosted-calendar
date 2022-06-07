import { addDays, sub, subDays } from "date-fns";
import { getWeekRangeOfDate, getMonthRangeOfDate, endOfDate } from "../src/time";

const janFirstTwoThousand = new Date(2020, 0, 1);

// https://mochajs.org/#getting-started
var assert = require('assert');
describe('Week range of Jan 1st 2020', function () {
	describe('#indexOf()', function () {
		it('Should return 3 days before, and 4 days after.', function () {
			assert.deepEqual(getWeekRangeOfDate(janFirstTwoThousand), {
				start: subDays(janFirstTwoThousand, 3),
				end: endOfDate(addDays(janFirstTwoThousand, 3))
			});
		});
	});
});