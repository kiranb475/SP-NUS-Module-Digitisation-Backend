const express = require("express");
const router = express.Router();
const { ActivityThrees, Activities } = require("../models")

//creates an entry of activity three with the data provided and updates overall activity chain
router.post('/', async (req, res) => {
    const { id, content } = req.body;
    const newActivityThree = await ActivityThrees.create(content);
    Activities.update({ ActivityThreeId: newActivityThree.id }, { where: { id: id } })
    res.json(newActivityThree);
})

//returns data of activity three for corresponding activity id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const activityThree = await ActivityThrees.findByPk(id)
    res.json(activityThree)
})

//updates activity three data
router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    console.log(data)
    const updatedActivityThree = await ActivityThrees.update(
        {
            activity_mvc: data.content.activity_mvc, content: data.content.content,
            transcript_source_id: data.content.transcript_source_id, MLModel: data.content.MLModel,
            AllowMLModel: data.content.AllowMLModel, predefinedMLSelection: data.content.predefinedMLSelection,
            label: data.content.label, instruction: data.content.instruction, lastAuthored: data.content.lastAuthored
        },
        { where: { id: id } }
    )
    res.json(updatedActivityThree)
})

//handles update request of data from instructors end via the home page (custom activities instructor)
router.post('/home/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    const updatedActivityThree = await ActivityThrees.update(
        {
            MLModel: data.MLModel, AllowMLModel: data.AllowMLModel, predefinedMLSelection: data.predefinedMLSelection,
            label: data.label, instruction: data.instruction
        },
        { where: { id: id } }
    )
    res.json(updatedActivityThree)
})

//deletes activity id of future activities
router.post('/byId/:id/new-chain', async (req, res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        { ActivityFourId: null, ActivityFiveId: null, ActivitySixId: null },
        { where: { id: id } }
    )
    res.json(updatedActivities)
})

//deletes activity three id
router.post('/delete-activity', async (req, res) => {
    const { activityId } = req.body
    const deletedActivity = await ActivityThrees.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})


module.exports = router;