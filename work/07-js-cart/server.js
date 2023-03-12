const PORT = 3000;
const express = require("express");
const app = express();

const cats = require("./src/storage")

app.use(express.static("./public"));


app.get('/products', (req, res) => {
    res.json(Object.keys(cats));
});


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
