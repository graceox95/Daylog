const express = require("express");
const path = require("path");
const requireAuth = require("../middleware/requireAuth.js");
const router = express.Router(); //이것 의미 물어볼 것임.

router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/pages/home.html"));
})

router.get("/home", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/pages/home.html"));
})

router.get("/diary", requireAuth, function(req, res){
    res.sendFile(path.join(__dirname, "../../code/pages/diary.html"));
})

module.exports = router;


