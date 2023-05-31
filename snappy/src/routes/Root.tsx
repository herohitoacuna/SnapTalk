import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import socket from "../socketConnection";
import { motion } from "framer-motion";

import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import ProfileInfo from "../components/right-side/ProfileInfo";

import IUser from "../interfaces/User";
import { getItem } from "../utils/localStorageItems";
import VideoAudioCall from "../components/VideoAudioCall";
import { getProfile } from "../fetchingApi/users";
import { VideoCallContext } from "../context/videoCallContext";

const RootLayout = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { openCall } = useContext(VideoCallContext);

	const navigate = useNavigate();
	const [onlineUsers, setIsOnlineUsers] = useState<string[]>([]);
	const [openPersonInfo, setOpenPersonInfo] = useState(false);
	const [user, setUser] = useState<IUser>({
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		avatar: "",
		socketId: "",
	} as IUser);

	function handlePersonInfo(state: boolean) {
		setOpenPersonInfo(state);
	}

	async function fetchUserdetails() {
		try {
			const { responseData } = await getProfile();
			setUser(responseData);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (!getItem("token")) {
			navigate("/auth");
			return;
		}

		socket.connect();

		fetchUserdetails();

		socket.on("connected-users", (connectedUsers) => {
			setIsOnlineUsers(connectedUsers);
		});

		const cleanup = () => {
			if (socket.connected) {
				socket.disconnect();
			}
		};
		return cleanup;
	}, []);

	return (
		<div
			ref={containerRef}
			className="w-screen h-screen md:flex overflow-hidden">
			<LeftSide />
			{openCall && (
				<motion.div
					drag
					dragConstraints={containerRef}>
					<VideoAudioCall />
				</motion.div>
			)}

			<Outlet />
			<RightSide
				firstName={user?.firstName}
				lastName={user?.lastName}
				avatar={user.avatar}
				username={user?.username}
				onOpenPersonInfo={handlePersonInfo}
				onlineUsers={onlineUsers}
			/>
			{openPersonInfo && (
				<ProfileInfo
					firstName={user.firstName}
					lastName={user.lastName}
					avatar={user.avatar}
					username={user.username}
					email={user.email}
					onOpenPersonInfo={handlePersonInfo}
					fetchUserdetails={fetchUserdetails}
				/>
			)}
		</div>
	);
};

export default RootLayout;
