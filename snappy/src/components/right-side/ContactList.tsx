import { NavLink } from "react-router-dom";
import ContactCard from "./ContactCard";
import IContact from "../../interfaces/Contact";

interface UserContact {
	user: IContact;
	_id: string;
}

interface ContactListProps {
	contacts: UserContact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
	return (
		<div className="w-full">
			<h4 className="bg-violet-800 font-semibold pl-5 py-2">Contacts</h4>
			<div className="max-h-[600px] overflow-y-scroll">
				{contacts.map((contact) => (
					<NavLink
						key={contact.user._id}
						to={`/${contact.user._id}`}>
						<ContactCard contact={contact.user} />
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default ContactList;
