import axios, { AxiosResponse } from "axios";

interface ILoginData {
	email: string;
	password: string;
}

interface IRegisterData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

interface IForgotPassData {
	email: string;
	newPassword: string;
}

const port = import.meta.env.VITE_PORT;

export async function postLogin(data: ILoginData) {
	const response: AxiosResponse = await axios.post(`${port}/api/auth/login`, data);

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}

export async function postRegister(data: IRegisterData) {
	const response: AxiosResponse = await axios.post(`${port}/api/auth/register`, data);

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}

export async function postResetPass(data: IForgotPassData) {
	const response: AxiosResponse = await axios.post(`${port}/api/auth/reset-password`, data);

	const responseData = response.data;
	const status = response.status;
	const statusText = response.statusText;

	return { responseData, status, statusText };
}
