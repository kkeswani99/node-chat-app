const path       = require('path');
const http       = require('http');
const express    = require('express');
const publicPath = path.join(__dirname, '../public');
var app          = express();
const port       = process.env.PORT || 3000;
const socketIO   = require('socket.io');
var server       = http.createServer(app);
var io           = socketIO(server);//what we get back is our web socket server
//Configuring your middleware
app.use(express.static(publicPath));


// app.get('/', (req,res) => {
// 	res.sendFile(path.join(publicPath,'/index.html'));
// });

io.on('connection', (socket) => {
	console.log('New User Connected');

	// socket.emit('newEmail', {
	// 	from      : 'mike@example.com',
	// 	text      : 'Hey. What is going on',
	// 	createdAt : 123
	// });

	// socket.on('createEmail', (newEmail) => {
	// 	console.log('createEmail',newEmail);
	// });

	socket.emit('newMessage', {
		from: 'Avi',
		text:'When are we meeting next',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (newMessage) => {
		console.log('There is a new Message', newMessage);
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from server');
	});
});

io.on('disconnection', (socket) => {
	console.log('Old user disconnected');
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});

