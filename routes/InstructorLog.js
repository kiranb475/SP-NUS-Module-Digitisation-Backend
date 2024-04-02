const express = require("express");
const router = express.Router();
const {InstructorLogs} = require("../models");

router.post('/create', async (req,res) => {
    const content = req.body
    const newInstructorLogs = await InstructorLogs.create(content);
    res.json({InstructorLogs: newInstructorLogs.id})
})

router.get('/get/byId/:id', async (req,res) => {
    const id = req.params.id
    const instructorLogs = await InstructorLogs.findAll({where:{ActivitySequenceId:id}})
    res.json(instructorLogs)
})

router.post('/update/byId/:id', async (req,res) => {
    const id = req.params.id
    const content = req.body
    const instructorLogs = await InstructorLogs.update(
        {InstructorEvent:content},
        {where:{ActivitySequenceId:id}})
    res.json(instructorLogs)
})

module.exports = router;