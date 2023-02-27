"use strict";
const express = require("express");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const webRoutes = require("./router.js");

const app = express();
const PORT = 30001;

app.use(express.static("./public"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded to parse form data, use extended: true to omit warning


// PUT ROUTES HERE
app.use("/", webRoutes);

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
