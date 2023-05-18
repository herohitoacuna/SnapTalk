const bcrypt = require("bcrypt");
const authToken = require("../middlewares/authToken");
const User = require("../models/User");

async function register(req, res) {
	try {
		const { password, ...userData } = req.body;

		const encryptedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ ...userData, password: encryptedPassword });
		const createdUser = await newUser.save();

		return res.status(200).json({ user: createdUser.toObject() });
	} catch (error) {
		console.log(error.message);
		if (error.code === 11000) return res.status(400).send({ error: "Email is already exist" });
		return res.status(500).json({ error: `Server error ${error.message}` });
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body;

		const userResult = await User.findOne(
			{ email },
			{ firstName: 1, lastName: 1, email: 1, userName: 1, password: 1 },
		);

		if (!userResult) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		const isPasswordMatch = await bcrypt.compare(password, userResult.password);
		if (!isPasswordMatch) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		const token = authToken.createToken({
			id: userResult._id,
			email: userResult.email,
			username: userResult.username,
		});

		return res.status(200).json({ _id: userResult._id, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: `Server error ${error.message}` });
	}
}

async function resetPassword(req, res) {
	try {
		const { email, newPassword } = req.body;

		const encryptedPassword = await bcrypt.hash(newPassword, 10);

		const user = await User.findOneAndUpdate(
			{ email },
			{ $set: { password: encryptedPassword } },
			{ projection: { firstName: 1, lastName: 1, password: 1, username: 1, email: 1 } },
		);

		if (user) return res.status(200).json({ message: "Successfully reset the password." });

		return res.status(401).json({ error: "Email doesn't exist." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: `Server error ${error.message}` });
	}
}

module.exports = { register, login, resetPassword };
