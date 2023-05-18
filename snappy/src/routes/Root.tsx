import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import socket from "../socket/socketConnection";

import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import ProfileInfo from "../components/right-side/ProfileInfo";

import IUser from "../interfaces/User";
import IContact from "../interfaces/Contact";

interface UserContact {
	user: IContact;
	_id: string;
}

interface UserContacts extends IUser {
	contacts: UserContact[];
}

const RootLayout = () => {
	const navigate = useNavigate();
	const [openPersonInfo, setOpenPersonInfo] = useState(false);
	const [user, setUser] = useState<UserContacts>({
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		avatar: "",
		socketId: "",
		contacts: [],
	} as UserContacts);

	async function fetchUserdetails() {
		try {
			const user = await axios(`${import.meta.env.VITE_PORT}/api/users/user`, {
				method: "GET",
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			const resData: UserContacts = user.data;
			// console.log(resData);
			setUser(resData);
		} catch (error) {
			console.log(error);
		}
	}

	function handlePersonInfo(state: boolean) {
		setOpenPersonInfo(state);
	}

	useEffect(() => {
		if (!localStorage.getItem("token")) {
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
		fetchUserdetails();
	}, [openPersonInfo]);

	return (
		<div className="w-screen h-screen md:flex relative overflow-hidden">
			<LeftSide />
			<Outlet />
			<RightSide
				firstName={user?.firstName}
				lastName={user?.lastName}
				avatar={user.avatar}
				username={user?.username}
				contacts={user?.contacts}
				onOpenPersonInfo={handlePersonInfo}
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
