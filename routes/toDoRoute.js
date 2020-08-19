const { Router } = require("express");
const { addToDo } = require("../controllers/toDoController");

const router = new Router();

router.post("/create", addToDo);

module.exports = router;
