import { createContext, useState, useEffect, useRef } from "react";
import socket from "../socketConnection";
import { getItem } from "../utils/localStorageItems";

interface ICallData {
	callerId: string;
	receiver: string;
	[data: string]: any;
}

interface ICallContext {
	handleContactId: (id: string) => void;

	localVideoRef: React.RefObject<HTMLVideoElement> | null;
	remoteVideoRef: React.RefObject<HTMLVideoElement> | null;

	openCall: boolean;
	offerSDP: ICallData | null;

	makeCall: () => void;
	answerCall: () => void;
	endCall: () => void;
}

export const CallContext = createContext<ICallContext>({
	handleContactId: () => {},

	localVideoRef: null,
	remoteVideoRef: null,

	openCall: false,
	offerSDP: null,

	makeCall: () => {},
	answerCall: () => {},
	endCall: () => {},
});

export function CallProvider(props: { children: React.ReactNode }) {
	// Reference for local video element
	const localVideoRef = useRef<HTMLVideoElement>(null);
	// Reference for remote video element
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	// contactId of current user in the screen
	const [contactId, setContactId] = useState<string>("");
	// Use to open a MakeCall component
	const [openCall, setOpenCall] = useState<boolean>(false);
	// For opening the video container with localVideoRef and remoteVideoRef;
	const [callAccepted, setCallAccepted] = useState<boolean>(false);
	// Receive from localPeer and for remotePeer usage
	const [iceCandidate, setIceCandidate] = useState<ICallData | null>(null);
	const [offerSDP, setOfferSDP] = useState<ICallData | null>(null);

	// peer Connection initialization;
	let peerConnection: RTCPeerConnection;

	// For changing the contactId in context
	const handleContactId = (id: string) => {
		setContactId(id);
	};

	// For Local Peer Usage
	// Function to initiate a call
	const makeCall = async () => {
		// open a MakeCall Component
		setOpenCall(true);

		// Create a Peer Connection
		peerConnection = new RTCPeerConnection();

		// Get local media stream;
		const constraint = { video: true, audio: true };
		const localStream = await navigator.mediaDevices.getUserMedia(constraint);
		
		if (!localVideoRef.current) return;
		localVideoRef.current.srcObject = localStream;
		// Add local tracks to the local Peer connection
		localStream.getTracks().forEach((track) => {
			peerConnection.addTrack(track, localStream);
		});

		// Send a ICE candidate to the remote peer
		peerConnection.addEventListener("icecandidate", (event) => {
			const candidate = event.candidate;
			const candidateData = { callerId: getItem("id"), receiver: contactId, candidate };
			socket.emit("candidate", candidateData);
		});

		// Receive a ICE candidate from remote peer and add to the localPeer ice canidate
		socket.on("candidate", async (callData) => {
			const { candidate } = callData;
			await peerConnection.addIceCandidate(candidate);
		});

		// create an offer
		const offer = await peerConnection.createOffer();

		// set as localDescription
		await peerConnection.setLocalDescription(offer);
		const offerSDP = peerConnection.localDescription;

		// send an offer
		socket.emit("offer", { callerId: getItem("id") as string, receiver: contactId, offerSDP });

		// receive an answer
		// set as remoteDescription
		socket.on("answer", async ({ callerId, receiver, answer }) => {
			setCallAccepted(true);
			console.log({ callerId, receiver, answer });
			await peerConnection.setRemoteDescription(answer);
		});

		peerConnection.ontrack = (event) => {
			const remoteStream = event.streams[0];
			if (!remoteVideoRef.current) return;
			remoteVideoRef.current.srcObject = remoteStream;
		};
	};

	// *** remote connection
	const answerCall = async () => {
		setCallAccepted(true);
		// create peer connetion
		peerConnection = new RTCPeerConnection();
		// add the ice candidate
		await peerConnection.addIceCandidate(iceCandidate?.candidate);
		peerConnection.addEventListener("icecandidate", (event) => {
			const candidate = event.candidate;
			if (!iceCandidate) return;
			const iceCandidateCallData = {
				callerId: iceCandidate?.callerId,
				receiver: iceCandidate?.receiver,
				candidate,
			};
			// send ice candidate
			socket.emit("candidate", iceCandidateCallData);
		});
		// add the offerSDP to remoteDescription
		await peerConnection.setRemoteDescription(offerSDP?.offer);
		// create answer
		const answer = await peerConnection.createAnswer();
		// set asnwer as localDescription
		await peerConnection.setLocalDescription(answer);
		const answerSDP = peerConnection.localDescription;
		// send an answer
		if (!offerSDP) return;
		const answerCallData = {
			callerId: offerSDP?.callerId,
			receiver: offerSDP?.receiver,
			answerSDP,
		};
		socket.emit("answer", answerCallData);
	};

	const endCall = () => {
		// destroy peerConnection
		setOpenCall(false);
		setCallAccepted(false);
		setIceCandidate(null);
		setOfferSDP(null);
		// send a signal to the other peer that one ended the call
		peerConnection.close();
	};

	useEffect(() => {
		// *** for remote connection
		// receive an ice candidate
		socket.on("candidate", (callData: ICallData) => {
			setIceCandidate(callData);
		});
		//receive an offer
		socket.on("offer", (callData: ICallData) => {
			setOfferSDP(callData);
		});

		const cleanup = () => {
			socket.off("candidate");
			socket.off("offer");
		};

		return cleanup;
	}, []);

	const contextValue = {
		// for changing the conatactId in context
		handleContactId,

		// ref
		localVideoRef,
		remoteVideoRef,

		// states
		openCall,
		offerSDP,
		callAccepted,

		// functions
		makeCall,
		answerCall,
		endCall,
	};

	return <CallContext.Provider value={contextValue}>{props.children}</CallContext.Provider>;
}
