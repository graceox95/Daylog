require("dotenv").config();

const express = require("express");
const path = require("path");
const pagesRouter = require("./routes/pages.js");
const authRouter = require("./routes/auth.js");
const app = express();

app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(express.static(path.join(__dirname, "../code")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", pagesRouter);
app.use("/", authRouter);

app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

