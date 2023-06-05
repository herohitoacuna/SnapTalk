function iceCandidate(socket, io) {
	socket.on("iceCandidate", (callData) => {
		console.log(callData);
		io.to(callData.receiver).emit("iceCandidate", callData);
	});
}

function offer(socket, io) {
	socket.on("offer", (callData) => {
		console.log(callData);
		io.to(callData.receiver).emit("offer", callData);
	});
}

function answer(socket, io) {
	socket.on("answer", (callData) => {
		console.log(callData);
		io.to(callData.callerId).emit("answer", callData);
	});
}

function endCall(socket, io) {
	console.log("endCall");
	// socket.on("endCall");
}

module.exports = { iceCandidate, offer, answer };
