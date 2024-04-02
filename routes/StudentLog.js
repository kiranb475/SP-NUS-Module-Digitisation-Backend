const express = require("express");
const router = express.Router();
const {StudentLogs} = require("../models");

router.post('/create', async (req,res) => {
    const content = req.body
    const newStudentLogs = await StudentLogs.create(content);
    res.json({StudentLogsId: newStudentLogs.id})
})

router.get('/get/byId/:id', async (req,res) => {
    const id = req.params.id
    const studentLogs = await StudentLogs.findAll({where:{StudentTemplateId:id}})
    res.json(studentLogs)
})

router.post('/update/byId/:id', async (req,res) => {
    const id = req.params.id
    const content = req.body
    const studentLogs = await StudentLogs.update(
        {StudentEvent:content},
        {where:{StudentTemplateId:id}})
    res.json(studentLogs)
})

module.exports = router;