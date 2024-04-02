const express = require("express");
const router = express.Router();
const {ActivitySixs, Activities} = require("../models")

router.get("/",async (req,res) => {
    const listOfActivitySixs =  await ActivitySixs.findAll();
    res.json(listOfActivitySixs);
});

router.post('/', async (req,res) => {
    const {id,content} = req.body;
    const newActivitySix = await ActivitySixs.create(content);
    Activities.update({ActivitySixId: newActivitySix.id}, {where:{id:id}})
    res.json(newActivitySix);
})

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id
    const activitySix = await ActivitySixs.findByPk(id)
    res.json(activitySix)
})

router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    const updatedActivitySix = await ActivitySixs.update(
        { activity_mvc: data.content.activity_mvc, content: data.content.content,label:data.content.label,instruction:data.content.instruction},
        { where: { id: id } }
    )
    res.json(updatedActivitySix)
})

router.post('/home/:id', async (req,res) => {
    const data = req.body 
    const id = req.params.id
    const updatedActivitySix = await ActivitySixs.update(
        {label:data.label,instruction:data.instruction},
        {where: {id:id}}
    )
    res.json(updatedActivitySix)
})

router.post('/new-chain', async (req,res) => {
    const {id,content} = req.body;
    const newActivitySix = await ActivitySixs.create(content);
    const newActivities = await Activities.create({UserId:content.UserId,ActivitySixId:newActivitySix.id})
    res.json({ActivitiesId: newActivities, ActivitySixId: newActivitySix.id});
})



module.exports = router;