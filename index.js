const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "client/dist")));

let data = [
  { title: "1" },
  { title: "2" },
  { title: "3" },
  { title: "4" },
  { title: "5" }
];
app.get("/hay", (req, res) => {
  res.send(data);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT);
