function iceCandidate(socket, io) {
	socket.on("localCandidate", (callData) => {
		console.log(callData);
		io.to(callData.contactId).emit("remoteCandidate", callData);
	});
}

function offer(socket, io) {
	socket.on("offer", (callData) => {
		// console.log(callData);
		// io.to(contactId).emit("offer", offerSDP);
	});
}

function answer(socket, io) {
	socket.on("answer", (callData) => {
		// console.log(callData);
		// io.to(contactId).emit("answer", answerSDP);
	});
}

module.exports = { iceCandidate, offer, answer };
