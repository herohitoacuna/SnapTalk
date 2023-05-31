import { Avatar } from "@mui/material";
import { IContact } from "../../interfaces/Contact";
import { defaultChars } from "../../utils/avatarDefaultChars";

interface ContactCardProps {
	contact: IContact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
	const { avatar, email, firstName, lastName, username, isOnline } = contact;
	return (
		<div
			onClick={() => {}}
			className={`flex items-center py-3 px-5 hover-container 
			${isOnline ? "" : "opacity-80"}
			`}>
			<div className="relative">
				{contact.isOnline && (
					<div className="w-[1rem] h-[1rem] rounded-full border-[2px] border-violet-950 bg-green-500 absolute -right-1 -bottom-1"></div>
				)}
				<Avatar
					src={contact?.avatar}
					sx={{ height: 40, width: 40, fontSize: "1.2rem", backgroundColor: "#0ea5e9" }}>
					{defaultChars(firstName, lastName)}
				</Avatar>
			</div>
			<p className="text-white text-lg font-semibold ml-2">{`${contact.firstName} ${contact.lastName}`}</p>
		</div>
	);
};

export default ContactCard;
