import { createContext, useRef, useState } from "react";
import socket from "../socketConnection";
import { getItem } from "../utils/localStorageItems";

interface IVideoCallContext {
	localVideoRef: React.RefObject<HTMLVideoElement>;
	remoteVideoRef: React.RefObject<HTMLVideoElement>;
	makeVideoCall: (contactId: string) => void;
	answerCall: (contactId: string) => void;
	endCall: () => void;
}

interface IConstraints {
	video: boolean;
	audio: boolean;
}


interface IMakeCallData{
	callerId: string;
	contactId: string;
	offer: any;
}

interface IICEcandidate {
	callerId: string;
	contactId: string;
	candidate: any;
}

interface IAnswerCallData {
	callerId: string;
	contactId: string;
	answer: any;
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

	const [constraint, setConstraint] = useState<IConstraints>({ video: true, audio: true });

	async function makeVideoCall(contactId: string) {
		try {
			const localStream = await navigator.mediaDevices.getUserMedia(constraint);
			if (localVideoRef.current) {
				localVideoRef.current.srcObject = localStream;
			}

			peerConnection = new RTCPeerConnection();
			// send ICE candidate to contact
			peerConnection.onicecandidate = ({ candidate }) => {
				const candidateData: IICEcandidate = {
					callerId: getItem("id"),
					contactId: contactId,
					candidate: candidate
				}
				socket.emit("iceCandidate", candidateData);
			};

			// receive ICE candidate to contact
			socket.on("iceCandidate", (data: IICEcandidate) => {
				peerConnection?.addIceCandidate(data)
			})		

			//create offer and set is as localDescription
			const offerSDP = await peerConnection.createOffer();
			await peerConnection.setLocalDescription(offerSDP);

			// send the localDescription as SDP
			const callData: IMakeCallData = {
				callerId: getItem("id"),
				contactId: contactId,
				offer: offerSDP
			}
			socket.emit("offer", callData);

	

			// receive the remoteDescription as SDP
			socket.on("answer",  async (data: IAnswerCallData) => {
				await peerConnection?.setRemoteDescription(data.answer)
			})
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
