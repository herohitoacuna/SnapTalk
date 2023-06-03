import { createContext, useCallback, useEffect, useRef, useState } from "react";
import socket from "../socketConnection";
import { getItem } from "../utils/localStorageItems";

interface IVideoCallContext {
	localVideoRef: React.RefObject<HTMLVideoElement>;
	remoteVideoRef: React.RefObject<HTMLVideoElement>;
	openCall: boolean;
	contactId: string;
	changeContactId: (contactId: string) => void;
	onOpenCall: () => void;
	makeVideoCall: () => void;
	answerCall: () => void;
}

interface IConstraints {
	video: boolean;
	audio: boolean;
}

interface ICallData {
	callerId: string;
	contactId: string;
}

interface ICandidate extends ICallData {
	candidate: any;
}

interface IOffer extends ICallData {
	offer: any;
}

interface IAnswer extends ICallData {
	answer: any;
}

const initialState: IVideoCallContext = {
	localVideoRef: useRef<HTMLVideoElement>(null),
	remoteVideoRef: useRef<HTMLVideoElement>(null),
	openCall: false,
	contactId: "",
	changeContactId: (contactId: string) => {},
	onOpenCall: () => {},
	makeVideoCall: () => {},
	answerCall: () => {},
};

export const VideoCallContext = createContext<IVideoCallContext>(initialState);

export const VideoCallProvider = ({ children }: { children: React.ReactNode }) => {
	const [openCall, setOpenCall] = useState(false);
	const [calling, setCalling] = useState(false);
	const [constraints, setConstraints] = useState<IConstraints>({ video: false, audio: true });

	const [contactId, setContactId] = useState<string>("");

	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);

	const [candidateData, setCandidateData] = useState<ICandidate | null>(null);
	const [offerData, setOfferData] = useState<IOffer | null>(null);
	const [answerData, setAnswerData] = useState<IAnswer | null>(null);

	const changeContactId = useCallback((contactId: string) => {
		setContactId(contactId);
	}, []);

	const handleOpenCall = useCallback(() => {
		setOpenCall(true);
	}, []);

	const makeVideoCall = useCallback(async () => {
		setOpenCall(true);

		const peerConnection = new RTCPeerConnection({
			iceServers: [{ urls: "stun.12connect.com:3478" }],
		});

		const localStream = await navigator.mediaDevices.getUserMedia(constraints);
		if (!localVideoRef.current || !peerConnection) return;

		localVideoRef.current.srcObject = localStream;

		peerConnection.addEventListener("icecandidate", (e) => {
			const candidateData: ICandidate = {
				callerId: getItem("id"),
				contactId,
				candidate: e.candidate,
			};

			console.log(candidateData);
			socket.emit("iceCandidate", candidateData);
		});

		localStream.getTracks().forEach((track) => {
			console.log(track);
			peerConnection.addTrack(track, localStream);
		});

		const offer = await peerConnection.createOffer();
		console.log(offer);
		await peerConnection.setLocalDescription(offer);

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

		await peerConnection.setRemoteDescription(answerData?.answer);
	}, [constraints, contactId]);

	const answerCall = useCallback(async () => {
		if (!candidateData || !offerData) return;

		const remoteConnection = new RTCPeerConnection();
		await remoteConnection.addIceCandidate(candidateData.candidate);

		remoteConnection.addEventListener("icecandidate", (e) => {
			const remoteCandidate: ICandidate = { ...candidateData, candidate: e.candidate };
			socket.emit("iceCandidate", remoteCandidate);
		});

		await remoteConnection.setRemoteDescription(offerData.offer);
		const answer = await remoteConnection.createAnswer();
		remoteConnection.setLocalDescription(answer);

		const callData: IAnswer = {
			callerId: offerData.callerId,
			contactId: offerData.contactId,
			answer: answer,
		};
		socket.emit("answer", callData);
	}, [candidateData, offerData]);

	useEffect(() => {
		if (openCall) {
			makeVideoCall();
		}
	}, [openCall, makeVideoCall]);

	useEffect(() => {
		socket.on("iceCandidate", (candidateData: ICandidate) => {
			console.log("ICE candidate");
			console.log(candidateData);
			setCandidateData(candidateData);
		});

		socket.on("offer", (offerData: IOffer) => {
			setCalling(true);
			console.log("offer");
			console.log(offerData);
			setOfferData(offerData);
		});

		socket.on("answer", (answerData: IAnswer) => {
			console.log("answer");
			console.log(answerData);
			setAnswerData(answerData);
		});
	}, []);

	const contextValue: IVideoCallContext = {
		localVideoRef,
		remoteVideoRef,
		openCall,
		contactId,
		changeContactId,
		onOpenCall: handleOpenCall,
		makeVideoCall,
		answerCall,
	};

	return <VideoCallContext.Provider value={contextValue}>{children}</VideoCallContext.Provider>;
};
