import { addDays, subDays } from "date-fns";
import { getWeekRangeOfDate, getMonthRangeOfDate, endOfDate } from "../src/time";
// TODO: test month ranges function
const janFirstTwoThousand = new Date(2020, 0, 1); // Week range of Jan 1st 2020

var assert = require('assert');
describe('Verify week ranges accuracy', function () {
    describe('getWeekRangeOfDate()', function () {
        it('Should return 3 days before, and 4 days after.', function () {
            assert.deepEqual(getWeekRangeOfDate(janFirstTwoThousand), {
                start: subDays(janFirstTwoThousand, 3),
                end: endOfDate(addDays(janFirstTwoThousand, 4))
            });
        });
    });
});
