const chai = require("chai");
chai.should();

const Users = require("../../models/userModel");
const ToDos = require("../../models/toDoModel");

describe("toDoModel", () => {
  beforeEach(async function () {
    await Users.clear();
    const user = await Users.createUser(
      "Bryan",
      "Santamaria",
      "bryan@gmail.com",
      "lol",
      "admin"
    );
    this.currentTest.userId = user._id;
    this.currentTest.password = user.password;
    this.currentTest.user = user;
  });

  it("Should insert a toDo-list with a userId (owner)", async function () {
    const todo = await ToDos.insertToDo("First Todo Title", this.test.userId);

    todo.should.deep.equal({
      title: "First Todo Title",
      userId: this.test.userId,
      _id: todo._id,
    });
    todo.should.be.an("object");
    ToDos.clear();
  });

  it("Should get all toDo-lists for an admin", async function () {
    await ToDos.insertToDo("First Todo Title", this.test.userId);
    const getToDo = await ToDos.getAllAdmin();
    console.log(getToDo);
  });

  it("Should get all toDo-lists for a specific user (not Admin)", async function () {
    const todo = await ToDos.insertToDo("First Todo Title", this.test.userId);
    await ToDos.insertToDo("Second Todo Title", this.test.userId);
    const getToDo = await ToDos.getAllUser(todo.userId);

    console.log(getToDo);
    ToDos.clear();
  });
});
