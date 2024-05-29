const express = require("express");
const router = express.Router();
const { ActivityFours, Activities } = require("../models")

//creates an entry of activity four with the data provided and updates overall activity chain
router.post('/', async (req, res) => {
    const { id, content } = req.body;
    const newActivityFour = await ActivityFours.create(content);
    Activities.update({ ActivityFourId: newActivityFour.id }, { where: { id: id } })
    res.json(newActivityFour);
})

//returns data of activity four for corresponding activity id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const activityFour = await ActivityFours.findByPk(id)
    res.json(activityFour)
})

//updates activity four data
router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivityFour = await ActivityFours.update(
        { activity_mvc: data.content.activity_mvc, content: data.content.content, label: data.content.label, instruction: data.content.instruction, lastAuthored: data.content.lastAuthored },
        { where: { id: id } }
    )
    res.json(updatedActivityFour)
})

//handles update request of data from instructors end via the home page (custom activities instructor)
router.post('/home/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    const updatedActivityFour = await ActivityFours.update(
        { label: data.label, instruction: data.instruction },
        { where: { id: id } }
    )
    res.json(updatedActivityFour)
})

//deletes activity id of future activities
router.post('/byId/:id/new-chain', async (req, res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        { ActivityFiveId: null, ActivitySixId: null },
        { where: { id: id } }
    )
    res.json(updatedActivities)
})

//deletes activity four id
router.post('/delete-activity', async (req, res) => {
    const { activityId } = req.body
    const deletedActivity = await ActivityFours.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})


module.exports = router;