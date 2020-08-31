const {
  insertToDo,
  findToDosAdmin,
  findToDosUser,
  updateToDoAdmin,
  updateToDoUser,
  deleteToDoAdmin,
  deleteToDoUser,
  sortByCreatedAdmin,
  sortByCreatedUser,
  sortByUpdatedAdmin,
  sortByUpdatedUser,
  limitPaginateAdmin,
  limitPaginateUser,
} = require("../models/toDoModel");

const createToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const doc = await insertToDo(title, done, req.user.userId);

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(403).json(error);
  }
};

const getToDos = async (req, res) => {
  try {
    const { userId, role } = req.user;

    if (await checkAuthorization(role)) {
      const doc = await findToDosAdmin();
      return res.status(200).json(doc);
    } else {
      const doc = await findToDosUser(userId);
      return res.status(200).json(doc);
    }
  } catch (error) {
    return res.status(403).json(error);
  }
};

const updToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const { userId, role } = req.user;

    if (await checkAuthorization(role)) {
      const doc = await updateToDoAdmin(req.params.id, title, done);
      return res.status(200).json(doc);
    } else {
      const doc = await updateToDoUser(req.params.id, title, done, userId);
      return res.status(200).json(doc);
    }
  } catch (error) {
    return res.status(403).json(error);
  }
};

const delToDo = async (req, res) => {
  try {
    const { userId, role } = req.user;

    if (await checkAuthorization(role)) {
      const doc = await deleteToDoAdmin(req.params.id);
      return res.status(200).json(doc);
    } else {
      const doc = await deleteToDoUser(req.params.id, userId);
      return res.status(200).json(doc);
    }
  } catch (error) {
    return res.status(403).json(error);
  }
};

const sortCreate = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (await checkAuthorization(role)) {
      const doc = await sortByCreatedAdmin(req.params.order);
      return res.status(200).json(doc);
    } else {
      const doc = await sortByCreatedUser(req.params.order, userId);
      return res.status(200).json(doc);
    }
  } catch (error) {}
  return res.status(403).json(error);
};

const sortUpdated = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (await checkAuthorization(role)) {
      const doc = await sortByUpdatedAdmin(req.params.order);
      return res.status(200).json(doc);
    } else {
      const doc = await sortByUpdatedUser(req.params.order, userId);
      return res.status(200).json(doc);
    }
  } catch (error) {}
  return res.status(403).json(error);
};

const paginate = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let perPage = 5;
    let skip = Math.max(0, req.params.skip);

    if (await checkAuthorization(role)) {
      const doc = await limitPaginateAdmin(perPage, skip);
      return res.status(200).json(doc);
    } else {
      const doc = await limitPaginateUser(perPage, skip, userId);
      return res.status(200).json(doc);
    }
  } catch {
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
  createToDo,
  getToDos,
  updToDo,
  delToDo,
  sortCreate,
  sortUpdated,
  paginate,
};
