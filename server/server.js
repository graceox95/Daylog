// ---- ESM 버전 (package.json "type": "module" 일 때) ----
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const app = express();

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "../code/home.html"));
// });

// app.listen(3000, function () {
//     console.log("Server is running on http://localhost:3000");
// });

// ---- CommonJS 버전 (package.json "type": "commonjs" 일 때) ----
const express = require("express");
const path = require("path");

const app = express();

app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(express.static(path.join(__dirname, "../code")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../code/home.html")); //절대경로 만드는 역할을 수행함.
});

app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../code/home.html")); //절대경로 만드는 역할을 수행함.
});

app.get("/diary", function(req, res){
    res.sendFile(path.join(__dirname, "../code/diary.html"));
})

app.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});
