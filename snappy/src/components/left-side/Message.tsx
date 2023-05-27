import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";

const Message = () => {
	/*
		Expected receive props

		{
			userId
			lastMessage: {
				senderId,
				recepientId,
				content,
				seen,
				timestamp
			}
		}

	
	*/

	const user = {
		id: 2,
		fullname: "Herohito Acuna",
		content: "GoodMorning asdasdadsad asdasd asdsadsa asdadsadsa s ASDadas  asdasdas",
		time: "4h",
		seen: false,
	};

	const background = user.seen ? "" : "bg-blue-200";

	return (
		<NavLink to={`/${user.id}`}>
			<div
				className={`flex items-center gap-3 pl-2 md:pl-5 py-3 border-b-[1px] border-slate-400/20 hover-container ${background}`}>
				<Avatar sx={{ height: 45, width: 45, fontSize: 20 }}>JD</Avatar>

				<div className="flex flex-col grow flex-shrink-0">
					<h2 className="max-w-[18rem] md:max-w-[27rem] text-lg font-bold truncate">{user.fullname}</h2>
					<div className="flex">
						<span className="max-w-[17rem] md:max-w-[26rem] md truncate">{user.content}</span>
						<span className="flex items-center ml-2 text-xs text-black/60">•{user.time}</span>
					</div>
				</div>

				<div className="flex mr-5">
					{user.seen ? null : <span className="h-[8px] w-[8px] rounded-full bg-blue-600"></span>}
				</div>
			</div>
		</NavLink>
	);
};

export default Message;
