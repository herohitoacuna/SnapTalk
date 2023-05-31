import axios, { AxiosResponse } from "axios";
import { getItem } from "../utils/localStorageItems";

interface IUpdateProfile {
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
	avatar?: File | string;
}

const URL = import.meta.env.VITE_PORT;
const token = getItem("token");

export async function getProfile() {
	const response: AxiosResponse = await axios.get(`${URL}/api/users/user`, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}

export async function putUpdateProfile(data: IUpdateProfile) {
	const response: AxiosResponse = await axios(`${URL}/api/users/user`, {
		method: "PATCH",
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: "Bearer " + token,
		},
	});

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}

export async function queryUsers(searchInput: string) {
	const response: AxiosResponse = await axios.get(`${URL}/api/users/user/search?search=${searchInput}`);

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}

export async function getContacts() {
	const response: AxiosResponse = await axios.get(`${URL}/api/users/user/contacts`, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}

export async function getContactInfo(contactId: string) {
	const response: AxiosResponse = await axios.get(`${URL}/api/users/user/${contactId}`);

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}

export async function patchContact(contactId: string) {
	console.log(contactId);
	const response: AxiosResponse = await axios(`${URL}/api/users/user/contacts/${contactId}`, {
		method: "PATCH",
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}
