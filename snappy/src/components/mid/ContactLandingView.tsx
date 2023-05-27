import { Emoji } from "emoji-picker-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IMessage from "../../interfaces/Message";
import axios from "axios";
import IUser from "../../interfaces/User";
import { MessagesContext } from "../../context/messagesContext";

interface ContactLandingView {
	contactDetails: IUser;
	onOpenMsgContainer: () => void;
}

const ContactLandingView: React.FC<ContactLandingView> = ({ contactDetails, onOpenMsgContainer }) => {
	const { contactId } = useParams();
	const { sendMessage: onSendMessage } = useContext(MessagesContext);

	function handleSendHi() {
		if (contactId) {
			onSendMessage("Hi 👋", contactId);
		}
	}

	return (
		<div className="h-full w-full flex flex-col  gap-4 items-center justify-center text-white bg-indigo-900">
			<div
				className={`flex items-center justify-center h-[200px] w-[200px]
		 			text-7xl  rounded-full
		 			bg-blue-500 bg-cover bg-no-repeat]
		 			`}>
				{contactDetails.avatar ? (
					<img
						className="h-[200px] w-[200px] rounded-full object-cover "
						src={contactDetails?.avatar}
						alt="Images"
					/>
				) : (
					`${contactDetails?.firstName.substring(0, 1).toUpperCase()}${contactDetails?.lastName
						.substring(0, 1)
						.toUpperCase()}`
				)}
			</div>

			<h4 className="text-4xl">{`${contactDetails?.firstName} ${contactDetails?.lastName}`}</h4>

			<h6 className="mb-52 text-xl">@{contactDetails?.username}</h6>
			<button
				onClick={handleSendHi}
				className="flex items-center gap-5  px-8 py-4
					text-lg font-bold border-[1px] border-white rounded-md 
					hover-container">
				Send Hi!
				<Emoji
					unified="1f44b"
					size={50}
				/>
			</button>
			<button
				onClick={onOpenMsgContainer}
				className="px-6 py-2 rounded-md border border-white/50
				font-semibold
				hover-container">
				Start conversation
			</button>
		</div>
	);
};

export default ContactLandingView;
