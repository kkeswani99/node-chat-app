const path              = require('path');
const http              = require('http');
const express           = require('express');
const publicPath        = path.join(__dirname, '../public');
var app                 = express();
const port              = process.env.PORT || 3000;
const socketIO          = require('socket.io');
var server              = http.createServer(app);
const {isRealString}    = require('./utils/validation.js');
const {Users}           = require('./utils/users.js');
var io                  = socketIO(server);//what we get back is our web socket server
const {generateMessage, generateLocationMessage} = require('./utils/message');
var emoji = require('node-emoji');
//Configuring your middleware
app.use(express.static(publicPath));

var users = new Users();

// app.get('/', (req,res) => {
// 	res.sendFile(path.join(publicPath,'/index.html'));
// });

io.on('connection', (socket) => {
	console.log('New User Connected');
	
	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and Room Name are required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList',users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));


		callback();
	});


	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			if(emoji.hasEmoji(message.text))
			{
				message.text = emoji.get(message.text);
			}
				io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
			}
		
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
		}
	});
});

// io.on('disconnection', (socket) => {
// 	console.log('Old user disconnected');
// });

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});

