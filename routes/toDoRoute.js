const { Router } = require("express");
const { createToDo, getToDos } = require("../controllers/toDoController");

const router = new Router();

router.post("/create", createToDo);
router.get("/", getToDos);

module.exports = router;
