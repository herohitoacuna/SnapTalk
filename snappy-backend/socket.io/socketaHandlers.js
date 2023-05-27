const Message = require("../models/Message");
const connectedUsers = {};

function onConnection(socket, io) {
	const userId = socket.data.userId;
	// connectedUsers.set(socket.id, userId); // add to the connected Users
	connectedUsers[socket.id] = userId;
	socket.join(userId); // create a room
	io.emit("connected-users", Object.values(connectedUsers)); // emit to all users when there is a new connection in server
	console.log(`User ${socket.data.email} is connected`);
}

function onDisconnect(socket, io) {
	socket.on("disconnect", () => {
		delete connectedUsers[socket.id];
		io.emit("connected-users", Object.values(connectedUsers));
		console.log(`User ${socket.data.email} is disconnected`);
		delete socket.data;
		delete socket.auth?.token;
	});
}

function sendPrivateMessage(socket, io) {
	const userId = socket.data.userId;

	socket.on("send-private-msg", async (msgObj) => {
		try {
			const userId = socket.data.userId;
			const { sender, recipient, content } = msgObj; // receive from a client
			const newMsg = new Message({ sender, recipient, content }); // create a Message Object
			const saveMsg = await newMsg.save(); // save to the database
			console.log(saveMsg);
			io.to([recipient, userId]).emit("receive-private-msg", saveMsg); // send back the save message to the users
		} catch (error) {
			console.log(error);
		}
	});
}

module.exports = { onConnection, sendPrivateMessage, onDisconnect };
