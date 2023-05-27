import { Avatar } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";
import { getItem } from "../../utils/localStorageItems";
import DoneAllIcon from "@mui/icons-material/Done";
import { ChangeEvent, useContext } from "react";
import { ContactContext } from "../../context/contactsContext";

interface ResultProps {
	id: string;
	firstName: string;
	lastName: string;
	avatar?: string;
	username: string;
	onUserClick: () => void;
	onKeyUp: (e: React.KeyboardEvent) => void;
	inContacts: boolean;
}

const Result: React.FC<ResultProps> = ({
	id,
	firstName,
	lastName,
	avatar,
	username,
	onUserClick,
	onKeyUp,
	inContacts,
}) => {
	const { addContact } = useContext(ContactContext);

	function handleOnKeyUp(e: React.KeyboardEvent) {
		onKeyUp(e);
	}

	function handleAddContacts(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		e.stopPropagation();
		addContact(id);
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
			{inContacts ? (
				<DoneAllIcon sx={{ width: "20px", height: "20px" }} />
			) : (
				<button
					onClick={handleAddContacts}
					className="p-2 
					hover:bg-slate-400 hover:opacity-80 hover:rounded-full">
					<PersonAddAlt1Icon />
				</button>
			)}
		</div>
	);
};

export default Result;
