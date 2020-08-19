const { insertToDo, findToDos, updateToDo } = require("../models/toDoModel");

const createToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const doc = await insertToDo(title, done);

    return res.status(200).json(doc);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getToDos = async (req, res) => {
  try {
    const doc = await findToDos();
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(401).send(error);
  }
};

const updToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const doc = await updateToDo(req.params.id, title, done);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { createToDo, getToDos, updToDo };
