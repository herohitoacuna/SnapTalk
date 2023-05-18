import { Resolver } from "react-hook-form";

type FormValues = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	verifyPassword: string;
};

type ValidationErrors = {
	[key: string]: { type: string; message: string };
};

const registerResolver: Resolver<FormValues> = (values) => {
	const errors: ValidationErrors = {};

	// firstname required, max 25 char
	if (!values.firstName) {
		errors["firstName"] = {
			type: "required",
			message: "Firstname is required",
		};
	} else if (values.firstName.length > 26) {
		errors["firstName"] = {
			type: "maxLength",
			message: "Must be less than 25 letters",
		};
	}

	// lastname required, max 25 char
	if (!values.lastName) {
		errors["lastName"] = {
			type: "required",
			message: "Lastname is required",
		};
	} else if (values.lastName.length > 26) {
		errors["lastName"] = {
			type: "maxLength",
			message: "Must be less than 25 letters",
		};
	}

	// username required, min 4 char, max 25 char
	if (!values.username) {
		errors["username"] = {
			type: "required",
			message: "Username is required",
		};
	} else if (values.username.length > 26) {
		errors["username"] = {
			type: "maxLength",
			message: "Must be less than 25 letters",
		};
	} else if (values.username.length < 4) {
		errors["username"] = {
			type: "minLength",
			message: "Must be greater than 3 characters",
		};
	}

	// email required, satisfy this patter "/^[a-zA-Z0-9._-]{3,25}@[a-zA-Z]{2,}\.com$/"
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

	// password required, min 6, max 25,
	if (!values.password) {
		errors["password"] = {
			type: "required",
			message: "Password is required",
		};
	} else if (values.password.length > 26) {
		errors["password"] = {
			type: "maxLength",
			message: "Must be less than 25 letters",
		};
	} else if (values.password.length < 6) {
		errors["password"] = {
			type: "minLength",
			message: "Must be greater than 5 characters",
		};
	}

	// verifyPassword must be equal to password
	if (!values.verifyPassword) {
		errors["verifyPassword"] = {
			type: "required",
			message: "Verify your password",
		};
	} else if (values.password !== values.verifyPassword) {
		errors["verifyPassword"] = {
			type: "validate",
			message: "Must be the same as password",
		};
	}

	return {
		values,
		errors,
	};
};

export default registerResolver;
