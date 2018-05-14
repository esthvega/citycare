const express = require("express");
const postRoutes = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const isAdmin = require("../middlewares/isAdmin");
const isLogged = require("../middlewares/isLogged");
const uploadCloud = require('../configs/cloudinary');
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.MAPSAPI,
  Promise: Promise
});



postRoutes.get("/", (req, res) => {
  // this.post = post;
  // console.log(post)
  // Post.findOneAndUpdate(post, {$sort: {date: -1}})
    Post.find()
    .sort({date: -1})
    .then(post => res.status(200).json(post))
    .catch(e => res.status(500).json(e));
});


postRoutes.post("/new", [isLogged, uploadCloud.single('file')], (req, res, next) => {
console.log("HEEEEEEEEEEEELLO FILEEE")
  const content = req.body.content;
  const user = req.user.id;
  const address = req.body.address;
  const subject = req.body.subject;
  const photo = req.file.url;

    googleMapsClient
      .geocode({ address })
      .asPromise()
      .then(data => {
        lat = data.json.results[0].geometry.viewport.northeast.lat;
        lng = data.json.results[0].geometry.viewport.northeast.lng;

        const location = {
          type: "Point",
          coordinates: [lat, lng]
        };
        const newPost = new Post({
          content,
          user,
          address,
          subject,
          photo,
          location
        });
      
  newPost.save(function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({message: "que coños es esto"});
    } else {
      User.findByIdAndUpdate(post.user, { $push: { posts: post._id } }).then(
        () => res.status(200).json({message: 'New post created! Click navigate home to see it!', post: post})
      );
    }
  })})
});


postRoutes.get("/edit/:id", isAdmin, (req, res, next) => {
  const postId = req.params.id;
  Post.findByIdAndUpdate(postId,  {$set: {isResolve: true}}, {new:true}, function(err, post) 
   {
    if(err) {
      return res.status(400).json({message: "Unable to update post", error: err})
    }
 res.json({message: 'post succesfully updated', post})
   }
  )})

  postRoutes.get("/detail/:id", (req, res, next) => {

    Post.findById((req.params.id), function(err,post){  
    if(err) {
      return res.status(500).json(err);
    }
     res.status(200).json(post)
    })
  
  })


module.exports = postRoutes;
