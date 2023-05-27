const Message = require("../models/Message");

async function getMessages(req, res) {
	const { id: senderId } = req.user;
	const { contactId: recipientId } = req.params;

	if (!senderId || !recipientId) {
		return res.status(400).json({ error: "Sender ID and receiver ID are required." });
	}

	try {
		const messages = await Message.find({
			$or: [
				{ sender: senderId, recipient: recipientId },
				{ sender: recipientId, recipient: senderId },
			],
		}).sort({ timestamp: 1 });

		return res.status(200).json(messages);
	} catch (error) {
		return res.status(500).json({ error: `Server error ${error.message}` });
	}
}

async function putSeenMessages(req, res) {
	try {
		const { id: senderId } = req.user;
		const { contactId: recipientId } = req.params;

		if (!senderId || !recipientId) {
			return res.status(400).json({ error: "Sender ID and receiver ID are required." });
		}

		const messages = await Message.updateMany(
			{
				$or: [
					{ sender: senderId, recipient: recipientId },
					{ sender: recipientId, recipient: senderId },
				],
				seen: false,
			},
			{ seen: true },
		);

		return res.status(200).json({ result: "success" });
	} catch (error) {
		return res.status(500).json({ error: `Server error ${error.message}` });
	}
}

module.exports = { getMessages, putSeenMessages };
