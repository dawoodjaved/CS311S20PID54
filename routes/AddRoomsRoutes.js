const express = require("express");
const router = express.Router();
//to varify the id of a specific document/record of a specific collection
//that a document/record with this specific id is present or not.
var ObjectId = require("mongoose").Types.ObjectId;

var Rooms = require("../models/RoomModel");

//middleware for private routes.
const MiddlewareForPrivateRoutes = require("../middleware/MiddlewareForPrivateRoutes");

//retrieving the data from mongodb database;
router.get("/rooms", async (req, res) => {
  try {
    //sorting by date in descending order.
    Rooms.find((error, data) => {
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
router.post("/rooms", MiddlewareForPrivateRoutes, async (req, res) => {
  try {
    var newRecord = new Rooms({
      roomNo: req.body.roomNo,
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
router.delete("/deleterooms", MiddlewareForPrivateRoutes, async (req, res) => {
  try {
    Rooms.findOneAndRemove({}).then(() => {
      console.log("Deleted");
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
