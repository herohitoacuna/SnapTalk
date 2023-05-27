import { FieldValues, Resolver } from "react-hook-form";

type FormValues = {
	email: string;
	password: string;
};

type ValidationErrors = {
	[key: string]: { type: string; message: string };
};

const loginResolver: Resolver<FormValues> = (values) => {
	const errors: ValidationErrors = {};

	if (!values.email) {
		errors["email"] = {
			type: "required",
			message: "Email is required",
		};
	} else if (!/^[a-zA-Z0-9._-]{3,25}@[a-zA-Z]{2,}\.com$/.test(values.email)) {
		errors["email"] = {
			type: "pattern",
			message: "Invalid email format",
		};
	}

	if (!values.password) {
		errors["password"] = {
			type: "required",
			message: "Password is required",
		};
	}

	return {
		values,
		errors,
	};
};

export default loginResolver;
