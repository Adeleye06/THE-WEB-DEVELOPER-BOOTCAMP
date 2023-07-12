const express = require("express");
const path = require("path");
const app = express();
const redditData = require("./data.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
  res.render("cats", { cats });
});
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});
app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { rand: num }); // the first thing passed is the name of the file
});
app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});