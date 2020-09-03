const { toDoCollection, userCollection } = require("../database/dataBase");

const insertItem = async (title, done, userId) => {
  const doc = await toDoCollection.insert({
    title,
    done,
    userId,
    created: new Date().toLocaleString(),
  });
  return doc;
};

const findAsAdmin = async () => {
  const doc = await toDoCollection.find({}).limit(5).sort({ created: -1 });
  return doc;
};

const findAsUser = async (id) => {
  const doc = await toDoCollection
    .find({ userId: id })
    .limit(5)
    .sort({ created: -1 });
  return doc;
};

const updateAsAdmin = async (postId, title, done) => {
  const item = await toDoCollection.findOne({ _id: postId });
  const doc = await toDoCollection.update(
    { _id: postId },
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

const updateAsUser = async (postId, title, done, userId) => {
  const item = await toDoCollection.findOne({ _id: postId });
  const isOwner = await ownerOfPost(item, userId);
  if (isOwner) {
    const doc = await toDoCollection.update(
      { _id: postId },
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
  }
};

const deleteAsAdmin = async (postId) => {
  const doc = await toDoCollection.remove({ _id: postId });
  return doc;
};

const deleteAsUser = async (postId, userId) => {
  const item = await toDoCollection.findOne({ _id: postId });
  const isOwner = await ownerOfPost(item, userId);

  if (isOwner) {
    const doc = await toDoCollection.remove({ _id: postId });
    return doc;
  }
};

const sortByCreatedAdmin = async (order) => {
  const doc = await toDoCollection
    .find({})
    .sort({ created: order })
    .limit(5)
    .exec();
  return doc;
};

const sortByCreatedUser = async (order, userId) => {
  const doc = await toDoCollection
    .find({ userId: userId })
    .sort({ created: order })
    .limit(5)
    .exec();
  return doc;
};

const sortByUpdatedAdmin = async (order) => {
  const doc = await toDoCollection
    .find({})
    .sort({ lastUpdated: order })
    .limit(5)
    .exec();
  return doc;
};

const sortByUpdatedUser = async (order, userId) => {
  const doc = await toDoCollection
    .find({ userId: userId })
    .sort({ lastUpdated: order })
    .limit(5)
    .exec();
  return doc;
};

const limitPaginateAdmin = async (perPage, skip) => {
  const doc = await toDoCollection
    .find({})
    .sort({ created: -1 })
    .skip(perPage * skip)
    .limit(perPage)
    .exec();
  return doc;
};

const limitPaginateUser = async (perPage, skip, userId) => {
  const doc = await toDoCollection
    .find({ userId: userId })
    .sort({ created: -1 })
    .skip(perPage * skip)
    .limit(perPage)
    .exec();
  return doc;
};

const ownerOfPost = async (item, userId) => {
  console.log("Owner of post: ");
  console.log(item.userId === userId);
  return item.userId === userId;
};

const ownerOfPost2 = async (postId, userId) => {
  const item = await toDoCollection.findOne({ _id: postId });
  item ? true : false;
  console.log("Owner of post: ");
  console.log(item.userId === userId);
  return item.userId === userId;
};

const clearItems = async () => {
  const doc = await toDoCollection.remove({}, { multi: true });
  return doc;
};

const isOwner = async (postId, userId) => {
  const todoItem = await toDoCollection.findOne({ _id: postId });

  return todoItem.userId === userId;
};

const getOwner = async (postId) => {
  const doc = await toDoCollection.findOne({ _id: postId });
  const user = await userCollection.findOne({ _id: doc.userId });
  return user;
};

module.exports = {
  insertItem,
  findAsAdmin,
  findAsUser,
  updateAsAdmin,
  updateAsUser,
  deleteAsAdmin,
  deleteAsUser,
  sortByCreatedAdmin,
  sortByCreatedUser,
  sortByUpdatedAdmin,
  sortByUpdatedUser,
  limitPaginateAdmin,
  limitPaginateUser,
  ownerOfPost2,
  clearItems,
  isOwner,
  getOwner,
};
