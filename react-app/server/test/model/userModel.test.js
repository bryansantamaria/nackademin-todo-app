const chai = require("chai");
chai.should();

const {
  insertToDo,
  findToDosAdmin,
  ownerOfPost2,
} = require("../models/toDoModel");

describe("toDoModel", () => {
  //Insert item
  it("Should insert title, done and userId in testToDo.db", async () => {
    const result = await insertToDo(123, false, 1348543);

    result.should.deep.equal({
      title: 123,
      done: false,
      userId: 1348543,
      created: result.created,
      _id: result._id,
    });

    result.should.be.an("object");
  });

  //Get items
  it("Should find all to do items (5 items).", async () => {
    const result = await findToDosAdmin();
    result.should.have.lengthOf(5);

    result.should.be.an("array");
  });

  //Owner of post
  it("Should check if user is owner of todo item", async () => {
    const result = await ownerOfPost2("aMZlRdwyU4LyRhAU");
    result.should.be.equal(true);
  });

  //Admin
});
