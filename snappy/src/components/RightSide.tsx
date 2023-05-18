import { useEffect, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import RightTop from "./right-side/RightTop";
import ContactList from "./right-side/ContactList";
import socket from "../socket/socketConnection";
import IContact from "../interfaces/Contact";

interface UserContact {
	user: IContact;
	_id: string;
}

interface RightSideProps {
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	contacts: UserContact[];
	onOpenPersonInfo: (state: boolean) => void;
}

const RightSide: React.FC<RightSideProps> = ({ onOpenPersonInfo, firstName, lastName, username, contacts, avatar }) => {
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		socket.disconnect();
		navigate("/auth");
	}

	return (
		<div className="w-full h-full lg:w-[20vw] text-white bg-container relative">
			<RightTop
				onClick={() => onOpenPersonInfo(true)}
				firstName={firstName}
				lastName={lastName}
				username={username}
				avatar={avatar}
			/>

			<ContactList contacts={contacts} />

			<footer className="w-full flex flex-col items-center absolute bottom-0 ">
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
