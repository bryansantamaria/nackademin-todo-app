const chai = require("chai");
chai.should();

const Users = require("../../models/userModel");

describe("userModel", () => {
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
  it("Should create a user and check if user has exact keys and values", async function () {
    await this.test.user.should.deep.equal({
      firstName: "Bryan",
      lastName: "Santamaria",
      email: "bryan@gmail.com",
      password: this.test.password,
      role: "admin",
      _id: this.test.userId,
    });
    this.test.user.should.be.an("object");
  });
});
