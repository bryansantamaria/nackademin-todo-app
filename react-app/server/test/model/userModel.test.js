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
  // Insert user,
  it("Should insert a toDo-list with a userId (owner)", async function () {
    await this.test.user.should.deep.equal({
      firstName: "Bryan",
      lastName: "Santamaria",
      email: "bryan@gmail.com",
      password: this.test.password,
      role: "admin",
      _id: this.test.userId,
    });
    this.test.user.should.be.an("object");

    const todo = await ToDos.insertToDo("First Todo Title", this.test.userId);

    todo.should.deep.equal({
      title: "First Todo Title",
      userId: this.test.userId,
      _id: todo._id,
    });
    todo.should.be.an("object");
  });
});
