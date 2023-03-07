"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const webRoutes = require("./router.js");

const app = express();
const PORT = 3000;

app.use(express.static("./public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded to parse form data, use extended: true to omit warning


// PUT ROUTES HERE
app.use("/", webRoutes);

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
