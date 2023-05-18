import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { TextareaAutosize } from "@mui/material";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";

interface MessageAreaProps {
	onSendMsg: (msg: string) => void;
}

const MessageArea: React.FC<MessageAreaProps> = ({ onSendMsg }) => {
	const [showEmojis, setShowEmojis] = useState<boolean>(false);
	const [content, setContent] = useState<string>("");

	const handleEnterSend = (e: any) => {
		if (e.key === "Enter" && !e.shiftKey && content.trim()) {
			handleClickSend();
			console.log("Sent");
		}
	};

	const handleClickSend = () => {
		if (content.trim()) {
			onSendMsg(content.trim());
		}
		setContent("");
	};

	const handleContentChange = (e: any) => {
		setContent(e.target?.value);
	};

	const handleSelectEmoji = (emojiData: EmojiClickData, event: any) => {
		setContent((prev) => [...prev.split(""), emojiData.emoji].join(""));
	};

	return (
		<div className="flex items-center justify-center p-5 border-r-[1px] border-violet-700 bg-container">
			<SentimentSatisfiedAltIcon
				className="hover:opacity-70 cursor-pointer"
				onClick={(e) => setShowEmojis(!showEmojis)}
				sx={{ color: "white", fontSize: "2rem", margin: "0 6px 0 0" }}
			/>

			<TextareaAutosize
				minRows={1}
				maxRows={3}
				placeholder="Message ..."
				value={content}
				onKeyUp={handleEnterSend}
				onChange={handleContentChange}
				onFocus={() => setShowEmojis(false)}
				onBlur={() => setShowEmojis(false)}
				className="w-full outline-none px-3 py-2 rounded-lg resize-none"
			/>
			{showEmojis && (
				<div className="absolute bottom-[5.5rem] left-[1.2rem]">
					<EmojiPicker
						emojiStyle={EmojiStyle.FACEBOOK}
						onEmojiClick={handleSelectEmoji}
					/>
				</div>
			)}
			<SendIcon
				className="hover:opacity-70 cursor-pointer"
				onClick={handleClickSend}
				sx={{
					color: "white",
					fontSize: "2rem",
					marginLeft: "8px",
				}}
			/>
		</div>
	);
};

export default MessageArea;
