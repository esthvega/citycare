const express = require("express");
const postRoutes = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const isAdmin = require("../middlewares/isAdmin");
const isLogged = require("../middlewares/isLogged");
const uploadCloud = require('../configs/cloudinary');



postRoutes.get("/", (req, res) => {
  Post.find()
    .then(post => res.status(200).json(post))
    .catch(e => res.status(500).json(e));
});


postRoutes.post("/new", [isLogged, uploadCloud.single('file')], (req, res, next) => {
  const content = req.body.content;
  const user = req.user.id;
  const address = req.body.address;
  const subject = req.body.subject;
  const photo = req.file.url;
  const newPost = new Post({
    content,
    user,
    address,
    subject,
    photo 
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
  });
});


postRoutes.put("/edit/:id", isAdmin, (req, res, next) => {
  const postId = req.params.id;
  console.log(postId)
  Post.findByIdAndUpdate(postId,  {$set: {isResolve: true}}, function(err, post) 
   {
    if(err) {
      return res.status(400).json({message: "Unable to update post", error: err})
    }
 res.json({message: 'post succesfully updated', post: post})
   }
  )})

  postRoutes.get("/detail/:id", (req, res, next) => {

    Post.findById((req.params.id), function(err,post){  
    if(err) {
      return res.status(500).json(err);
    }
    console.log(post)
     res.status(200).json(post)
    })
  
  })


module.exports = postRoutes;
