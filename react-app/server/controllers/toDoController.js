const { insertToDo, getAsAdmin } = require("../models/toDoModel");

const create = async (req, res) => {
  console.log("Inside create Todo");
  try {
    const { title } = req.body;
    const doc = await insertToDo(title, req.user.userId);

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(403).json(error);
  }
};

module.exports = {
  create,
};
