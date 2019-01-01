var expect            = require('expect');
var {generateMessage} = require('./message');

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