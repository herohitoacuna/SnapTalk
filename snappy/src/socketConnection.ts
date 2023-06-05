import { io, Socket } from "socket.io-client";
import { getItem } from "./utils/localStorageItems";

type MessageType = {
	sender: string;
	recipient: string;
	content: string;
	timestamp?: Date;
	seen?: boolean;
};

type CallDataType = {
	callerId: string;
	receiver: string;
};

type ClientCandidate = CallDataType & { candidate: RTCIceCandidate | null };
type ClientOffer = CallDataType & { offerSDP: RTCSessionDescription | null };
type ClientAnswer = CallDataType & { answerSDP: RTCSessionDescription | null };

type ServerCandidate = CallDataType & { candidate: RTCIceCandidateInit | undefined };
type ServerOffer = CallDataType & { offer: RTCSessionDescription };
type ServerAnswer = CallDataType & { answer: RTCSessionDescription };

interface MessageClientToServer {
	"send-private-msg": (msgData: MessageType) => void;
}

interface MessageServerToClient {
	"receive-private-msg": (msgData: MessageType) => void;
	"connected-users": (connectedUsers: string[]) => void;
}

interface CallClientToServer {
	"candidate": (callData: ClientCandidate) => void;
	"offer": (callData: ClientOffer) => void;
	"answer": (callData: ClientAnswer) => void;
}

interface CallServerToClient {
	"candidate": (callData: ServerCandidate) => void;
	"offer": (callData: ServerOffer) => void;
	"answer": (callData: ServerAnswer) => void;
}

type ListeningEvents = MessageServerToClient & CallServerToClient;
type EmitingEvents = MessageClientToServer & CallClientToServer;

const socket: Socket<ListeningEvents, EmitingEvents> = io("http://localhost:8080", {
	transports: ["websocket"],
	autoConnect: false,
});

const token = getItem("token");
if (token) {
	socket.auth = { token };
}

export default socket;
