var socket = io();
			
socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});


socket.on('newMessage', function(message) {
	console.log('You have a new message and details are',message );
});