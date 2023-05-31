const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "Firstname is required."],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, "Lastname is required."],
		trim: true,
	},
	avatar: { type: String, default: "" },
	username: {
		type: String,
		required: [true, "Username is required."],
	},
	email: {
		type: String,
		required: [true, "Email is required."],
		unique: [true, "Email is already in use."],
		lowercase: true,
		trim: true,
		validate: {
			validator: (value) => {
				return /^[a-zA-Z0-9._-]{3,25}@[a-zA-Z]{2,}\.com$/.test(value);
			},
			message: "Invalid email address",
		},
	},
	password: {
		type: String,
		required: [true, "Password is required."],
	},
	contacts: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		},
	],
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

userSchema.index(
	{
		firstName: "text",
		lastName: "text",
		username: "text",
		email: "text",
	},
	{ default_language: "none", language_override: "dummy", textIndexVersion: 3, minStringLength: 2 },
);

module.exports = model("User", userSchema);
