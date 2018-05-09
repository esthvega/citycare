require("dotenv").config();

const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);


mongoose.connect(process.env.MONGODB_URI);

const user = [
  {
    username: "pepe",
    password: bcrypt.hashSync("1234", salt)
  }
];

User.create(user, (err, arrayUser) => {
  if (err) {
    throw err;
  }
  console.log("Se ha añadido un user");
  const post = [
    {
      content: "Esto es un post",
      user: arrayUser[0]._id
    }
  ];
  Post.create(post, (err, arrayPost) => {
    if (err) {
      throw err;
    }
    console.log("Se ha añadido un post");
    arrayUser[0]
      .update({ $push: { posts: arrayPost[0]._id } })
      .then(() => mongoose.connection.close());
  });
});
