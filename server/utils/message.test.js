var expect            = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		var from = 'Karan';
		var text = "Hello ji!!"
		var res  = generateMessage(from, text);
		expect(res.from).toBe(from);
		expect(res.text).toBe(text);
		expect(res.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct Location Object', () => {
		var from = 'Karan';
		var latitude = 1;
		var longitude = 1;
		var result = generateLocationMessage(from, latitude, longitude);
		expect(result.from).toBe(from);
		expect(result.url).toBe('https://www.google.com/maps?q=1,1');
		expect(result.createdAt).toBeA('number');
	});
});