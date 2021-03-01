/**
 * The main server that serves the index page and also acts as a API router which queries the database
 */

const express = require("express");

const get = require("./index");

const serveStatic = require("serve-static");

const path = require("path");

const config = require("./config");

const PORT = process.env.PORT || config["serverport"];

const app = express();

app.get("/transact", async (req, res) => {
  let searchVal = req.query.id.replace(/[^a-zA-Z ]/g, "");
  if (searchVal.length > 0) {
    let result = await get(searchVal);
    res.json({ status: "success", result: result });
  } else {
    res.json({ status: "failure", result: "invalid input" });
  }
});

app.use("/", serveStatic(path.join(__dirname, "/")));

app.listen(PORT, () => console.log(`Express is running on Port:  ${PORT}`));
