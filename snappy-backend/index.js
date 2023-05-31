const express = require("express");
const compression = require("compression");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("cloudinary").v2;

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { socketAuth } = require("./socket.io/socketAuth");
const { onConnection, onDisconnect, sendPrivateMessage } = require("./socket.io/socketaHandlers");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { iceCandidate, offer, answer } = require("./socket.io/webrtcHandlers");
const io = new Server(server, { cors: { origin: "*" } });

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to the database"))
	.catch((err) => console.error(err));

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

io.use(socketAuth);
io.on("connection", async (socket) => {
	onConnection(socket, io);
	onDisconnect(socket, io);
	sendPrivateMessage(socket, io);

	//webrtc handlers
	iceCandidate(socket, io);
	offer(socket, io);
	answer(socket, io);
});

app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server listening on PORT: " + PORT);
});
