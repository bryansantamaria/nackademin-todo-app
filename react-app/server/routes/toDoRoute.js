const { Router } = require("express");
const { create } = require("../controllers/toDoController");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate);
router.post("/create", authenticate, create);
router.delete("/delete/:id", authenticate);

const router = new Router();
module.exports = router;
