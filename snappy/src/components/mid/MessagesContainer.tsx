import { useEffect, useState } from "react";
import MidTop from "./MidTop";
import MessageArea from "./MessageArea";
import MessageConvo from "./MessageConvo";
import { useNavigate } from "react-router-dom";
import IMessage from "../../interfaces/Message";
import axios from "axios";
import socket from "../../socketConnection";
import IUser from "../../interfaces/User";

interface MessagesContainerProps {
	contactDetails: IUser;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ contactDetails }) => {
	return (
		<>
			<MidTop contact={contactDetails} />
			<MessageConvo />
			<MessageArea />
		</>
	);
};

export default MessagesContainer;
