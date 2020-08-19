const Datastore = require("nedb-promises");
const toDoCollection = new Datastore({
  filename: "./database/ToDo.db",
  autoload: true,
});

const insertToDo = async (title, done) => {
  const doc = await toDoCollection.insert({ title, done });

  return doc;
};

const findToDos = async () => {
  const doc = await toDoCollection.find({});

  return doc;
};

module.exports = { insertToDo, findToDos };
