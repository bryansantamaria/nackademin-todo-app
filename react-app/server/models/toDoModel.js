const { toDoCollection, userCollection } = require("../database/dataBase");

const insertToDo = async (title, userId) => {
  const doc = await toDoCollection.insert({
    title,
    userId,
  });
  return doc;
};

module.exports = {
  insertToDo,
};
