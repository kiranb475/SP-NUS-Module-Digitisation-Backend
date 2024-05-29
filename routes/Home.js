const express = require("express");
const router = express.Router();
const { Activities, Users } = require("../models")


//returns list of all activities with corresponding user id
router.post("/", async (req, res) => {
    const { UserId } = req.body
    const listOfActivities = await Activities.findAll({
        where: { UserId: UserId }
    });
    res.json(listOfActivities);
});

//returns a list of all instructors
router.get('/instructors', async (req, res) => {
    const listOfInstructors = await Users.findAll({ where: { occupation: 'Instructor' } })
    res.json(listOfInstructors)
})

//returns a list of all students
router.get('/students', async (req, res) => {
    const listOfStudents = await Users.findAll({ where: { occupation: 'Student' } })
    res.json(listOfStudents)
})

router.post('/fromtemplate', async (req, res) => {
    const content = req.body
    const newActivity = await Activities.create(content)
    res.json(newActivity)
})

//removes chain of activities in activities table
router.post('/delete-activity', async (req, res) => {
    const { activityId } = req.body
    const deletedActivity = await Activities.destroy({ where: { id: activityId } })
    res.json(deletedActivity)
})

//changes status of data field 'published' in activities
router.post('/update-published-status/:id', async (req, res) => {
    const id = req.params.id
    const { Published } = req.body
    const updatedActivities = await Activities.update(
        { Published: Published },
        { where: { id: id } }
    )
    res.json(updatedActivities);
})

module.exports = router;