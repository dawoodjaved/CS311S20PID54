const express = require("express");
const router = express.Router();
//to varify the id of a specific document/record of a specific collection
//that a document/record with this specific id is present or not.
var ObjectId = require("mongoose").Types.ObjectId;

var Courses = require("../models/CourseModel");

//middleware for private routes.
const MiddlewareForPrivateRoutes = require("../middleware/MiddlewareForPrivateRoutes");

//retrieving the data from mongodb database;
router.get("/courses", async (req, res) => {
  try {
    //sorting by date in descending order.
    Courses.find((error, data) => {
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
router.post("/courses", MiddlewareForPrivateRoutes, async (req, res) => {
  try {
    var newRecord = new Courses({
      courseName: req.body.courseName,
      creditHours: req.body.creditHours,
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

//updating the record in mongodb database;
// router.put('/:id',async (req,res)=> {

// try {

//     if(!ObjectId.isValid(req.params.id)){
//         return res.status(400).send('No record with given id : ',req.params.id)
//     }

//     var updatedRecord = {
//         name:req.body.name,
//     }
//     //to get data after updation in the request of postman we use new:true
//     Items.findByIdAndUpdate(req.params.id , {$set: updatedRecord },{new:true}, (error,data)=>{
//         if(error==null) res.send(data)
//         else console.log('Error while updating a record :'+ JSON.stringify(error,undefined,2));
//     });
// });

// } catch (error) {
//     res.status(400).json(error);
// }

//Deleting the record in mongodb database;
//these routes are private routes it means only an authenticated user can access it.
//means only an auhthenticated user can delete data.
router.delete(
  "/deletecourses",
  MiddlewareForPrivateRoutes,
  async (req, res) => {
    try {
      Courses.findOneAndRemove({}).then(() => {
        console.log("Deleted");
      });
      // if (!ObjectId.isValid(req.params.id)) {
      //   return res.status(400).send("No record with given id : ", req.params.id);
      // }

      // Courses.remove()

      // Courses.findByIdAndRemove(req.params.id, (error, data) => {
      //   if (error == null) res.send(data);
      //   else
      //     console.log(
      //       "Error while deleting a record :" +
      //         JSON.stringify(error, undefined, 2)
      //     );
      // });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = router;
