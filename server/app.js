const express = require("express");
const router = require("./routes/toDoRoute.js");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static((__dirname, "public")));

app.use("/todo", router);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
