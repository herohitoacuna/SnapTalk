function iceCandidate(socket, io) {
	socket.on("iceCandidate", (contactId, candidate) => {
		io.to(contactId).emit("iceCandidate", candidate);
	});
}

function offer(socket, io) {
	socket.on("offer", (contactId, offerSDP) => {
		io.to(contactId).emit("offer", offerSDP);
	});
}

function answer(socket, io) {
	socket.on("answer", (contactId, answerSDP) => {
		io.to(contactId).emit("answer", answerSDP);
	});
}

module.exports = { iceCandidate, offer, answer };
