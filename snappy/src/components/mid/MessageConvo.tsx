import DoneIcon from "@mui/icons-material/Done";
import { Avatar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DateSeparator from "./DateSeparator";

interface MessageConvoProps {
	messages: Message[];
	loginId: string;
}

interface Message {
	id: string;
	sender: string;
	recipient: string;
	content: string;
	timestamp: Date;
	seen: boolean;
}

const MessageConvo: React.FC<MessageConvoProps> = ({ messages, loginId }) => {
	// check if the message.sender === userId
	// check if the previous timestamp is not equal to the time stampnow
	const conversation: JSX.Element[] = messages.map((msg: Message, index: number) => {
		const { content, id, recipient, sender, timestamp, seen } = msg;

		const isSentByUser = sender === loginId;
		const isLoading = false;
		const isSeen = false;

		// TIME SENT
		const timeSent = timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

		// DATE
		const prevTime = index > 0 ? messages[index - 1].timestamp.toLocaleDateString() : null;
		const curTime = timestamp.toLocaleDateString();
		const sameDay = curTime === prevTime;

		// TODAY OR YESTERDAY
		const dateNow = new Date();
		const sameMonth = dateNow.getMonth() === timestamp.getMonth();
		const sameYear = dateNow.getFullYear() === timestamp.getFullYear();

		// style
		const containerPosition = isSentByUser ? "justify-end" : null;
		const bgColor = isSentByUser ? "bg-yellow-200" : "bg-blue-200";
		const msgPosition = isSentByUser ? "justify-end" : null;
		const direction = isSentByUser ? "flex-row-reverse" : null;

		return (
			<div key={id}>
				{!sameDay && (
					<DateSeparator
						date={
							curTime === dateNow.toLocaleDateString()
								? "TODAY"
								: dateNow.getDate() - timestamp.getDate() === 1 && sameMonth && sameYear
								? "YESTERDAY"
								: curTime
						}
					/>
				)}
				<div className={`flex mb-3 ${direction}`}>
					<div className={`flex w-full mx-2 ${containerPosition}`}>
						<div className={`max-w-[75%] p-2 rounded-lg ${bgColor}`}>
							<p>{content}</p>

							<div className={`flex mt-2 ${direction}`}>
								{!isLoading && isSeen ? (
									<CircularProgress style={{ width: "15px", height: "15px" }} />
								) : (
									<DoneIcon style={{ width: "15px", height: "15px" }} />
								)}

								<span className={`text-xs text-slate-800`}>{timeSent}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return <div className="grow w-full px-5 pt-5 pb-3 overflow-y-auto scroll-smooth">{conversation}</div>;
};

export default MessageConvo;
