const router = require("express").Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator();
const { login, register, resetPassword } = require("../controllers/authController");

const registerSchema = Joi.object({
	firstName: Joi.string().min(2).max(25).required(),
	lastName: Joi.string().min(2).max(25).required(),
	username: Joi.string().min(4).max(25).required(),
	email: Joi.string()
		.pattern(/^[a-zA-Z0-9._-]{3,25}@[a-zA-Z]{2,}\.com$/)
		.required(),
	password: Joi.string().min(6).max(25).required(),
});

router.post("/register", validator.body(registerSchema), register);
router.post("/login", login);
router.put("/reset-password", resetPassword);

module.exports = router;
