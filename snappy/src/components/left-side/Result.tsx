import { Avatar } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";

interface ResultProps {
	id: string;
	firstName: string;
	lastName: string;
	avatar?: string;
	username: string;
	index: number;
	onUserClick: () => void;
	onKeyUp: (e: React.KeyboardEvent) => void;
}

const Result: React.FC<ResultProps> = ({ id, firstName, lastName, avatar, username, index, onUserClick, onKeyUp }) => {
	function handleOnKeyUp(e: React.KeyboardEvent) {
		console.log(e);
		console.log("Result Component");
		onKeyUp(e);
	}

	async function handleAddContact(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		try {
			const userId = JSON.parse(localStorage.getItem("id") || "");
			const res = await axios.patch(`${import.meta.env.VITE_PORT}/api/users/user/${userId}/contacts/${id}`);
			const resData = await res.data;
			console.log(resData);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div
			onClick={onUserClick}
			onKeyDown={handleOnKeyUp}
			className="flex gap-3 p-2 items-center justify-between border-b-[1px]  hover-container">
			<div className="flex items-center gap-3">
				<Avatar src={avatar}></Avatar>
				<span>
					<h4 className="font-bold text-lg leading-tight">{`${firstName} ${lastName}`}</h4>
					<span className="text-sm">@{username}</span>
				</span>
			</div>
			<button
				onClick={handleAddContact}
				className="p-2 
				hover:bg-slate-400 hover:opacity-80 hover:rounded-full">
				<PersonAddAlt1Icon />
			</button>
		</div>
	);
};

export default Result;
