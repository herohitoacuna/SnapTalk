import { createContext, useCallback, useId, useState } from "react";
import IMessage from "../interfaces/Message";
import { getItem } from "../utils/localStorageItems";
import socket from "../socketConnection";
import { getMessages, updateMessagesStatus } from "../fetchingApi/messages";

interface ISendMessage {
	_id: string;
	sender: string;
	recipient: string;
	content: string;
	timestamp: Date;
	seen?: boolean;
}

interface IMessagesContext {
	messages: (IMessage | ISendMessage)[];
	fetchMessages: (contactId: string) => void;
	sendMessage: (content: string, contactId: string) => void;
	receiveMessage: (contacId: string) => void;
	updateMessageStatus: (contactId: string) => void;
}

export const MessagesContext = createContext<IMessagesContext>({
	messages: [],
	fetchMessages: (contactId: string) => {},
	sendMessage: (content: string) => {},
	receiveMessage: (contacId: string) => {},
	updateMessageStatus: (contacId: string) => {},
});

export const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
	const messageId = useId();
	const [messages, setMessages] = useState<(IMessage | ISendMessage)[]>([]);

	const fetchMessages = useCallback(
		async (contactId: string) => {
			try {
				const { responseData } = await getMessages(contactId);
				setMessages(responseData);
			} catch (error) {
				console.error(error);
			}
		},
		[setMessages],
	);

	const updateMessageStatus = useCallback(
		async (contactId: string) => {
			try {
				if (!contactId) return;
				const { responseData } = await updateMessagesStatus(contactId);
				fetchMessages(contactId);
			} catch (error) {
				console.error(error);
			}
		},
		[fetchMessages],
	);

	const sendMessage = useCallback(
		async (content: string, contactId: string) => {
			const newMessage: ISendMessage = {
				_id: messageId,
				sender: getItem("id"),
				recipient: contactId,
				content: content,
				timestamp: new Date(),
			};
			socket.emit("send-private-msg", newMessage);
			setMessages((prev) => [...prev, newMessage]);
		},
		[setMessages],
	);

	const receiveMessage = useCallback(
		(contactId: string) => {
			socket.on("receive-private-msg", (newMessage) => {
				if (newMessage) fetchMessages(contactId);
				if (contactId) updateMessageStatus(contactId);
			});
		},
		[fetchMessages, updateMessageStatus],
	);

	const contextValue = {
		messages,
		fetchMessages,
		sendMessage,
		receiveMessage,
		updateMessageStatus,
	};

	return <MessagesContext.Provider value={contextValue}>{children}</MessagesContext.Provider>;
};
