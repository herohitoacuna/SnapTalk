const jwt = require("jsonwebtoken");

function createToken({ id, email }) {
	const payload = {
		id: id,
		email: email,
	};
	const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: "48h" });
	return token;
}

function verifyToken(req, res, next) {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "Authentication failed." });
	}
	const token = authorization.replaceAll("Bearer ", "");
	try {
		const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Authentication failed." });
	}
}

function decodeToken(token) {
	try {
		if (!token) return { errro: "Authentication Failed." };
		return jwt.verify(token, process.env.PRIVATE_KEY);
	} catch (error) {
		console.log(error);
	}
}

module.exports = { createToken, verifyToken, decodeToken };
