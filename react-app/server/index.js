require("dotenv").config();
const express = require("express");
const path = require("path");
const usersRoute = require("./routes/userRoute");
const toDosRoute = require("./routes/toDoRoute.js");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/", usersRoute);
app.use("/todo", toDosRoute);

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
