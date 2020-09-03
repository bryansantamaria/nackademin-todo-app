const { userCollection } = require("../database/dataBase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (
  firstName,
  lastName,
  email,
  password,
  role = "user"
) => {
  const doc = await userCollection.findOne({ email: email });
  if (role === "admin") {
    if (!doc) {
      const hash = bcrypt.hashSync(password, 10);
      const doc = await userCollection.insert({
        firstName,
        lastName,
        password: hash,
        email,
        role: role,
      });
      return doc;
    }
    return console.log("EMAIL already registered!");
  }
};

const loginUser = async (email, password) => {
  const doc = await userCollection.findOne({ email: email });
  if (!doc) return json("Email not found");

  const success = await bcrypt.compareSync(password, doc.password);
  if (!success) return json("Wrong password");

  const token = await jwt.sign(
    { email: doc.email, userId: doc._id, role: doc.role, name: doc.firstName },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
  console.log(token);
  return token;
};

const verifyToken = async (token, secret) => {
  const validToken = await jwt.verify(token, secret);
  return validToken;
};

const clear = async () => {
  const doc = await userCollection.remove({}, { multi: true });
  return doc;
};

module.exports = { createUser, loginUser, verifyToken, clear };
