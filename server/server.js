const path              = require('path');
const http              = require('http');
const express           = require('express');
const publicPath        = path.join(__dirname, '../public');
var app                 = express();
const port              = process.env.PORT || 3000;
const socketIO          = require('socket.io');
var server              = http.createServer(app);
var io                  = socketIO(server);//what we get back is our web socket server
const {generateMessage} = require('./utils/message');
//Configuring your middleware
app.use(express.static(publicPath));


// app.get('/', (req,res) => {
// 	res.sendFile(path.join(publicPath,'/index.html'));
// });

io.on('connection', (socket) => {
	console.log('New User Connected');

	socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));


	socket.broadcast.emit('newMessage', generateMessage('Admin','New User joined the chatroom'));

	socket.on('createMessage', (message, callback) => {
		console.log('There is a new Message', message);
		io.emit('newMessage', generateMessage(message.from,message.text));
		callback('This is from the server');
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
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

