const express = require("express");
const router = express.Router();
const { create, login, getUser } = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");

router.post("/create", authenticate, create);
router.post("/auth", login);
router.get("/users", authenticate, getUser);
module.exports = router;
