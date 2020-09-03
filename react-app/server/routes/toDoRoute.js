const { Router } = require("express");
const router = new Router();
const { create } = require("../controllers/toDoController");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate);
router.post("/create", authenticate, create);
router.delete("/delete/:id", authenticate);

module.exports = router;
