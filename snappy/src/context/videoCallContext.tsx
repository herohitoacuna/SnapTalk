import { createContext, useCallback, useEffect, useRef, useState } from "react";
import socket from "../socketConnection";
import { getItem } from "../utils/localStorageItems";

interface IVideoCallContext {
	localVideoRef: React.RefObject<HTMLVideoElement> | null;
	remoteVideoRef: React.RefObject<HTMLVideoElement> | null;
	openCall: boolean;
	onOpenCall: () => void;
	makeVideoCall: (contactId: string) => void;
	// answerCall: (contactId: string) => void;
	// endCall: () => void;
}

interface IConstraints {
	video: boolean;
	audio: boolean;
}

interface callData {
	callerId: string;
	contactId: string;
}

interface ICandidate extends callData {
	candidate: any;
}

interface IOffer extends callData {
	offer: any;
}

interface IAnswer extends callData {
	answer: any;
}

const initialState: IVideoCallContext = {
	localVideoRef: null,
	remoteVideoRef: null,
	openCall: false,
	onOpenCall: () => {},
	makeVideoCall: (contactId: string) => {},
	// answerCall: (contactId: string) => {},
	// endCall: () => {},
};

export const VideoCallContext = createContext<IVideoCallContext>(initialState);

export const VideoCallProvider = ({ children }: { children: React.ReactNode }) => {
	const [openCall, setOpenCall] = useState(false);
	const [constraints, setConstraints] = useState<IConstraints>({ video: true, audio: true });
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	let peerConnection: RTCPeerConnection | null;

	const handleOpenCall = () => {
		setOpenCall(true);
	};

	// call when use click the audio call only
	const audioCallConstraints = () => {
		setConstraints({ video: false, audio: true });
	};
	// receive candidate and addCandidate(candidate)

	// add the streams to the peerConnection so that remotePeer can receive this

	// add the stream to the video element for the local video user
	// create offer
	// set as localDescription
	// send to contact

	// receive an answer
	// set as remoteDescription

	//receive an video-audio stream from remote peer
	// add the remote stream to the remote video user

	const makeVideoCall = async (contactId: string) => {
		console.log("videoCall");
		setOpenCall(true);
		const configuration = {
			// iceServers: [{ "urls": "stun.12connect.com:3478" }],
		};

		const localStream = await navigator.mediaDevices.getUserMedia(constraints);
		if (!localVideoRef.current) return;
		localVideoRef.current.srcObject = localStream;

		peerConnection = new RTCPeerConnection(configuration);

		localStream.getTracks().forEach((track) => {
			console.log(track);
			if (!peerConnection) return;
			peerConnection.addTrack(track, localStream);
		});
		peerConnection.addEventListener("icecandidate", (e) => {
			const candidateData: ICandidate = {
				callerId: getItem("id"),
				contactId: contactId,
				candidate: e.candidate,
			};

			socket.emit("localCandidate", candidateData);
		});

		const offer = await peerConnection.createOffer();
		console.log(offer);
		peerConnection.setLocalDescription(offer);
		const callData: IOffer = {
			callerId: getItem("id"),
			contactId: contactId,
			offer: offer,
		};
		socket.emit("offer", callData);
		peerConnection.addEventListener("track", (event) => {
			console.log(event);
			const [remoteStream] = event.streams;
			if (!remoteVideoRef.current) return;
			remoteVideoRef.current.srcObject = remoteStream;
		});
	};

	useEffect(() => {
		socket.on("remoteCandidate", (receiveCandidateData: ICandidate) => {
			console.log(receiveCandidateData);
			peerConnection?.addIceCandidate(receiveCandidateData.candidate);
		});

		socket.on("offer", (receiveOfferData: IOffer) => {
			console.log(receiveOfferData.offer);
			peerConnection?.setRemoteDescription(receiveOfferData.offer);
		});

		socket.on("answer", (receiveAnswerData: IAnswer) => {
			console.log(receiveAnswerData);
			peerConnection?.setLocalDescription(receiveAnswerData.answer);
		});

		const cleanup = () => {
			socket.off("remoteCandidate");
			socket.off("offer");
			socket.off("answer");
		};

		return cleanup;
	}, []);

	const contextValue = {
		localVideoRef,
		remoteVideoRef,
		openCall,
		onOpenCall: handleOpenCall,
		makeVideoCall,
		// answerCall,
		// endCall,
	};

	return <VideoCallContext.Provider value={contextValue}>{children}</VideoCallContext.Provider>;
};
