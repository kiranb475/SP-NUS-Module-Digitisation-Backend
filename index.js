const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

// const allowedOrigins = [
//   'https://stupendous-naiad-9b0879.netlify.app',
//   /\.netlify\.app$/ // Allow any subdomain of netlify.app
// ];

const allowedOrigins = [/^https:\/\/.*\.netlify\.app$/];


const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowedOrigin => 
      typeof allowedOrigin === 'string' ? allowedOrigin === origin : allowedOrigin.test(origin))) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.error(msg);
      return callback(new Error(msg), false);
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const db = require("./models");

// Handles requests to the "/activityone" path
const activityOneRouter = require('./routes/ActivityOne');
app.use("/activityone", activityOneRouter);

// Handles requests to the "/activitytwo" path
const activityTwoRouter = require('./routes/ActivityTwo');
app.use("/activitytwo", activityTwoRouter);

// Handles requests to the "/activitythree" path
const activityThreeRouter = require('./routes/ActivityThree');
app.use("/activitythree", activityThreeRouter);

// Handles requests to the "/activityfour" path
const activityFourRouter = require('./routes/ActivityFour');
app.use("/activityfour", activityFourRouter);

// Handles requests to the "/activityfive" path
const activityFiveRouter = require('./routes/ActivityFive');
app.use("/activityfive", activityFiveRouter);

// Handles requests to the "/activitysix" path
const activitySixRouter = require('./routes/ActivitySix');
app.use("/activitysix", activitySixRouter);

// Handles requests to the "/userauth" path
const usersRouter = require('./routes/Users');
app.use("/userauth", usersRouter);

// Handles requests to the "/home" path
const homeRouter = require('./routes/Home');
app.use("/home", homeRouter);

// Handles requests to the "/studentlog" path
const studentLogsRouter = require('./routes/StudentLog');
app.use("/studentlog", studentLogsRouter);

// Handles requests to the "/summary" path
const summaryRouter = require('./routes/Summary');
app.use("/summary", summaryRouter);

// Handles requests to the "/instructorlog" path
const instructorLogsRouter = require('./routes/InstructorLog');
app.use("/instructorlog", instructorLogsRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
