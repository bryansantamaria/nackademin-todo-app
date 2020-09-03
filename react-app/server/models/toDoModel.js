const { toDoCollection, userCollection } = require("../database/dataBase");

const insertToDo = async (title, userId) => {
  const doc = await toDoCollection.insert({
    title,
    userId,
  });
  return doc;
};

const getAllAdmin = async () => {
  const doc = await toDoCollection.find({}).limit(5).sort({ created: -1 });
  return doc;
};

const getAllUser = async (id) => {
  const doc = await toDoCollection
    .find({ userId: id })
    .limit(5)
    .sort({ created: -1 });
  return doc;
};

const clear = async () => {
  const doc = await toDoCollection.remove({}, { multi: true });
  return doc;
};

module.exports = {
  insertToDo,
  getAllAdmin,
  getAllUser,
  clear,
};
