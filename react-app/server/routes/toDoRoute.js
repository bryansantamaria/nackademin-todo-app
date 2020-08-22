const { Router } = require("express");
const {
  createToDo,
  getToDos,
  updToDo,
  delToDo,
  sortDate,
} = require("../controllers/toDoController");

const router = new Router();

router.get("/", getToDos);
router.post("/create", createToDo);
router.put("/update/:id", updToDo);
router.delete("/delete/:id", delToDo);
router.get("/sort/:order", sortDate);

module.exports = router;
