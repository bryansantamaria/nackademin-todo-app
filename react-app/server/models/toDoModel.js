const Datastore = require("nedb-promises");
const toDoCollection = new Datastore({
  filename: "./database/ToDo.db",
  autoload: true,
});

const insertToDo = async (title, done) => {
  const doc = await toDoCollection.insert({
    title,
    done,
    created: new Date().toLocaleString(),
  });

  return doc;
};

const findToDos = async () => {
  const doc = await toDoCollection.find({});

  return doc;
};

const updateToDo = async (id, title, done) => {
  const item = await toDoCollection.findOne({ _id: id });
  console.log(item);
  const doc = await toDoCollection.update(
    { _id: id },
    {
      $set: {
        title,
        done,
        created: item.created,
        lastUpdated: new Date().toLocaleString(),
      },
    },
    {}
  );
  return doc;
};

const deleteToDo = async (id) => {
  const doc = await toDoCollection.remove({ _id: id });
  return doc;
};

const sortByCreated = async (order) => {
  const doc = await toDoCollection.find({}).sort({ created: order }).exec();
  console.log(doc);
  return doc;
};

const sortByUpdated = async (order) => {
  const doc = await toDoCollection.find({}).sort({ lastUpdated: order }).exec();
  console.log(doc);
  return doc;
};
module.exports = {
  insertToDo,
  findToDos,
  updateToDo,
  deleteToDo,
  sortByCreated,
  sortByUpdated,
};
