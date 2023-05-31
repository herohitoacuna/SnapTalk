const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "snapTalk_avatar",
		allowed_formats: ["jpg", "jpeg", "png"],
	},
});
const upload = multer({ storage: storage });

const {
	getUser,
	searchUser,
	patchUpdateProfile,
	getContacts,
	getContactInfo,
	patchAddToContacts,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authToken");

router.get("/user", verifyToken, getUser);
router.patch("/user", verifyToken, upload.single("avatar"), patchUpdateProfile);
router.get("/user/search", searchUser);
router.get("/user/contacts", verifyToken, getContacts);
router.patch("/user/contacts/:contactId", verifyToken, patchAddToContacts);
router.get("/user/:contactId", getContactInfo);

module.exports = router;
