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

//posting email and password to database to authenticate it.
router.post("/login", async (req, res) => {
  try {
    //destructuring data from request body.
    const { email, password } = req.body;

    //simple validation.
    if (!email || !password)
      //you can also use res.json() instead of res.send();
      return res.status(400).json({ message: "please enter all fields" });

    //check password length.
    if (password.length < 5)
      return res
        .status(400)
        .json({
          message: "The password must be at least five characters long",
        });

    //check for user.
    //ES6 refactoring at email.
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user does not exist." });

    //comparing the password with the password stored in  database which is finded by
    //findOne method.
    //we use bycrypt because the password stored in the database is in the encrypted(hashed)
    //from so bcrypt compare our plain text password with the encrypted password
    //here user.password is encrypted password and password is plain text.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials." });

    //first parameter in the jwt is payload(any data you want to send with it).
    //payload can be any data.

    const token = jwt.sign({ id: user._id }, config.get("jwtSecret"), {
      expiresIn: 3600000,
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//getting a user information by adding its token to requset header.
router.get("/user", async (req, res) => {
  try {
    //because we don't want password when we get the user data
    //so we will remove user password from response sending by findById method.
    const searchedUser = await User.findById(req.user.id).select("-password");
    res.json(searchedUser);
  } catch (error) {
    res.status(400).json({ message: "user does not exists." });
  }
});

module.exports = router;
