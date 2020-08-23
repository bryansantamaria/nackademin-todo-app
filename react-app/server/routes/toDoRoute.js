const { Router } = require("express");
const {
  createToDo,
  getToDos,
  updToDo,
  delToDo,
  sortCreate,
  sortUpdated,
  paginate,
} = require("../controllers/toDoController");

const router = new Router();

router.get("/", getToDos);
router.post("/create", createToDo);
router.put("/update/:id", updToDo);
router.delete("/delete/:id", delToDo);
router.get("/sort/created:order", sortCreate);
router.get("/sort/lastUpdated:order", sortUpdated);
router.get("/limit/:skip", paginate);

module.exports = router;
