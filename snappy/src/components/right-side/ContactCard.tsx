import { Avatar } from "@mui/material";
import IContact from "../../interfaces/Contact";

interface ContactCardProps {
	contact: IContact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
	return (
		<div
			onClick={() => {}}
			className="flex items-center py-3 px-5 hover-container">
			<div className="relative">
				{contact.socketId && (
					<div className="w-[1rem] h-[1rem] rounded-full border-[2px] border-violet-950 bg-green-500 absolute z-10 -right-1 -bottom-1"></div>
				)}
				<Avatar
					src={contact.avatar}
					sx={{ height: 35, width: 35, fontSize: "1rem" }}>
					{`${contact?.firstName.substring(0, 1).toUpperCase()}${contact?.lastName
						.substring(0, 1)
						.toUpperCase()}`}
				</Avatar>
			</div>
			<p className="text-white font-semibold ml-2">{`${contact.firstName} ${contact.lastName}`}</p>
		</div>
	);
};

export default ContactCard;
