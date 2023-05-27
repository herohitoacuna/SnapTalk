import { Socket } from "socket.io-client";
import socket from "./socketConnection";

// *** CLIENT SIDE
// create a local peer
// create a data channel
// create an offer --> will create an SDP and send to the remote peer
// emit the SDP into the backend
// create an answer --> will receive an SDP from backend
// receive the SDP from backend

// signaling  --> this will send the SDP to the other user

//frontend
function makeCall(socket: Socket, contactId: string) {
	const localConnection = new RTCPeerConnection();

	const dataChannel = localConnection.createDataChannel("videoChannel");
	dataChannel.onopen = () => {
		console.log("Data channel opened");
		// Send video input through the data channel
		// You can implement the logic to send the video input here
	};

	localConnection
		.createOffer()
		.then((offer) => localConnection.setLocalDescription(offer))
		.then(() => {
			socket.emit("offer", localConnection.localDescription, contactId);
		});

	localConnection.onicecandidate = (event) => {
		if (event.candidate) {
			const candidate = event.candidate;
			socket.emit("iceCandidate", candidate);
		}
	};
}

// backend
function answerCall(socket: any, io: any) {
	const remoteConnection = new RTCPeerConnection();

	socket.on("iceCandidate", (candidate: any) => {
		remoteConnection.addIceCandidate(candidate);
	});

	socket.on("offer", (offer: any, contactId: string) => {
		remoteConnection.setRemoteDescription(offer);

		remoteConnection.createAnswer().then((answer) => {
			remoteConnection.setLocalDescription(answer);
			socket.to(contactId).emit("answer", answer);
		});
	});

	remoteConnection.onicecandidate = (event) => {
		if (event.candidate) {
			const candidate = event.candidate;
			socket.emit("remoteIceCandidate", candidate);
		}
	};

	socket.on("remoteIceCandidate", (candidate: any) => {
		remoteConnection.addIceCandidate(candidate);
	});
}
