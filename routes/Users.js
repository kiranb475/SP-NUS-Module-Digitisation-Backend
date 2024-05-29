const express = require("express");
const router = express.Router();
const {Users} = require("../models")

// router.get("/",async (req,res) => {
//     const listOfUsers =  await Users.findAll();
//     res.json(listOfUsers);
// });

// router.post('/', async (req,res) => {
//     const content = req.body;
//     await Users.create(content);
//     res.json(content);
// })

//handles user login
router.post('/login', async (req, res) => {
    const {username, password, occupation} = req.body;
    const user = await Users.findOne({ where: [
        {username: username},
        {password: password},
        {occupation: occupation}
    ]})
    if (!user) { res.json({error: "User doesn't exist"}) } else {res.json(user.id)}
    
})

//handles user registration
router.post('/register', async (req,res) => {
    const content = req.body;
    const user = await Users.create(content);
    res.json(user.id);
})



module.exports = router;