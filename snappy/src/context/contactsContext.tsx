import { createContext, useState, useEffect } from "react";
import { IUserContact } from "../interfaces/Contact";
import { getContacts, patchContact } from "../fetchingApi/users";

interface IContactContext {
	contacts: IUserContact[];
	addContact: (contactId: string) => void;
}

export const ContactContext = createContext<IContactContext>({ contacts: [], addContact: () => {} });

export const ContactProvider = ({ children }: { children: React.ReactNode }) => {
	const [contacts, setContacts] = useState<IUserContact[]>([]);

	useEffect(() => {
		fetchContacts();
	}, []);

	async function fetchContacts() {
		try {
			const { responseData, status } = await getContacts();
			if (status === 200) setContacts(responseData);
		} catch (error) {
			console.error(error);
		}
	}

	async function addContact(contactId: string) {
		try {
			const { responseData, status } = await patchContact(contactId);
			// Refresh contacts after successfully adding a contact
			if (status === 200) fetchContacts();
		} catch (error) {
			console.error(error);
		}
	}

	const contextValue = { contacts, addContact };

	return <ContactContext.Provider value={contextValue}>{children}</ContactContext.Provider>;
};
