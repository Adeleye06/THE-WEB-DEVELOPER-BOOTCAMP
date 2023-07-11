const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("HI");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
