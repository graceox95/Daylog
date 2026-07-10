require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const pagesRouter = require("./routes/pages.js");
const authRouter = require("./routes/auth.js");
const diaryRouter = require("./routes/diary.js");
const app = express();

app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(express.static(path.join(__dirname, "../code")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use("/", pagesRouter);
app.use("/", authRouter);
app.use("/", diaryRouter);

app.use(function(err, req, res, next){
    console.error(err);
    res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
})

app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

