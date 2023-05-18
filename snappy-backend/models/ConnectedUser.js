const { Schema } = require("mongoose");

const connectedUserSchema = new Schema({
	userId: { type: String, required: true },
	socketId: { type: String, required: true },
	timestamp: { type: Date, default: new Date() },
});

module.exports = mongoose.model("ConnectedUser", connectedUserSchema);
