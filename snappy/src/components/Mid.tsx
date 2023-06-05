import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CallContext } from "../context/callContext";
import { MessagesContext } from "../context/messagesContext";
import { getContactInfo } from "../fetchingApi/users";
import IUser from "../interfaces/User";
import socket from "../socketConnection";

import Modal from "./shared/Modal";
import ContactLandingView from "./mid/ContactLandingView";
import MessagesContainer from "./mid/MessagesContainer";
import MakeCall from "./call/MakeCall";

export default function Mid() {
	const { contactId } = useParams();
	// contexts
	const { messages, fetchMessages, receiveMessage, updateMessageStatus } = useContext(MessagesContext);
	const { openCall, handleContactId } = useContext(CallContext);

	// states
	const [openMsgContainer, setOpenMsgContainer] = useState(false);
	const [contactDetails, setContactDetails] = useState<IUser>({} as IUser);

	const fetchContactDetails = useCallback(async () => {
		try {
			const { responseData } = await getContactInfo(contactId as string);
			setContactDetails(responseData);
		} catch (error) {
			console.log(error);
		}
	}, [contactId]);

	const handleOpenMsgContainer = () => {
		setOpenMsgContainer(true);
	};

	useEffect(() => {
		if (!contactId) return;
		handleContactId(contactId);
	}, [contactId]);

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
	}, [fetchContactDetails, fetchMessages, receiveMessage, updateMessageStatus, contactId]);

	useEffect(() => {
		if (messages.length !== 0) {
			setOpenMsgContainer(true);
		} else {
			setOpenMsgContainer(false);
		}
	}, [messages]);

	return (
		<div className={`flex flex-col w-full md:w-[50vw] h-full bg-white`}>
			{openCall && (
				<Modal>
					<MakeCall {...contactDetails} />
				</Modal>
			)}

			{!openMsgContainer && (
				<ContactLandingView
					contactDetails={contactDetails}
					onOpenMsgContainer={handleOpenMsgContainer}
				/>
			)}
			{openMsgContainer && <MessagesContainer contactDetails={contactDetails} />}
		</div>
	);
}
