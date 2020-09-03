const {
  insertToDo,
  getAsAdmin,
  getAsUser,
  deleteAsAdmin,
  deleteAsUser,
  isOwner,
  getOwner,
  clear,
} = require("../models/toDoModel");

const create = async (req, res) => {
  try {
    const { title } = req.body;
    const doc = await insertToDo(title, req.user.userId);

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(403).json(error);
  }
};

const get = async (req, res) => {
  try {
    const { userId, role } = req.user;

    if (await checkAuthorization(role)) {
      const doc = await getAsAdmin();
      return res.status(200).json(doc);
    } else {
      const doc = await getAsUser(userId);
      return res.status(200).json(doc);
    }
  } catch (error) {
    return res.status(403).json(error);
  }
};

const del = async (req, res) => {
  try {
    const { userId, role } = req.user;

    if (await checkAuthorization(role)) {
      console.log("Removed item as Admin!");
      const doc = await deleteAsAdmin(req.params.id);
      return res.status(200).json(doc);
    } else {
      const doc = await deleteAsUser(req.params.id, userId);
      console.log(doc);
      return res.status(200).json(doc);
    }
  } catch (error) {
    return res.status(403).json(error);
  }
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
  create,
  get,
  del,
};
