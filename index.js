require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

//process.env.Port will check either 4000 port is empty or in used otherwise it will use another port;
const Port = process.env.PORT || 4000;

const app = express();

//latest version of react has built in bodyparser. you can remove bodyparser module from
//your project if you want and only have to use.
//app.use(express.json());

app.use(bodyParser.json());
//node will block the requests made by the other port numbers
//except 4000
//therefore we use cors to enable requests form other ports.
app.use(cors());

var addCourseRoutes = require("./routes/AddCourseRoutes");
var addDWHoursRoutes = require("./routes/AddDWHoursRoutes");
var timeTableRoutes = require("./routes/TimeTableRoutes");
var addRoomsRoutes = require("./routes/AddRoomsRoutes");
var userRoutes = require("./routes/UsersRoutes");
const userAuthRoutes = require("./routes/UserAuthRoutes");

app.use("/api/user", userRoutes);
app.use("/api/auth", userAuthRoutes);
app.use("/api", addCourseRoutes);
app.use("/api", addDWHoursRoutes);
app.use("/api", timeTableRoutes);
app.use("/api", addRoomsRoutes);

app.listen(Port, () => console.log("server listening at localhost:4000"));
