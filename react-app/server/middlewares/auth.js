const { verifyToken } = require("../models/userModel");

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(403);

  try {
    const token = await req.headers.authorization.replace("Bearer ", "");
    const payload = await verifyToken(token, process.env.SECRET);
    req.user = payload;
    // console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = { authenticate };
