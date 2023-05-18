import { io, Socket } from "socket.io-client";

interface ClientToServerEvents {
	"private-message": (data: any) => void;
	"helloServer": () => void;
}

interface ServerToClientEvents {
	"private-message": () => void;
}

const token = localStorage.getItem("token");

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8080", {
	transports: ["websocket"],
	autoConnect: false,
	auth: {
		token,
	},
});

export default socket;
