const { toDoCollection } = require("../database/dataBase");

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

const isOwner = async (postId, userId) => {
  const todoItem = await itemCollection.findOne({ _id: postId });

  return todoItem.userId === userId;
};

const getOwner = async (postId) => {
  const doc = await itemCollection.findOne({ _id: postId });
  const user = await userCollection.findOne({ _id: doc.userId });
  return user;
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
  isOwner,
  getOwner,
  clear,
};
