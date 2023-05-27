import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getItem } from "../utils/localStorageItems";
import { IUserContact } from "../interfaces/Contact";
import { useAxios } from "../hooks/useAxios";

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
			const { resData } = await useAxios({
				method: "GET",
				endpoint: "/api/users/user/contacts",
				authToken: getItem("token"),
			});
			setContacts(resData);
		} catch (error) {
			console.error(error);
		}
	}

	async function addContact(contactId: string) {
		try {
			await useAxios({
				method: "PATCH",
				endpoint: `/api/users/user/contacts/${contactId}`,
				authToken: getItem("token"),
			});
			// Refresh contacts after successfully adding a contact
			fetchContacts();
		} catch (error) {
			console.error(error);
		}
	}

	const contextValue = { contacts, addContact };

	return <ContactContext.Provider value={contextValue}>{children}</ContactContext.Provider>;
};
