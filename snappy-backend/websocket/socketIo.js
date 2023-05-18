function socketIo(io) {
	io.on("connection", async (socket) => {
		const { token } = socket.handshake.auth;
		if (!token) {
			socket.disconnect();
			return;
		}
		console.log(socket.id + "is connected");

		socket.on("disconnect", () => {
			console.log(socket.id + "is disconnected");
		});

		// try {
		// 	const { token } = socket.handshake.auth;
		// 	if (!token) {
		// 		socket.emit("authentication", "Failed to connect");
		// 		return;
		// 	}

		// 	const tokenData = decodeToken(token);
		// 	const user = await User.findByIdAndUpdate(tokenData.id, { socketId: socket.id }, { new: true });
		// 	console.log(`User ${user.firstName} ${user.lastName} is connected.`);

		// 	connectedUsers[socket.id] = user._id;
		// 	const { contacts } = user;

		// 	// socket.emit("online-users", contactsOnline);

		// 	socket.on("private-message", async (message) => {
		// 		try {
		// 			const recipient = await User.findById(message.recipient);
		// 			const recipientSocket = recipient?.socketId;
		// 			if (recipientSocket) {
		// 				io.to(recipientSocket).emit("private-message", message);
		// 			}
		// 		} catch (error) {
		// 			console.log("Error while sending private message:", error);
		// 		}
		// 	});
		// } catch (error) {
		// 	console.log("Authentication error:", error.message);
		// }

		// socket.on("disconnect", async () => {
		// 	try {
		// 		const disconnectedUserId = connectedUsers[socket.id];
		// 		if (disconnectedUserId) {
		// 			const user = await User.findByIdAndUpdate(disconnectedUserId, { socketId: "" }, { new: true });
		// 			console.log(`User ${user.firstName} ${user.lastName} is disconnected`);
		// 			delete connectedUsers[socket.id];
		// 		}
		// 	} catch (error) {
		// 		console.log("Error while disconnecting user:", error);
		// 	}
		// });
	});
}

module.exports = socketIo;
