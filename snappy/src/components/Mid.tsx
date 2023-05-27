import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import IUser from "../interfaces/User";
import ContactLandingView from "./mid/ContactLandingView";
import MessagesContainer from "./mid/MessagesContainer";
import { MessagesContext } from "../context/messagesContext";
import socket from "../socketConnection";
import { useAxios } from "../hooks/useAxios";
import { getItem } from "../utils/localStorageItems";

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
		socketId: "",
	});
	const contactData = useAxios({ method: "GET", endpoint: `/api/users/user/${contactId}` });
	useEffect(() => {
		(function fetchContactDetails() {
			contactData.then(({ resData }) => setContactDetails(resData));
		})();

		if (contactId) {
			fetchMessages(contactId);
			receiveMessage(contactId);
			updateMessageStatus(contactId);
		}

		return () => {
			socket.off("receive-private-msg");
		};
	}, [contactId]);

	useEffect(() => {
		if (messages.length !== 0) {
			setOpenMsgContainer(true);
		} else {
			setOpenMsgContainer(false);
		}
	}, [messages]);

	function handleOpenMsgContainer() {
		setOpenMsgContainer(true);
	}

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
