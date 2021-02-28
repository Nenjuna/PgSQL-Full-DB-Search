const express = require("express");

const get = require("./index");

const serveStatic = require("serve-static");

const path = require("path");

const PORT = process.env.PORT || 8181;

const app = express();

app.get("/transact", async (req, res) => {
  let result = await get("arumugam-con504");
  res.json({ success: result });
});

app.use("/", serveStatic(path.join(__dirname, "/")));

app.listen(PORT, () => console.log(`Express is running on Port:  ${PORT}`));
