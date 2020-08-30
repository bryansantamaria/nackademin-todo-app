const { toDoCollection } = require("../database/dataBase");

const insertToDo = async (title, done, userId) => {
  const doc = await toDoCollection.insert({
    title,
    done,
    userId,
    created: new Date().toLocaleString(),
  });

  return doc;
};

const findToDos = async (id, role) => {
  const isAdmin = await checkAuthorization(role);
  if (isAdmin) {
    const doc = await toDoCollection.find({}).limit(5).sort({ created: -1 });
    return doc;
  } else {
    const doc = await toDoCollection
      .find({ userId: id })
      .limit(5)
      .sort({ created: -1 });
    return doc;
  }
};

const updateToDo = async (postId, title, done, userId, role) => {
  const item = await toDoCollection.findOne({ _id: postId });
  const isOwner = await ownerOfPost(item, userId);
  const isAdmin = await checkAuthorization(role);
  if (isOwner || isAdmin) {
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

const deleteToDo = async (postId, userId, role) => {
  const item = await toDoCollection.findOne({ _id: postId });
  const isOwner = await ownerOfPost(item, userId);
  const isAdmin = await checkAuthorization(role);

  if (isOwner || isAdmin) {
    const doc = await toDoCollection.remove({ _id: postId });
    return doc;
  }
};

const sortByCreated = async (order, userId, role) => {
  const isAdmin = await checkAuthorization(role);
  if (isAdmin) {
    const doc = await toDoCollection
      .find({})
      .sort({ created: order })
      .limit(5)
      .exec();
    return doc;
  } else {
    const doc = await toDoCollection
      .find({ userId: userId })
      .sort({ created: order })
      .limit(5)
      .exec();
    return doc;
  }
};

const sortByUpdated = async (order, userId, role) => {
  const isAdmin = await checkAuthorization(role);

  if (isAdmin) {
    const doc = await toDoCollection
      .find({})
      .sort({ lastUpdated: order })
      .limit(5)
      .exec();
    return doc;
  } else {
    const doc = await toDoCollection
      .find({ userId: userId })
      .sort({ lastUpdated: order })
      .limit(5)
      .exec();
    return doc;
  }
};

const limitPaginate = async (perPage, skip, userId, role) => {
  const isAdmin = await checkAuthorization(role);
  if (isAdmin) {
    const doc = await toDoCollection
      .find({})
      .sort({ created: -1 })
      .skip(perPage * skip)
      .limit(perPage)
      .exec();
    return doc;
  } else {
    const doc = await toDoCollection
      .find({ userId: userId })
      .sort({ created: -1 })
      .skip(perPage * skip)
      .limit(perPage)
      .exec();
    return doc;
  }
};

const ownerOfPost = async (item, userId) => {
  console.log("Owner of post: ");
  console.log(item.userId === userId);
  return item.userId === userId;
};

const checkAuthorization = async (role) => {
  console.log("role: " + role);
  if (role === "admin") {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  insertToDo,
  findToDos,
  updateToDo,
  deleteToDo,
  sortByCreated,
  sortByUpdated,
  limitPaginate,
};
