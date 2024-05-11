const express = require("express");
const router = express.Router();
const {ActivityFives, Activities} = require("../models")

router.get("/",async (req,res) => {
    const listOfActivityFives =  await ActivityFives.findAll();
    res.json(listOfActivityFives);
});

router.post('/', async (req,res) => {
    const {id,content} = req.body;
    const newActivityFive = await ActivityFives.create(content);
    Activities.update({ActivityFiveId: newActivityFive.id}, {where:{id:id}})
    res.json(newActivityFive);
})

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id
    const activityFive = await ActivityFives.findByPk(id)
    console.log(activityFive)
    res.json(activityFive)
})

router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivityFive = await ActivityFives.update(
        { activity_mvc: data.content.activity_mvc, content: data.content.content, MLClusters: data.content.MLClusters,label:data.content.label,instruction:data.content.instruction},
        { where: { id: id } }
    )
    res.json(updatedActivityFive)
})

router.post('/home/:id', async (req,res) => {
    const data = req.body 
    const id = req.params.id
    const updatedActivityFive = await ActivityFives.update(
        {MLClusters:data.MLClusters,label:data.label,instruction:data.instruction},
        {where: {id:id}}
    )
    res.json(updatedActivityFive)
})

router.post('/new-chain', async (req,res) => {
    const {id,content} = req.body;
    const newActivityFive = await ActivityFives.create(content);
    const newActivities = await Activities.create({UserId:content.UserId,ActivityFiveId:newActivityFive.id})
    res.json({ActivitiesId: newActivities, ActivityFiveId: newActivityFive.id});
})

router.post('/byId/:id/new-chain', async (req,res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        {ActivitySixId:null},
        {where: {id:id}}
    )
    res.json(updatedActivities)
})

router.post('/delete-activity', async (req, res) => {
    const {activityId} = req.body
    const deletedActivity = await ActivityFives.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})

module.exports = router;