const app = require("../.././index");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const { expect, request } = chai;

chai.should();

const UserModel = require("../.././models/userModel");
const ToDos = require("../.././controllers/toDoController");

describe("RESTful resource To do", () => {
  beforeEach(async function () {
    await UserModel.clear();

    const user = await UserModel.createUser(
      "Bryan",
      "Santamaria",
      "bryan@gmail.com",
      "lol",
      "admin"
    );
    this.currentTest.userId = user._id;

    this.currentTest.token = await UserModel.loginUser(
      "bryan@gmail.com",
      "lol"
    );
    this.currentTest.payload = await UserModel.verifyToken(
      this.currentTest.token,
      process.env.SECRET
    );
  });

  it("Should create a post with a HTTP request", async function () {
    const fields = {
      title: "Test toDo from HTTP",
    };
    request(app)
      .post("/todos/create")
      .set("Authorization", `Bearer ${this.test.token}`)
      .send(fields)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.keys(["_id", "title", "userId"]);
      });
  });
});
