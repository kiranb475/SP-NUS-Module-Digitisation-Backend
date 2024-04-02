const express = require("express");
const router = express.Router();
const { ActivityTwos, Activities } = require("../models")

router.get("/", async (req, res) => {
    const listOfActivityTwos = await ActivityTwos.findAll();
    res.json(listOfActivityTwos);
});

router.post('/', async (req, res) => {
    const { id, content } = req.body;
    const newActivityTwo = await ActivityTwos.create(content);
    Activities.update({ ActivityTwoId: newActivityTwo.id }, { where: { id: id } })
    res.json(newActivityTwo);
})

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const activityTwo = await ActivityTwos.findByPk(id)
    res.json(activityTwo)
})

router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivityTwo = await ActivityTwos.update(
        { activity_mvc: data.content.activity_mvc, content: data.content.content, transcript_source_id: data.content.transcript_source_id, predefinedHighlighting: data.content.predefinedHighlighting,label:data.content.label,instruction:data.content.instruction },
        { where: { id: id } }
    )
    res.json(updatedActivityTwo)
})

router.post('/home/:id', async (req,res) => {
    const data = req.body 
    const id = req.params.id
    const updatedActivityTwo = await ActivityTwos.update(
        {predefinedHighlighting:data.predefinedHighlighting,label:data.label,instruction:data.instruction},
        {where: {id:id}}
    )
    res.json(updatedActivityTwo)
})

router.post('/new-chain', async (req,res) => {
    const {id,content} = req.body;
    const newActivityTwo = await ActivityTwos.create(content);
    const newActivities = await Activities.create({UserId:content.UserId,ActivityTwoId:newActivityTwo.id})
    res.json({ActivitiesId: newActivities, ActivityTwoId: newActivityTwo.id});
})

router.post('/byId/:id/new-chain', async (req,res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        {ActivityThreeId:null,ActivityFourId:null,ActivityFiveId:null,ActivitySixId:null},
        {where: {id:id}}
    )
    res.json(updatedActivities)
})


module.exports = router;