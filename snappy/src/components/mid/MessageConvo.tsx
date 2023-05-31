import { useContext, useEffect, useRef } from "react";
import DateSeparator from "./DateSeparator";
import { getItem } from "../../utils/localStorageItems";
import { MessagesContext } from "../../context/messagesContext";
import SenderMessage from "./SenderMessage";
import RecipientMessage from "./RecipientMessage";

const MessageConvo = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { messages } = useContext(MessagesContext);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	function scrollToBottom() {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}

	const conversation: React.ReactNode[] = messages.map((msg, i) => {
		const { _id, sender, recipient, content, timestamp, seen } = msg;
		const fromSelf = getItem("id") === sender;

		const date = new Date(timestamp);
		const msgDate = date.toLocaleDateString();
		const prevMsgDate = new Date(messages[i === 0 ? i : i - 1]?.timestamp).toLocaleDateString();

		// TODAY OR YESTERDAY
		const dateNow = new Date();
		const sameMonth = dateNow.getMonth() === date.getMonth();
		const sameYear = dateNow.getFullYear() === date.getFullYear();

		let day = msgDate;
		if (dateNow.toLocaleDateString() === date.toLocaleDateString()) {
			day = "TODAY";
		}
		if (sameYear && sameMonth && dateNow.getDate() - date.getDate() === 1) {
			day = "YESTERDAY";
		}

		return (
			<div key={_id}>
				{i === 0 || msgDate !== prevMsgDate ? <DateSeparator date={day} /> : null}

				{fromSelf && (
					<SenderMessage
						content={content}
						timestamp={timestamp}
						seen={seen}
					/>
				)}

				{!fromSelf && (
					<RecipientMessage
						content={content}
						timestamp={timestamp}
						seen={seen}
					/>
				)}
			</div>
		);
	});

	return (
		<div
			ref={containerRef}
			className="grow w-full px-12 pt-5 pb-3 overflow-y-auto
				flex flex-col gap-5">
			{conversation}
		</div>
	);
};

export default MessageConvo;
