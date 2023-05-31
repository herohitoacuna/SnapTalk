import axios from "axios";
import { getItem } from "../utils/localStorageItems";

const URL = import.meta.env.VITE_PORT;
const token = getItem("token");

export async function getMessages(contactId: string) {
	const response = await axios.get(`${URL}/api/messages/${contactId}`, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}

export async function updateMessagesStatus(contactId: string) {
	const response = await axios(`${URL}/api/messages/${contactId}`, {
		method: "PUT",
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}
