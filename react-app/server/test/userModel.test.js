const chai = require("chai");
chai.should();

const { insertToDo, findToDosAdmin } = require("../models/toDoModel");

describe("toDoModel", () => {
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

  it("Should find all to do items (5 items).", async () => {
    const result1 = await findToDosAdmin();
    result1.should.have.lengthOf(5);

    result1.should.be.an("array");
  });
});
