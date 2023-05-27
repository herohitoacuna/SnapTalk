import { FieldValues, Resolver } from "react-hook-form";

type FormValues = {
	email: string;
	newPassword: string;
};

type ValidationErrors = {
	[key: string]: { type: string; message: string };
};

const resetPassResolver: Resolver<FormValues> = (values) => {
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

	if (!values.newPassword) {
		errors["newPassword"] = {
			type: "required",
			message: "Password is required",
		};
	} else if (values.newPassword.length > 26) {
		errors["newPassword"] = {
			type: "maxLength",
			message: "Must be less than 25 letters",
		};
	} else if (values.newPassword.length < 6) {
		errors["newPassword"] = {
			type: "minLength",
			message: "Must be greater than 5 characters",
		};
	}

	return {
		values,
		errors,
	};
};

export default resetPassResolver;
