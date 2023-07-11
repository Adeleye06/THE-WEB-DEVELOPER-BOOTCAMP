const express = require("express");
const app = express();

//anytime i get an incoming request, app.use runs
/* app.use((req, res) => {
  console.log("WE GOT A NEW REQUEST!!");
  res.send("HELLO, WE GOT YOUR REQUEST! THIS IS A RESPONSE!");
}); */

app.get("/", (req, res) => {
  res.send("WELCOME TO THE HOMEPAGE!!!");
});

app.get("/r/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(
    `<h1>Viewing post ID: ${postId} on the ${subreddit} subreddit </h1>`
  );
});
app.post("/cats", (req, res) => {
  res.send("THIS IS A POST REQUEST, DIFFERENT FROM A GET REQUEST");
});
app.get("/cats", (req, res) => {
  res.send("MEOW!!!");
});
app.get("/dogs", (req, res) => {
  res.send("WOOF!!!");
});
app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080");
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send("NOTHING FOUND IF NOTHING SEARCHED");
  }
  res.send(`<h1> Search Results for: ${q} </h1>`);
});

app.get("*", (req, res) => {
  res.send(`I DON'T KNOW THAT PATH`);
});
