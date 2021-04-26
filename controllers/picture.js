const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const request = require("request");
const Picture = require("../models/Picture");
const User = require("../models/User");
const callAPI = () => {
  const options = {
    method: "GET",
    url:
      "https://api.nasa.gov/planetary/apod?api_key=gsWmSHmzpevsYl7Zdx14RsdeIMcjHm0UAGqKvh4B"
  };
  return new Promise(function(resolve, reject) {
    request(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};
const getPictureOfDay = (req, res) => {
  callAPI()
    .then(async body => {
      let parsedData = JSON.parse(body);
      let picture=await Picture.findOne({userId:req.userId,url:parsedData.url});
      if(picture){
        return res.status(200).json({ parsedData });
      }
      let newPicture = new Picture({
        date: new Date(parsedData.date),
        explanation: parsedData.explanation,
        hdurl: parsedData.hdurl,
        media_type: parsedData.media_type,
        title: parsedData.title,
        url: parsedData.url
      });
      newPicture.userId = req.userId;
      newPicture
        .save()
        .then(picture => {
          User.findById(picture.userId).then(user => {
            user.pictures.push(picture._id);
            user.save();
          });
          return res.status(200).json({ parsedData });
        })
        .catch(error => {
          return res.status(500).json({ "error:": error });
        });
    })
    .catch(err => {
      console.error("error:", err);
    });
};
const getAllPictures = async (req, res) => {
  let pictures = await Picture.find({ userId: req.userId });
  if (!pictures) {
    return res.status(500).json({ message: "pictures do not exists" });
  }
  return res.status(200).json({ pictures });
};
const uploadPicture = async (req, res) => {
  const { path: url, filename: title } = req.file;
  let newPicture = new Picture({
    date: Date.now(),
    media_type: "image",
    title,
    url:`http://localhost:3000/${req.file.path}`,
    userId:req.userId
  });
  newPicture.save().then(picture => { 
    User.findById(req.userId)
      .then(user => { 
        user.pictures.push(picture._id);
        user.save();
        console.log(user)
        console.log(picture)
        return res.status(200).json({ message: "user created" });
      })
      .catch(error => {
        return res.status(500).json({ error });
      });
  });
};
const getPictureById = (req, res) => {};

module.exports = {
  getPictureOfDay,
  getAllPictures,
  getPictureById,
  uploadPicture
};
