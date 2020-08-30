const Datastore = require("nedb-promises");
const toDoCollection = new Datastore({
  filename: "./database/ToDos.db",
  autoload: true,
});

const userCollection = new Datastore({
  filename: "./database/Users.db",
  autoload: true,
});

module.exports = { toDoCollection, userCollection };
