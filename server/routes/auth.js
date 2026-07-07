const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/signIn", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/auth/signIn.html"));
})

router.get("/signUp", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/auth/signUp.html"));
})

router.get("/privacy", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/auth/privacy"));
})

router.get("/terms", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/auth/terms.html"));
})

module.exports = router;

