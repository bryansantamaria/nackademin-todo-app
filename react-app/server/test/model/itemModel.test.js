const chai = require("chai");
chai.should();

const Users = require("../../models/userModel");
const ToDos = require("../../models/toDoModel");
const item = require("../../models/itemModel");

describe("userModel", () => {
  beforeEach(async function () {
    await Users.clear();
    await ToDos.clear();
    const user = await Users.createUser(
      "Bryan",
      "Santamaria",
      "bryan@gmail.com",
      "lol",
      "admin"
    );
    const todo = await ToDos.insertToDo("Todo title for Item", user._id);

    this.currentTest.toDoUserId = todo.userId;
    this.currentTest.toDoId = todo._id;
    this.currentTest.todo = todo;

    this.currentTest.userId = user._id;
    this.currentTest.password = user.password;
    this.currentTest.user = user;
  });
  // Insert user,
  it("Should create an Todo-item with a toDoId", async function () {});
});
