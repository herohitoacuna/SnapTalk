import { io, Socket } from "socket.io-client";
import { getItem } from "./utils/localStorageItems";

// interface ClientToServerEvents {
// 	"user:connected": (data: any, data2: any) => void;
// 	"private-message": (data: any) => void;
// 	"helloServer": () => void;
// }

// interface ServerToClientEvents {
// 	"user:connected": (data: any, data2: any) => void;
// 	"private-message": () => void;
// }

const token = getItem("token");

const socket = io("http://localhost:8080", {
	transports: ["websocket"],
	autoConnect: false,
});

if (token) {
	socket.auth = { token };
}

export default socket;
