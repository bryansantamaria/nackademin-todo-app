const chai = require("chai");
chai.should();

const Users = require("../../models/userModel");
const ToDos = require("../../models/toDoModel");
const Item = require("../../models/itemModel");

describe("userModel", () => {
  beforeEach(async function () {
    await Users.clear();
    await ToDos.clear();
    await Item.clear();
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
  it("Should create an Todo-item with a userId and toDoId", async function () {
    const item = await Item.insertItem(
      "Item Nr1",
      false,
      this.test.userId,
      this.test.toDoId
    );

    item.should.deep.equal({
      title: "Item Nr1",
      done: false,
      userId: this.test.userId,
      toDoId: this.test.toDoId,
      created: item.created,
      _id: item._id,
    });
    item.should.be.an("object");
  });
});
