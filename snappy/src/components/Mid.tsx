import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IUser from "../interfaces/User";
import ContactLandingView from "./mid/ContactLandingView";
import MessagesContainer from "./mid/MessagesContainer";
import { MessagesContext } from "../context/messagesContext";
import socket from "../socketConnection";
import { getContactInfo } from "../fetchingApi/users";
import { VideoCallContext } from "../context/videoCallContext";

const Mid = () => {
	const { contactId } = useParams();
	const { messages, fetchMessages, receiveMessage, updateMessageStatus } = useContext(MessagesContext);
	const [openMsgContainer, setOpenMsgContainer] = useState(false);
	const [contactDetails, setContactDetails] = useState<IUser>({
		_id: "",
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		avatar: "",
	});

	const fetchContactDetails = useCallback(async () => {
		try {
			const { responseData } = await getContactInfo(contactId as string);
			setContactDetails(responseData);
		} catch (error) {
			console.log(error);
		}
	}, [contactId]);

	function handleOpenMsgContainer() {
		setOpenMsgContainer(true);
	}

	useEffect(() => {
		if (!contactId) return;
		fetchContactDetails();
		fetchMessages(contactId);
		receiveMessage(contactId);
		updateMessageStatus(contactId);

		const cleanup = () => {
			socket.off("receive-private-msg");
		};

		return cleanup;
	}, [fetchContactDetails, fetchMessages, receiveMessage, updateMessageStatus]);

	useEffect(() => {
		if (messages.length !== 0) {
			setOpenMsgContainer(true);
		} else {
			setOpenMsgContainer(false);
		}
	}, [messages]);

	return (
		<div className={`flex flex-col w-full md:w-[50vw] h-full bg-white`}>
			{!openMsgContainer && (
				<ContactLandingView
					contactDetails={contactDetails}
					onOpenMsgContainer={handleOpenMsgContainer}
				/>
			)}
			{openMsgContainer && <MessagesContainer contactDetails={contactDetails} />}
		</div>
	);
};

export default Mid;
