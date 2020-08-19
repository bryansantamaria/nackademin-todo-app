const { Router } = require("express");
const { createToDo } = require("../controllers/toDoController");

const router = new Router();

router.post("/create", createToDo);

module.exports = router;
