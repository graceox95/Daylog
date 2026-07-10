const express = require("express");
const { body } = require("express-validator");
const pool = require("../db.js");
const requireAuth = require("../middleware/requireAuth.js");
const validate = require("../middleware/validate.js");
const router = express.Router();

router.get("/api/diary", requireAuth, async function(req, res, next){
    try {
        const [rows] = await pool.query(
            "SELECT entry_no, title, content, created_at FROM diary_entries WHERE user_no = ? ORDER BY created_at DESC",
            [req.session.user.user_no]
        );
        res.json({ success: true, entries: rows });
    } catch (err) {
        next(err);
    }
})

router.post("/api/diary", requireAuth, [
    body("title").trim().notEmpty().withMessage("제목을 입력해주세요.")
        .isLength({ max: 200 }).withMessage("제목은 200자 이하로 입력해주세요."),
    body("content").trim().notEmpty().withMessage("내용을 입력해주세요."),
], validate, async function(req, res, next){
    const { title, content } = req.body;

    try {
        await pool.query(
            "INSERT INTO diary_entries (user_no, title, content) VALUES (?, ?, ?)",
            [req.session.user.user_no, title, content]
        );
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
})

module.exports = router;
