const express = require("express");
const router = express.Router();
const { ActivityTwos, Activities } = require("../models")

//creates an entry of activity two with the data provided and updates overall activity chain
router.post('/', async (req, res) => {
    const { id, content } = req.body;
    const newActivityTwo = await ActivityTwos.create(content);
    Activities.update({ ActivityTwoId: newActivityTwo.id }, { where: { id: id } })
    res.json(newActivityTwo);
})

//returns data of activity two for corresponding activity id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const activityTwo = await ActivityTwos.findByPk(id)
    res.json(activityTwo)
})

//updates activity two data
router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivityTwo = await ActivityTwos.update(
        {
            lastAuthored: data.content.lastAuthored, activity_mvc: data.content.activity_mvc, content: data.content.content,
            transcript_source_id: data.content.transcript_source_id,
            predefinedHighlighting: data.content.predefinedHighlighting, label: data.content.label,
            instruction: data.content.instruction
        },
        { where: { id: id } }
    )
    res.json(updatedActivityTwo)
})

//handles update request of data from instructors end via the home page (custom activities instructor)
router.post('/home/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    const updatedActivityTwo = await ActivityTwos.update(
        { predefinedHighlighting: data.predefinedHighlighting, label: data.label, instruction: data.instruction },
        { where: { id: id } }
    )
    res.json(updatedActivityTwo)
})

//deletes activity id of future activities
router.post('/byId/:id/new-chain', async (req, res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        { ActivityThreeId: null, ActivityFourId: null, ActivityFiveId: null, ActivitySixId: null },
        { where: { id: id } }
    )
    res.json(updatedActivities)
})

//deletes activity two id
router.post('/delete-activity', async (req, res) => {
    const { activityId } = req.body
    const deletedActivity = await ActivityTwos.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})


module.exports = router;