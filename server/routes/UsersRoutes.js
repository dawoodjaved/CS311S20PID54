const express = require("express");
const router = express.Router();
//to varify the id of a specific document/record of a specific collection
//that a document/record with this specific id is present or not.
var ObjectId = require("mongoose").Types.ObjectId;

//this is a module to ancrypt data(plain text) with the use of hashing.
//if you are a window user then you must use bcryptjs instead of bcrypt to avoid dependeny issues.
const bcrypt = require("bcryptjs");

//to send tokens to database along with the data.
const jwt = require("jsonwebtoken");

const config = require("config");

var User = require("../models/UserModel");

router.post("/register", async (req, res) => {
  try {
    //destructuring data from request body.
    const { name, email, password } = req.body;

    //simple validation.
    if (!name || !email || !password)
      //you can also use res.json() instead of res.send();
      return res.status(400).json({ message: "please enter all fields" });

    //check for existing user.
    //ES6 refactoring at email.
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already exists" });

    //check password length.
    if (password.length < 5)
      return res
        .status(400)
        .json({
          message: "The password must be at least five characters long",
        });

    //check same password entered at reEntered time.
    // if(password !== reEnteredPassword)
    //     return res
    //     .status(400)
    //     .json({ message: 'Enter the same password twice for'});

    //after checking all fields are filled ana user is not already exists.
    const newUser = new User({
      name,
      email,
      password,
    });

    //encrypting data(plain text),here is password, and store in the database.
    //create salt and hash to encrypt data.
    const salt = await bcrypt.genSalt(10);
    //newUser.password is the plain text which is
    //hashed(convert to encrypted form by with the use of hashing)
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    //hashed(encrypted) the password
    newUser.password = hashedPassword;
    const savedUser = await newUser.save();

    //first parameter in the jwt is payload(any data you want to send with it).
    //payload can be any data.
    const token = jwt.sign({ id: savedUser._id }, config.get("jwtSecret"), {
      expiresIn: 3600000,
    });

    res.json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

//         //now saving the newUser with hashed(encrypted) password into the database
//         newUser.save()
//             .then( (thisNewUserData) => {
//                 //first parameter in the jwt is payload(any data you want to send with it).
//                 //payload can be any data.
//                 jwt.signin(
//                     { id:thisNewUserData.id },
//                     config.get('jwtSecret'),
//                     { expiresIn:3600 },
//                     (error,token) =>{
//                         if(error) throw error;
//                         res.json({
//                             token,
//                             user:{
//                                 id:thisNewUserData.id,
//                                 name:thisNewUserData.name,
//                                 email:thisNewUserData.email
//                             }
//                         })
//                     }
//                 )
//         });
//     }
// });
