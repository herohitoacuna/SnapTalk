const Message = require("../models/Message");

async function getMessages(req, res) {
	const { senderId, receiverId } = req.body;

	if (!senderId || !receiverId) {
		return res.status(400).json({ error: "Sender ID and receiver ID are required." });
	}

	try {
		const messages = await Message.find({
			$or: [
				{ sender: senderId, receiver: receiverId },
				{ sender: receiverId, receiver: senderId },
			],
		})
			.sort({ createdAt: -1 })
			.limit(20);

		return res.status(200).json({ result: messages });
	} catch (error) {
		return res.status(500).json({ error: `Server error ${error.message}` });
	}
}

async function putSeenMessages(req, res) {}

module.exports = { getMessages, putSeenMessages };
