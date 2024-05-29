const express = require("express");
const router = express.Router();
const { ActivityOnes, Activities } = require("../models");

//creates an entry of activity one with the data provided
router.post('/', async (req, res) => {
    const content = req.body;
    const newActivityOne = await ActivityOnes.create(content);
    const newActivities = await Activities.create({ UserId: content.UserId, ActivityOneId: newActivityOne.id, Published: false })
    res.json({ ActivitiesId: newActivities, ActivityOneId: newActivityOne.id });
})

//handles copying of instructors template by creating a new chain of activities and new entry for activity one
router.post('/fromtemplate', async (req, res) => {
    const { id, content } = req.body;
    const newActivityOne = await ActivityOnes.create(content);
    const newActivities = await Activities.create({ UserId: id, ActivityOneId: newActivityOne.id })
    res.json({ ActivitiesId: newActivities, ActivityOneId: newActivityOne.id });
})

//returns data of activity one for corresponding activity id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const activityOne = await ActivityOnes.findByPk(id)
    res.json(activityOne)
})

//updates activity one data
router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivityOne = await ActivityOnes.update(
        {
            lastAuthored: data.lastAuthored, content: data.content, transcript_source_id: data.transcript_source_id,
            transcriptEditable: data.transcriptEditable, label: data.label, instruction: data.instruction,
            activity_mvc: data.activity_mvc
        },
        { where: { id: id } }
    )
    res.json(updatedActivityOne)
})

//deletes activity id of future activities
router.post('/byId/:id/new-chain', async (req, res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        { ActivityTwoId: null, ActivityThreeId: null, ActivityFourId: null, ActivityFiveId: null, ActivitySixId: null },
        { where: { id: id } }
    )
    res.json(updatedActivities)
})

//handles update request of data from instructors end via the home page (custom activities instructor)
router.post('/home/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    const updatedActivityOne = await ActivityOnes.update(
        { transcriptEditable: data.transcriptEditable, label: data.label, instruction: data.instruction },
        { where: { id: id } }
    )
    res.json(updatedActivityOne)
})

//deletes activity one id
router.post('/delete-activity', async (req, res) => {
    const { activityId } = req.body
    const deletedActivity = await ActivityOnes.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})


module.exports = router;