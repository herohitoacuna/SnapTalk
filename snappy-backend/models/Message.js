const { Schema } = require("mongoose");

const messageSchema = new Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	recipient: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: new Date(),
	},
	seen: {
		type: Boolean,
		default: false,
	},
});

messageSchema.index({ sender: 1, receiver: 1 });

module.exports = mongoose.model("Message", messageSchema);
