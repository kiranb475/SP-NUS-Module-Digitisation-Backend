const express = require("express");
const router = express.Router();
const { ActivityFives, Activities } = require("../models")

//creates an entry of activity five with the data provided and updates overall activity chain
router.post('/', async (req, res) => {
    const { id, content } = req.body;
    const newActivityFive = await ActivityFives.create(content);
    Activities.update({ ActivityFiveId: newActivityFive.id }, { where: { id: id } })
    res.json(newActivityFive);
})

//returns data of activity five for corresponding activity id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const activityFive = await ActivityFives.findByPk(id)
    console.log(activityFive)
    res.json(activityFive)
})

//updates activity five data
router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivityFive = await ActivityFives.update(
        {
            activity_mvc: data.content.activity_mvc, content: data.content.content,
            MLClusters: data.content.MLClusters, label: data.content.label, instruction: data.content.instruction,
            lastAuthored: data.content.lastAuthored
        },
        { where: { id: id } }
    )
    res.json(updatedActivityFive)
})

//handles update request of data from instructors end via the home page (custom activities instructor)
router.post('/home/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    const updatedActivityFive = await ActivityFives.update(
        { MLClusters: data.MLClusters, label: data.label, instruction: data.instruction },
        { where: { id: id } }
    )
    res.json(updatedActivityFive)
})

//deletes activity id of future activities
router.post('/byId/:id/new-chain', async (req, res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        { ActivitySixId: null },
        { where: { id: id } }
    )
    res.json(updatedActivities)
})

//deletes activity five id
router.post('/delete-activity', async (req, res) => {
    const { activityId } = req.body
    const deletedActivity = await ActivityFives.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})

module.exports = router;