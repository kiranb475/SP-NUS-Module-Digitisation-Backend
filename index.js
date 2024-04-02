const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

app.use(cors());
app.use(express.json())

const db = require("./models");

const activityOneRouter = require('./routes/ActivityOne');
app.use("/activityone",activityOneRouter);
const activityTwoRouter = require('./routes/ActivityTwo');
app.use("/activitytwo",activityTwoRouter);
const activityThreeRouter = require('./routes/ActivityThree');
app.use("/activitythree",activityThreeRouter);
const activityFourRouter = require('./routes/ActivityFour');
app.use("/activityfour",activityFourRouter);
const activityFiveRouter = require('./routes/ActivityFive');
app.use("/activityfive",activityFiveRouter);
const activitySixRouter = require('./routes/ActivitySix');
app.use("/activitysix",activitySixRouter);
const usersRouter = require('./routes/Users');
app.use("/activityone/auth",usersRouter);
const homeRouter = require('./routes/Home');
app.use("/home",homeRouter);
const studentLogsRouter = require('./routes/StudentLog');
app.use("/studentlog",studentLogsRouter);
const summaryRouter = require('./routes/Summary');
app.use("/summary",summaryRouter);
const instructorLogsRouter = require('./routes/InstructorLog');
app.use("/instructorlog",instructorLogsRouter);

// db.sequelize.sync().then(() => {
//     // app.listen(3001, () => {
//     //     console.log("Server running on port 3001.");
//     // });
//     app.listen(process.env.PORT | 3001, () => {
//         console.log(`Server running on port ${PORT}`);
//     })
// })

db.sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT || 3001, () => {
            //console.log(`Server running on ${PORT}`)
        })
    }).catch((err) => {
        console.log(err)
    })