const Datastore = require("nedb-promises");
const toDoCollection = new Datastore({
  filename: "./database/ToDo.db",
  autoload: true,
});

const createToDo = async (title, done) => {
  const doc = await toDoCollection.insert({ title, done });

  return doc;
};

const getToDos = async () => {
  const doc = await toDoCollection.find({});

  return doc;
};

module.exports = { createToDo, getToDos };
