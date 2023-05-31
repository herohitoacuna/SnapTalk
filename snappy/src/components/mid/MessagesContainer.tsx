import MidTop from "./MidTop";
import MessageArea from "./MessageArea";
import MessageConvo from "./MessageConvo";
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
