import { useState, useEffect, useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { TextareaAutosize } from "@mui/material";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { MessagesContext } from "../../context/messagesContext";
import { useParams } from "react-router-dom";

const MessageArea = () => {
	const { contactId } = useParams();
	const { sendMessage: onSendMessage } = useContext(MessagesContext);
	const [showEmojis, setShowEmojis] = useState<boolean>(false);
	const [content, setContent] = useState<string>("");

	function handleClickSend() {
		if (content.trim() && contactId) {
			onSendMessage(content.trim(), contactId);
			setContent("");
		}
	}

	function handleEnterSend(e: any) {
		if (e.key === "Enter" && !e.shiftKey && content.trim() && contactId) {
			e.preventDefault();
			onSendMessage(content.trim(), contactId);
			setContent("");
		}
	}

	function handleContentChange(e: any) {
		setContent(e.target?.value);
	}

	function handleSelectEmoji(emojiData: EmojiClickData, event: any) {
		setContent((prev) => [...prev.split(""), emojiData.emoji].join(""));
	}

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
				onKeyDown={handleEnterSend}
				onChange={handleContentChange}
				className="w-full text-sm outline-none px-2 py-2 rounded-lg resize-none"
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
