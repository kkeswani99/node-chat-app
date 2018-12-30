var socket = io();
			
socket.on('connect', function() {
	console.log('Connected to server');

	// socket.emit('createEmail', {
	// 	to: 'jen@example.com',
	// 	text: 'Hey this is Karan from client side am i audible at server side'
	// });

	socket.emit('createMessage',  {
		from: 'Karan',
		text: 'Anytime you say bro....'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
// 	console.log('New Email',email);
// });

socket.on('newMessage', function(message) {
	console.log('You have a new message and details are',message );
});