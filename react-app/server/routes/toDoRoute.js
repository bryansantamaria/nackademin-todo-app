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
const { authenticate } = require("../middlewares/auth");

const router = new Router();

router.get("/", authenticate, getToDos);
router.post("/create", authenticate, createToDo);
router.patch("/update/:id", authenticate, updToDo);
router.delete("/delete/:id", authenticate, delToDo);
router.get("/sort/created:order", authenticate, sortCreate);
router.get("/sort/lastUpdated:order", authenticate, sortUpdated);
router.get("/limit/:skip", authenticate, paginate);

module.exports = router;
