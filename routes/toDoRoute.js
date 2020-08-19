const { Router } = require("express");
const {
  createToDo,
  getToDos,
  updToDo,
} = require("../controllers/toDoController");

const router = new Router();

router.post("/create", createToDo);
router.get("/", getToDos);
router.put("/update", updToDo);

module.exports = router;
