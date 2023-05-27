import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import socket from "../socketConnection";

import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import ProfileInfo from "../components/right-side/ProfileInfo";

import IUser from "../interfaces/User";
import { getItem } from "../utils/localStorageItems";

const RootLayout = () => {
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

	useEffect(() => {
		if (!getItem("token")) {
			navigate("/auth");
			return;
		} else {
			socket.connect();
		}
		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		async function fetchUserdetails() {
			try {
				const user = await axios(`${import.meta.env.VITE_PORT}/api/users/user`, {
					method: "GET",
					headers: {
						Authorization: getItem("token"),
					},
				});
				const resData: IUser = user.data;
				setUser(resData);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUserdetails();
	}, []);

	// //example contactId and messages state
	// const contactId = "asdad21312312";
	// const [messages, setMessages] = useState([])

	useEffect(() => {
		socket.on("connected-users", (connectedUsers) => {
			setIsOnlineUsers(connectedUsers);
		});
	}, []);

	return (
		<div className="w-screen h-screen md:flex relative overflow-hidden">
			<LeftSide />
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
				/>
			)}
		</div>
	);
};

export default RootLayout;
