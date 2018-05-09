const express = require("express");
const postRoutes = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const isAdmin = require("../middlewares/isAdmin");
const isLogged = require("../middlewares/isLogged");

postRoutes.get("/", (req, res) => {
  Post.find()
    .then(post => res.status(200).json(post))
    .catch(e => res.status(500).json(e));
});

postRoutes.post("/new", isLogged, (req, res, next) => {
  const newPost = new Post({
    content: req.body.content,
    user: req.body.user
  });
  newPost.save(function(err, post) {
    if (err) {
      console.log(err);
      return res.send(500);
    } else {
      User.findByIdAndUpdate(post.user, { $push: { posts: post._id } }).then(
        () => res.status(200).json(post)
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
//})

module.exports = postRoutes;
