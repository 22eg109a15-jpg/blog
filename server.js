const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/views", express.static(path.join(__dirname, "views")));


// IMPORTANT PART
app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "views", "index.html")
    );

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});