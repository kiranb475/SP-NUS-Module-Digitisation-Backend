const express = require("express");
const router = express.Router();
const {ActivityThrees,Activities} = require("../models")

router.get("/",async (req,res) => {
    const listOfActivityThrees =  await ActivityThrees.findAll();
    res.json(listOfActivityThrees);
});

router.post('/', async (req,res) => {
    const {id,content} = req.body;
    const newActivityThree = await ActivityThrees.create(content);
    Activities.update({ActivityThreeId: newActivityThree.id}, {where:{id:id}})
    res.json(newActivityThree);
})

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id
    const activityThree = await ActivityThrees.findByPk(id)
    res.json(activityThree)
})

router.post('/byId/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id
    console.log(data)
    const updatedActivityThree = await ActivityThrees.update(
        { activity_mvc: data.content.activity_mvc, content: data.content.content, transcript_source_id: data.content.transcript_source_id, MLModel: data.content.MLModel, AllowMLModel: data.content.AllowMLModel, predefinedMLSelection: data.content.predefinedMLSelection,label:data.content.label,instruction:data.content.instruction},
        { where: { id: id } }
    )
    res.json(updatedActivityThree)
})

router.post('/home/:id', async (req,res) => {
    const data = req.body 
    const id = req.params.id
    const updatedActivityThree = await ActivityThrees.update(
        {MLModel:data.MLModel,AllowMLModel:data.AllowMLModel,predefinedMLSelection:data.predefinedMLSelection,label:data.label,instruction:data.instruction},
        {where: {id:id}}
    )
    res.json(updatedActivityThree)
})

router.post('/new-chain', async (req,res) => {
    const {id,content} = req.body;
    const newActivityThree = await ActivityThrees.create(content);
    const newActivities = await Activities.create({UserId:content.UserId,ActivityThreeId:newActivityThree.id})
    res.json({ActivitiesId: newActivities, ActivityThreeId: newActivityThree.id});
})

router.post('/byId/:id/new-chain', async (req,res) => {
    const id = req.params.id
    const updatedActivities = await Activities.update(
        {ActivityFourId:null,ActivityFiveId:null,ActivitySixId:null},
        {where: {id:id}}
    )
    res.json(updatedActivities)
})


module.exports = router;