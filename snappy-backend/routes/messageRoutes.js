const router = require("express").Router();
const { verifyToken } = require("../middlewares/authToken");
const { getMessages, putSeenMessages } = require("../controllers/msgController");

router.get("/:contactId", verifyToken, getMessages);
router.put("/:contactId", verifyToken, putSeenMessages);

module.exports = router;
