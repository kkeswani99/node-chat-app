const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
	it('should reject nonstring values', () => {
		var ans = isRealString(12);
		expect(ans).toBe(false);
	});

	it('should reject string with only spaces', () => {
		var ans = isRealString('   ');
		expect(ans).toBe(false);
	});

	it('should allow string with non-sapce characters', () => {
		var ans = isRealString('Karan');
		expect(ans).toBe(true);
	});

});