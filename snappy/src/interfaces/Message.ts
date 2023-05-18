interface IMessage {
	id: string;
	sender: string;
	recipient: string;
	content: string;
	timestamp: Date;
	seen: boolean;
}

export default IMessage;
