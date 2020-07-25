const express = require("express");
const router = express.Router();
//to varify the id of a specific document/record of a specific collection
//that a document/record with this specific id is present or not.
var ObjectId = require("mongoose").Types.ObjectId;

var TimeTable = require("../models/TimeTableModel");

//middleware for private routes.
const MiddlewareForPrivateRoutes = require("../middleware/MiddlewareForPrivateRoutes");

//retrieving the data from mongodb database;
router.get("/timetable", async (req, res) => {
  try {
    //sorting by date in descending order.
    TimeTable.find((error, data) => {
      error == null
        ? res.send(data)
        : console.log(
            "Error while retrieving all records :" +
              JSON.stringify(error, undefined, 2)
          );
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//adding/sending the data to mongodb database;
//these routes are private routes it means only an authenticated user can access it.
//means only an auhthenticated user can post data.
router.post("/timetable", MiddlewareForPrivateRoutes, async (req, res) => {
  try {
    var newRecord = new TimeTable({
      instructorName: req.body.instructorName,
    });

    newRecord.save((error, data) => {
      if (error == null) res.send(data);
      else
        console.log(
          "Error while creating a new record :" +
            JSON.stringify(error, undefined, 2)
        );
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//Deleting the record in mongodb database;
//these routes are private routes it means only an authenticated user can access it.
//means only an auhthenticated user can delete data.
// router.delete(
//   "/deletetimetable",
//   MiddlewareForPrivateRoutes,
//   async (req, res) => {
//     try {
//       Instructor.remove({},()=>{
//         console.log('Deleted');
//       });
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   }
// );

module.exports = router;
