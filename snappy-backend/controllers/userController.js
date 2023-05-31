const User = require("../models/User");
const { decodeToken } = require("../middlewares/authToken");
const { findById } = require("../models/Message");
const cloudinary = require("cloudinary").v2;

async function getUser(req, res) {
	try {
		const { id } = req.user; // middleware verifyToken
		const user = await User.findById(id, { createdAt: 0, __v: 0, password: 0, contacts: 0 });

		return res.status(200).json(user);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: `Server error. ${error.message}` });
	}
}

async function searchUser(req, res) {
	try {
		const { search } = req.query;
		const users = await User.find(
			{
				$or: [
					{ firstName: { $regex: search, $options: "i" } },
					{ lastName: { $regex: search, $options: "i" } },
					{ username: { $regex: search, $options: "i" } },
					{ email: { $regex: search, $options: "i" } },
				],
			},
			{ createdAt: 0, contacts: 0, password: 0, __v: 0 },
		);

		return res.status(200).json(users);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: `Server error ${error.message}` });
	}
}

async function patchUpdateProfile(req, res) {
	try {
		const { id } = req.user; // middleware verify token
		const reqBody = req.body;
		const avatar = req.file;
		const updateUser = {};

		// iterate all field in the req.body and we will only update that field not all the document
		for (const field in reqBody) {
			if (field) {
				updateUser[field] = reqBody[field];
			}
		}

		//if there is a file in request object, we will upload to cloudinary and push to our updateUser object and we will update our document avatar field
		if (avatar) {
			const { url } = await cloudinary.uploader.upload(avatar.path);
			updateUser.avatar = url;
		}

		const user = await User.findByIdAndUpdate(
			id,
			updateUser,
			{ select: "_id firstName lastName username email avatar" },
			{ new: true },
		);

		// console.log(user);

		return res.status(200).json({ user, result: "success" });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: `Server error. ${error.message}` });
	}
}

async function getContacts(req, res) {
	try {
		const { id: userId } = req.user; // middleware verifyToken
		const { contacts } = await User.findById(userId, { contacts: 1 }).populate({
			path: "contacts.user",
			sort: { firstName: 1 },
			select: "_id firstName lastName username email socketId avatar",
		});

		return res.status(200).json(contacts);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: `Server error. ${error.message}` });
	}
}

async function getContactInfo(req, res) {
	try {
		const { contactId } = req.params;
		const contact = await User.findById(contactId, { createdAt: 0, contacts: 0, password: 0, __v: 0 });
		if (!contact) return res.status(400).json({ error: "User is not found." });

		return res.status(200).json(contact);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: `Server error. ${error.message}` });
	}
}

async function patchAddToContacts(req, res) {
	try {
		const { contactId } = req.params;
		const { id: userId } = req.user; //middleware verifyToken

		const user = await User.findOneAndUpdate(
			{ _id: userId, "contacts.user": { $nin: [contactId] } },
			{ $push: { contacts: { user: contactId } } },
			{ new: true },
		).populate({
			path: "contacts.user",
			sort: { firstName: 1 },
			select: "_id firstName lastName username email socketId avatar",
		});

		if (!user) {
			return res.status(404).json({ error: "User is already added." });
		}

		return res.status(200).json({ contacts: user.contacts, message: "Successfully added." });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: `Server error. ${error.message}` });
	}
}

module.exports = {
	getUser,
	searchUser,
	patchUpdateProfile,
	getContacts,
	getContactInfo,
	patchAddToContacts,
};
