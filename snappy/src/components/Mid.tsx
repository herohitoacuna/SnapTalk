import { useContext, useEffect, useState } from "react";
import { ShowCompContext } from "../context/show-comp";
import useWindowSize from "../hooks/useWindowSize";

import MidTop from "./mid/MidTop";
import MessageArea from "./mid/MessageArea";
import MessageConvo from "./mid/MessageConvo";

import { users } from "../mock-data";
import { messages } from "../mock-data";
import { useParams } from "react-router-dom";
import socket from "../socket/socketConnection";
import axios from "axios";
import IMessage from "../interfaces/Message";
import IUser from "../interfaces/User";
import { Emoji } from "emoji-picker-react";

interface MidProps {
	// onSearchRef: React.RefObject<HTMLInputElement>;
}

const Mid: React.FC<MidProps> = ({}) => {
	const { contactId } = useParams();
	const { midContainer } = useContext(ShowCompContext);
	const { width } = useWindowSize();

	const [contactDetails, setContactDetails] = useState<IUser>();
	const [msgs, setMsgs] = useState<IMessage[]>([]);

	// user logged details are save in the localStoragte
	const loggedUser = JSON.parse(localStorage.getItem("user-details") || "");
	const loginUserId = loggedUser._id;

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_PORT}/api/users/user/${contactId}`)
			.then(({ data }) => {
				setContactDetails(data);
			})
			.catch((err) => console.log(err.message));
	}, [contactId]);

	function handleSendMsg(msgContent: string) {
		const messageObj = {
			sender: loggedUser._id,
			recipient: contactId,
			content: msgContent,
		};
		socket.emit("private-message", messageObj);
	}

	let overlay = width < 480 ? "overlay" : "";
	const showMidContainer = midContainer ? "open-animate" : "close-animate";

	return (
		<div className={`flex flex-col w-full md:w-[50vw] h-full bg-white ${showMidContainer} `}>
			{contactId ? (
				msgs.length === 0 ? (
					<div className="h-full w-full text-white flex flex-col gap-4 items-center justify-center bg-indigo-900">
						<div
							className={`h-[170px] w-[170px] rounded-full flex items-center justify-center text-7xl
							bg-blue-500 bg-cover bg-no-repeat bg-[url(${contactDetails?.avatar})]`}>
							{`${contactDetails?.firstName.substring(0, 1).toUpperCase()}${contactDetails?.lastName
								.substring(0, 1)
								.toUpperCase()}`}
						</div>
						<h4 className="text-4xl">{`${contactDetails?.firstName} ${contactDetails?.lastName}`}</h4>
						<h6 className="mb-52 text-xl">@{contactDetails?.username}</h6>
						<button
							className="flex items-center gap-5 border-[1px] border-white rounded-md px-8 py-4 text-lg font-bold 
							hover-container">
							Send Hi!
							<Emoji
								unified="1f44b"
								size={50}
							/>
						</button>
						<button
							className="border border-white/50 text-slate-200 px-6 py-2 rounded-md
							hover-container
						">
							Start conversation
						</button>
					</div>
				) : (
					<>
						<MidTop contact={contactDetails} />
						<MessageConvo
							messages={msgs}
							loginId={loginUserId}
						/>
						<MessageArea onSendMsg={handleSendMsg} />
					</>
				)
			) : null}
		</div>
	);
};

export default Mid;
