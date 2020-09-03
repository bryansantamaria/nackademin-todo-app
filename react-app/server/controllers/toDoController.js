const { insertToDo } = require("../models/itemModel");

const create = async (req, res) => {
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
