import { createContext, useRef, useState } from "react";
import socket from "../socketConnection";

interface IVideoCallContext {
	localVideoRef: React.RefObject<HTMLVideoElement>;
	remoteVideoRef: React.RefObject<HTMLVideoElement>;
	makeVideoCall: (contactId: string) => void;
	answerCall: (contactId: string) => void;
	endCall: () => void;
}

const initialState: IVideoCallContext = {
	localVideoRef: useRef<HTMLVideoElement>(null),
	remoteVideoRef: useRef<HTMLVideoElement>(null),
	makeVideoCall: (contactId: string) => {},
	answerCall: (contactId: string) => {},
	endCall: () => {},
};

export const VideoCallContext = createContext<IVideoCallContext>(initialState);

export const VideoCallProvider = ({ children }: { children: React.ReactNode }) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	let peerConnection: RTCPeerConnection | null = null;

	const [constraint, setConstraint] = useState<{ video: boolean; audio: boolean }>({ video: true, audio: true });

	async function makeVideoCall(contactId: string) {
		try {
			const localStream = await navigator.mediaDevices.getUserMedia(constraint);
			if (localVideoRef.current) {
				localVideoRef.current.srcObject = localStream;
			}

			peerConnection = new RTCPeerConnection();
			peerConnection.onicecandidate = ({ candidate }) => {
				socket.emit("iceCandidate", contactId, candidate);
			};

			const offerSDP = await peerConnection.createOffer();
			await peerConnection.setLocalDescription(offerSDP);
			socket.emit("offer", contactId, offerSDP);
		} catch (error) {
			console.error("Error making video call:", error);
		}
	}

	function answerCall(contactId: string) {
		try {
			peerConnection = new RTCPeerConnection();
			peerConnection.onicecandidate = ({ candidate }) => {
				socket.emit("iceCandidate", contactId, candidate);
			};

			// Handle incoming offer
			socket.on("offer", async (offerSDP) => {
				await peerConnection?.setRemoteDescription(new RTCSessionDescription(offerSDP));

				const answerSDP = await peerConnection?.createAnswer();
				await peerConnection?.setLocalDescription(answerSDP);

				socket.emit("answer", contactId, answerSDP);
			});

			// Handle incoming answer
			socket.on("answer", async (answerSDP) => {
				await peerConnection?.setRemoteDescription(new RTCSessionDescription(answerSDP));
			});

			// Handle incoming ICE candidates
			socket.on("iceCandidate", (candidate) => {
				peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
			});

			// Start listening for media stream and update remote video element
			peerConnection.ontrack = (event) => {
				const remoteStream = event.streams[0];
				if (remoteVideoRef.current) {
					remoteVideoRef.current.srcObject = remoteStream;
				}
			};
		} catch (error) {
			console.error("Error answering call:", error);
		}
	}

	function endCall() {
		if (localVideoRef.current) {
			localVideoRef.current.srcObject = null;
		}

		if (remoteVideoRef.current) {
			remoteVideoRef.current.srcObject = null;
		}

		if (peerConnection) {
			// Close the RTCPeerConnection
			peerConnection.close();
			peerConnection = null;
		}
	}

	const contextValue = {
		localVideoRef,
		remoteVideoRef,
		makeVideoCall,
		answerCall,
		endCall,
	};

	return <VideoCallContext.Provider value={contextValue}>{children}</VideoCallContext.Provider>;
};
