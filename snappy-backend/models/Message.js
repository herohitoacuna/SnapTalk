const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const User = require("./User");

const messageSchema = new Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
		required: true,
	},
	recipient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	seen: {
		type: Boolean,
		default: false,
	},
});

messageSchema.index({ sender: 1, receiver: 1 });

module.exports = mongoose.model("Message", messageSchema);
