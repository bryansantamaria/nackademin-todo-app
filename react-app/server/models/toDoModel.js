const { toDoCollection, userCollection } = require("../database/dataBase");

const insertToDo = async (title, userId) => {
  const doc = await toDoCollection.insert({
    title,
    userId,
  });
  return doc;
};

const getAsAdmin = async () => {
  const doc = await toDoCollection.find({}).limit(5).sort({ created: -1 });
  return doc;
};

const getAsUser = async (id) => {
  const doc = await toDoCollection
    .find({ userId: id })
    .limit(5)
    .sort({ created: -1 });
  return doc;
};

const deleteAsAdmin = async (postId) => {
  const doc = await toDoCollection.remove({ _id: postId });
  return doc ? true : false;
};

const deleteAsUser = async (postId) => {
  const doc = await toDoCollection.findOne({ _id: postId });
  return doc ? true : false;
};

const clear = async () => {
  const doc = await toDoCollection.remove({}, { multi: true });
  return doc;
};

module.exports = {
  insertToDo,
  getAsAdmin,
  getAsUser,
  deleteAsAdmin,
  deleteAsUser,
  clear,
};
