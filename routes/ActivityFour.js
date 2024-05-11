const express = require("express");
const router = express.Router();
const {ActivityFours, Activities} = require("../models")

router.get("/",async (req,res) => {
    const listOfActivityFours =  await ActivityFours.findAll();
    res.json(listOfActivityFours);
});

router.post('/', async (req,res) => {
    const {id,content} = req.body;
    const newActivityFour = await ActivityFours.create(content);
    Activities.update({ActivityFourId: newActivityFour.id}, {where:{id:id}})
    res.json(newActivityFour);
})

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id
    const activityFour = await ActivityFours.findByPk(id)
    res.json(activityFour)
})

router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivityFour = await ActivityFours.update(
        { activity_mvc: data.content.activity_mvc, content: data.content.content,label:data.content.label,instruction:data.content.instruction},
        { where: { id: id } }
    )
    res.json(updatedActivityFour)
})

router.post('/home/:id', async (req,res) => {
    const data = req.body 
    const id = req.params.id
    const updatedActivityFour = await ActivityFours.update(
        {label:data.label,instruction:data.instruction},
        {where: {id:id}}
    )
    res.json(updatedActivityFour)
})

router.post('/new-chain', async (req,res) => {
    const {id,content} = req.body;
    const newActivityFour = await ActivityFours.create(content);
    const newActivities = await Activities.create({UserId:content.UserId,ActivityFourId:newActivityFour.id})
    res.json({ActivitiesId: newActivities, ActivityFourId: newActivityFour.id});
})

router.post('/byId/:id/new-chain', async (req,res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        {ActivityFiveId:null,ActivitySixId:null},
        {where: {id:id}}
    )
    res.json(updatedActivities)
})


router.post('/delete-activity', async (req, res) => {
    const {activityId} = req.body
    const deletedActivity = await ActivityFours.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})


module.exports = router;