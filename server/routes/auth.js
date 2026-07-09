const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const pool = require("../db.js");
const router = express.Router();

router.get("/signIn", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/auth/signIn.html"));
})

router.post("/signIn", async function(req, res){
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query(
            "SELECT user_no, email, password_hash FROM users WHERE email = ?",
            [email]
        );
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." });
        }

        req.session.user = { user_no: user.user_no, email: user.email };
        res.json({ success: true });
    } catch (err) {
        console.error("로그인 DB 오류:", err);
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }
})

router.get("/signUp", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/auth/signUp.html"));
})

router.post("/signUp", async function(req, res){
    const { email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            [email, passwordHash]
        );
        res.json({ success: true });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            res.status(409).json({ success: false, message: "이미 가입된 이메일입니다." });
        } else {
            console.error("회원가입 DB 오류:", err);
            res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
        }
    }
})

router.get("/privacy", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/auth/privacy"));
})

router.get("/terms", function(req, res){
    res.sendFile(path.join(__dirname, "../../code/auth/terms.html"));
})

module.exports = router;

