const express = require("express");
const router = express.Router();
const { ActivitySixs, Activities } = require("../models")

//creates an entry of activity six with the data provided and updates overall activity chain
router.post('/', async (req, res) => {
    const { id, content } = req.body;
    const newActivitySix = await ActivitySixs.create(content);
    Activities.update({ ActivitySixId: newActivitySix.id }, { where: { id: id } })
    res.json(newActivitySix);
})

//returns data of activity six for corresponding activity id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const activitySix = await ActivitySixs.findByPk(id)
    res.json(activitySix)
})

//updates activity six data
router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivitySix = await ActivitySixs.update(
        { activity_mvc: data.content.activity_mvc, content: data.content.content, label: data.content.label, instruction: data.content.instruction, lastAuthored: data.content.lastAuthored },
        { where: { id: id } }
    )
    res.json(updatedActivitySix)
})

//handles update request of data from instructors end via the home page (custom activities instructor)
router.post('/home/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    const updatedActivitySix = await ActivitySixs.update(
        { label: data.label, instruction: data.instruction },
        { where: { id: id } }
    )
    res.json(updatedActivitySix)
})

//deletes activity six id
router.post('/delete-activity', async (req, res) => {
    const { activityId } = req.body
    const deletedActivity = await ActivitySixs.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})

module.exports = router;