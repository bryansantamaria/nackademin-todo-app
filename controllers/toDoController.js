const { createToDo } = require("../models/toDoModel");

const addToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const doc = await createToDo(title, done);

    return res.status(200).json(doc);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = { addToDo };
