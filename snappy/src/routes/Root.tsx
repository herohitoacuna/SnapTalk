import { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import IUser from "../interfaces/User";

import socket from "../socketConnection";
import { getItem } from "../utils/localStorageItems";
import { getProfile } from "../fetchingApi/users";

import Modal from "../components/shared/Modal";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import ProfileInfo from "../components/right-side/ProfileInfo";
import ReceiveCall from "../components/call/ReceiveCall";
import { CallContext } from "../context/callContext";

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
	});

	const { offerSDP } = useContext(CallContext);

	const handlePersonInfo = (state: boolean) => {
		setOpenPersonInfo(state);
	};

	const fetchUserdetails = async () => {
		try {
			const { responseData } = await getProfile();
			setUser(responseData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!getItem("token")) {
			navigate("/auth");
			return;
		}
		fetchUserdetails();

		socket.connect();
		socket.on("connected-users", (connectedUsers) => {
			setIsOnlineUsers(connectedUsers);
		});

		const cleanup = () => {
			if (socket.connected) socket.disconnect();
		};
		return cleanup;
	}, []);

	return (
		<div className="w-screen h-screen md:flex overflow-hidden">
			<LeftSide />
			{offerSDP && (
				<Modal>
					<ReceiveCall />
				</Modal>
			)}
			<Outlet />
			<RightSide
				{...user}
				onOpenPersonInfo={handlePersonInfo}
				onlineUsers={onlineUsers}
			/>
			{openPersonInfo && (
				<Modal>
					<ProfileInfo
						{...user}
						onOpenPersonInfo={handlePersonInfo}
						fetchUserdetails={fetchUserdetails}
					/>
				</Modal>
			)}
		</div>
	);
};

export default RootLayout;
