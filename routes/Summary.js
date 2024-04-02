const express = require("express");
const router = express.Router();
const {Summaries} = require("../models");

router.post('/create', async (req,res) => {
    const content = req.body
    const newSummaries = await Summaries.create(content);
    res.json({SummariesId: newSummaries.id})
})

module.exports = router;