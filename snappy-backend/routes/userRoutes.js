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
	// patchUpdateAvatar,
	getContactInfo,
	patchAddToContacts,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authToken");

router.get("/user", getUser);
router.get("/user/search", searchUser);

router.patch("/user", verifyToken, upload.single("avatar"), patchUpdateProfile);
// router.patch("/user/upload-avatar", verifyToken, upload.single("avatar"), patchUpdateAvatar);

router.get("/user/:contactId", getContactInfo);
router.patch("/user/:userId/contacts/:contactId", patchAddToContacts);

module.exports = router;
