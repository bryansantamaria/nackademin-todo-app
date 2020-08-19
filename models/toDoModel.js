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

const updateToDo = async (id, title, done) => {
  const doc = await toDoCollection.update(
    { _id: id },
    { $set: { title, done } },
    {}
  );
  return doc;
};

module.exports = { insertToDo, findToDos, updateToDo };
