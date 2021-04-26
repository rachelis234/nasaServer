const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendMail = require("../nodeMailer");
const pictureController = require("./picture");

const signToken = user => {
  let token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1H"
  });
  return token;
};

const createUser = (req, res) => {
  const { email } = req.body;
  User.find({ email }).then(users => {
    if (users.length >= 1) {
      return res.status(409).json({
        message: "Email exists"
      });
    }
    let newUser = new User(req.body);
    newUser
      .save()
      .then(async user => {
        let token = await signToken({email:user.email,password:user.password});
        sendMail(user);
        return res.status(200).json({ token, user });
      })
      .catch(error => {
        return res.status(500).json({ error });
      });
  });
};
const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.find({ email }).then(async users => {
    if (users.length === 0) {
      return res.status(401).json({ message: "Auth failed" });
    }

    const [user] = users;
    if (user.password == password) {
      let token = await signToken(req.body);
      return res.status(200).json({
        // message: "Auth succeeded",
        token,
        user
      });
    }
    return res.status(401).json({
      message: `Auth failed password  ${password}  ${user.password}  ${email}  ${user.email}`
    });
  });
};
const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.userId, req.body)
    .then(user => {
      if (user) {
        return res.status(200).json({ message: "User updated!" });
      }
      return res.status(500).json({ message: "User isn't exists" });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

const getUserById = (req, res) => {
  User.findById(req.userId)
    .then(user => {
      if (user) {
        return res.status(200).json({
          user: user
        });
      }
      return res.status(500).json({ message: "user isn't exists" });
    })
    .catch(err => {
      return res.status(500).json({ message: "user isn't exists" });
    });
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  getUserById
};
