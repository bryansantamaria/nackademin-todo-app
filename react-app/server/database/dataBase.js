const Datastore = require("nedb-promises");
require("dotenv").config();

let toDoCollection, toDoItemCollection, userCollection;
switch (process.env.ENVIRONMENT) {
  case "development":
    toDoCollection = new Datastore({
      filename: "./database/ToDos.db",
      autoload: true,
    });

    userCollection = new Datastore({
      filename: "./database/Users.db",
      autoload: true,
    });

    toDoItemCollection = new Datastore({
      filename: "./database/toDoItem.db",
      autoload: true,
    });
    break;

  case "test":
    toDoCollection = new Datastore({
      filename: "./database/test_toDos.db",
      autoload: true,
    });

    userCollection = new Datastore({
      filename: "./database/test_Users.db",
      autoload: true,
    });

    toDoItemCollection = new Datastore({
      filename: "./database/testToDos.db",
      autoload: true,
    });

    toDoCollection.remove({});
    toDoItemCollection.remove({});
    userCollection.remove({});
}

module.exports = { toDoCollection, toDoItemCollection, userCollection };
