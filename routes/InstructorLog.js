const express = require("express");
const router = express.Router();
const {InstructorLogs} = require("../models");

//creates an entry for instructor logs
router.post('/create', async (req,res) => {
    const content = req.body
    const newInstructorLogs = await InstructorLogs.create(content);
    res.json({InstructorLogs: newInstructorLogs.id})
})

module.exports = router;