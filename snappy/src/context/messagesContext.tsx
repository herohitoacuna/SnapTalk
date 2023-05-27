import { createContext, useEffect, useId, useState } from "react";
import IMessage from "../interfaces/Message";
import { getItem } from "../utils/localStorageItems";
import axios from "axios";
import socket from "../socketConnection";
import { useAxios } from "../hooks/useAxios";

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

	async function fetchMessages(contactId: string) {
		try {
			const { resData } = await useAxios({
				method: "GET",
				endpoint: "/api/messages",
				params: contactId,
				authToken: getItem("token"),
			});
			setMessages(resData);
		} catch (error) {
			console.error(error);
		}
	}

	function receiveMessage(contactId: string) {
		socket.on("receive-private-msg", (newMessage) => {
			if (newMessage) {
				fetchMessages(contactId);
			}
		});
	}

	async function sendMessage(content: string, contactId: string) {
		const newMessage: ISendMessage = {
			_id: messageId,
			sender: getItem("id"),
			recipient: contactId,
			content: content,
			timestamp: new Date(),
		};
		socket.emit("send-private-msg", newMessage);
		// updateMessageStatus(contactId);
		setMessages((prev) => [...prev, newMessage]);
	}

	async function updateMessageStatus(contactId: string) {
		try {
			if (contactId) {
				await useAxios({
					method: "PUT",
					endpoint: "/api/messages",
					params: contactId,
					authToken: getItem("token"),
				});
				fetchMessages(contactId);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const contextValue = {
		messages,
		fetchMessages,
		sendMessage,
		receiveMessage,
		updateMessageStatus,
	};

	return <MessagesContext.Provider value={contextValue}>{children}</MessagesContext.Provider>;
};
