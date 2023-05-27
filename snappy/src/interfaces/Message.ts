interface IMessage {
	_id: string;
	sender: string | undefined;
	recipient: string | undefined;
	content: string;
	timestamp: Date;
	seen: boolean;
}

export default IMessage;
