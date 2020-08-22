const {
  insertToDo,
  findToDos,
  updateToDo,
  deleteToDo,
  sortByCreated,
  sortByUpdated,
} = require("../models/toDoModel");

const createToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const doc = await insertToDo(title, done);

    return res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getToDos = async (req, res) => {
  try {
    const doc = await findToDos();
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const doc = await updateToDo(req.params.id, title, done);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const delToDo = async (req, res) => {
  try {
    const doc = await deleteToDo(req.params.id);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const sortCreate = async (req, res) => {
  try {
    const doc = await sortByCreated(req.params.order);
    return res.status(200).json(doc);
  } catch (error) {}
  return res.status(400).json(error);
};

const sortUpdated = async (req, res) => {
  try {
    const doc = await sortByUpdated(req.params.order);
    return res.status(200).json(doc);
  } catch (error) {}
  return res.status(400).json(error);
};

module.exports = {
  createToDo,
  getToDos,
  updToDo,
  delToDo,
  sortCreate,
  sortUpdated,
};
