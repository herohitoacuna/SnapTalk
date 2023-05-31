import { useContext } from "react";
import { NavLink } from "react-router-dom";
import ContactCard from "./ContactCard";
import { ContactContext } from "../../context/contactsContext";

const ContactList: React.FC<{ onlineUsers: string[] }> = ({ onlineUsers }) => {
	const { contacts } = useContext(ContactContext);

	// console.log(contacts);
	const contactsArray = contacts
		.map((contact) => {
			if (onlineUsers.includes(contact.user._id)) {
				contact.user.isOnline = true;
			} else {
				contact.user.isOnline = false;
			}
			return contact.user;
		})
		.sort((a, b) => {
			const firstNameComparison = a.firstName.localeCompare(b.firstName);

			if (a.isOnline && !b.isOnline) {
				return -1; // a should come before b
			} else if (!a.isOnline && b.isOnline) {
				return 1; // a should come after b
			} else if (firstNameComparison !== 0) {
				return firstNameComparison;
			}
			return 0; // no change in order
		});

	return (
		<div className="w-full flex-grow">
			<h4 className="bg-violet-800 font-semibold pl-5 py-2">Contacts</h4>
			<div className="max-h-[600px] overflow-y-scroll">
				{contactsArray.map((contact) => {
					return (
						<NavLink
							key={contact._id}
							to={`/${contact._id}`}>
							<ContactCard contact={contact} />
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default ContactList;
