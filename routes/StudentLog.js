const express = require("express");
const router = express.Router();
const {StudentLogs} = require("../models");

//creates an entry for student logs
router.post('/create', async (req,res) => {
    const content = req.body
    const newStudentLogs = await StudentLogs.create(content);
    res.json({StudentLogsId: newStudentLogs.id})
})

module.exports = router;