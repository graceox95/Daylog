const express = require("express");
const pool = require("../db.js");
const requireAuth = require("../middleware/requireAuth.js");
const router = express.Router();

router.get("/api/diary", requireAuth, async function(req, res){
    try {
        const [rows] = await pool.query(
            "SELECT entry_no, title, content, created_at FROM diary_entries WHERE user_no = ? ORDER BY created_at DESC",
            [req.session.user.user_no]
        );
        res.json({ success: true, entries: rows });
    } catch (err) {
        console.error("일기 목록 조회 오류:", err);
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }
})

router.post("/api/diary", requireAuth, async function(req, res){
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: "제목과 내용을 모두 입력해주세요." });
    }

    try {
        await pool.query(
            "INSERT INTO diary_entries (user_no, title, content) VALUES (?, ?, ?)",
            [req.session.user.user_no, title, content]
        );
        res.json({ success: true });
    } catch (err) {
        console.error("일기 저장 오류:", err);
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }
})

module.exports = router;
