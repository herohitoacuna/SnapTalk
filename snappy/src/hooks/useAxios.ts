import axios, { AxiosResponse } from "axios";

type TConfiguration = {
	method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
	endpoint: string;
	params?: string;
	authToken?: string;
};

export const useAxios = async (config: TConfiguration, data?: Record<string, any>) => {
	try {
		const baseURL: string = import.meta.env.VITE_PORT;
		const URL = `${baseURL}${config.endpoint}/${config.params || ""}`;
		const headers: { [key: string]: string } = {};
		if (config.authToken) {
			headers.Authorization = `Bearer ${config.authToken}`;
		}

		const response: AxiosResponse = await axios({
			method: config.method,
			url: URL,
			data: data ? { ...data } : undefined,
			headers: headers,
		});

		const resData = await response.data;

		return { resData };
	} catch (error: any) {
		console.error(error?.response?.data);
		throw new Error("An error occurred during the request.");
	}
};
