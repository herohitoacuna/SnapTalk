const { decodeToken } = require("../middlewares/authToken");

module.exports.socketAuth = (socket, next) => {
	try {
		const { token } = socket.handshake.auth;

		if (!token) {
			next(new Error("Authentication failed"));
		}

		const { id, email } = decodeToken(token);
		socket.data = {
			userId: id,
			email: email,
		};
		next();
	} catch (error) {
		console.log(error);
		next(new Error("Authentication failed"));
	}
};
