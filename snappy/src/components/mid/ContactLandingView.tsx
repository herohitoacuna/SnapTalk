import IUser from "../../interfaces/User";
import { Emoji } from "emoji-picker-react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MessagesContext } from "../../context/messagesContext";
import { defaultChars } from "../../utils/avatarDefaultChars";
import { Avatar } from "@mui/material";

interface ContactLandingView {
	contactDetails: IUser;
	onOpenMsgContainer: () => void;
}

const ContactLandingView: React.FC<ContactLandingView> = ({ contactDetails, onOpenMsgContainer }) => {
	const { contactId } = useParams();
	const { sendMessage: onSendMessage } = useContext(MessagesContext);
	const { avatar, firstName, lastName, username } = contactDetails;

	function handleSendHi() {
		if (contactId) onSendMessage("Hi 👋", contactId);
	}

	return (
		<div className="h-full w-full flex flex-col  gap-4 items-center justify-center text-white bg-indigo-900">
			<Avatar
				src={avatar}
				sizes="45px"
				sx={{ fontSize: "2rem" }}>
				{defaultChars(firstName, lastName)}
			</Avatar>
			<h4 className="text-4xl">{`${firstName} ${lastName}`}</h4>
			<h6 className="mb-52 text-xl">@{username}</h6>
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
