import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeItem } from "../utils/localStorageItems";

import LogoutIcon from "@mui/icons-material/Logout";
import RightTop from "./right-side/RightTop";
import ContactList from "./right-side/ContactList";
import socket from "../socketConnection";

interface RightSideProps {
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	onOpenPersonInfo: (state: boolean) => void;
	onlineUsers: string[];
}

const RightSide: React.FC<RightSideProps> = ({
	onOpenPersonInfo,
	firstName,
	lastName,
	username,
	avatar,
	onlineUsers,
}) => {
	const navigate = useNavigate();

	function handleLogout() {
		removeItem("token");
		removeItem("id");
		socket.disconnect();
		navigate("/auth");
	}

	return (
		<div className="w-full h-full lg:w-[20vw] flex flex-col text-white bg-container">
			<RightTop
				onClick={() => onOpenPersonInfo(true)}
				firstName={firstName}
				lastName={lastName}
				username={username}
				avatar={avatar}
			/>

			<ContactList onlineUsers={onlineUsers} />

			<footer className="w-full flex flex-col items-center bottom-0 ">
				<button
					onClick={handleLogout}
					className="mb-12 text-xl font-medium hover:opacity-50 rounded-md border-white">
					Logout
					<LogoutIcon sx={{ color: "rgba(255, 0, 0)", marginLeft: "1rem", fontSize: "2rem" }} />
				</button>

				<NavLink to="/">
					<h3 className="text-center text-2xl font-bold mb-3">SnapTalk</h3>
					<p className="text-center text-sm">Herohito Acuña | 2023</p>
				</NavLink>
			</footer>
		</div>
	);
};

export default RightSide;
