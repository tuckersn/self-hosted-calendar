import { addDays, sub, subDays } from "date-fns";
import { verifyColorIsHex } from "../src/colors";



var assert = require('assert');
describe('verifyColorIsHex', function () {
	it('#F0F0F0', () => {
		assert.equal(verifyColorIsHex("#F0F0F0"), true);
	});
	it('#FFF', () => {
		assert.equal(verifyColorIsHex("#FFF"), true);
	});
	it('#GGG', () => {
		assert.equal(verifyColorIsHex("#GGG"), false);
	});
	it('#G', () => {
		assert.equal(verifyColorIsHex("#G"), false);
	});
	it('123', () => {
		assert.equal(verifyColorIsHex("123"), false);
	});
});
