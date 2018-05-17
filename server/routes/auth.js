const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const Post = require("../models/Post")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Signup

const logInPromise = (user, req) => new Promise((resolve,reject) => {
  req.login(user, (err) => {
      if (err) return reject('Something went wrong');
      resolve(user);
    });
});  

authRoutes.post("/signup", (req, res, next) => {
  const {username, password, dni} = req.body

  if (!username || !password || !dni) {
    res.status(400).json({ message: 'Provide username, password and dni' });
    return;
  }

  User.findOne({ username })
  .then( user => {
      if(user) throw new Error('The username already exists');
      
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const theUser = new User({
        username,
        password: hashPass,
        dni
      });
  
      // return theUser.save().then( user => logInPromise(user,req));
      return theUser.save().then( user => {
        if (!user) throw new Error("The email does not exist");
      if (!bcrypt.compareSync(password, user.password))
        throw new Error("The password is not correct");
      logInPromise(user, req).then(user => {
        console.log(user);
        return res.status(200).json(user)
      })
  })})
  // .then(user => res.status(200).json(user))
  .catch(e => res.status(500).json({message:e.message}));
});


// LOGIN, LOGGEDIN

authRoutes.post('/login', (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username })
  .then( user => {
      if(!user) throw new Error('The username does not exist');
      if(!bcrypt.compareSync(password, user.password)) throw new Error('The password is not correct');
      return logInPromise(user,req);    
  })
  .then(user => res.status(200).json(user))
  .catch(e => res.status(500).json({message:e.message}));

});

authRoutes.get('/loggedin', (req, res) => {
  if(req.user){
      return res.status(200).json(req.user);
  }else{
      return res.status(400).json({message:"You should loggin first"});
  }
});

// LOGOUT

authRoutes.get('/logout', (req, res) => {
  if(req.user){
      req.logout();
      return res.status(200).json({message:"User logged out"});
  }else{
      return res.status(400).json({message:"You should loggin first"});
  }
});

// PRIVATE PAGE


authRoutes.get("/private/:id", (req, res, next) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .populate("posts")
    .then(post => res.status(200).json(post))
    .catch(e => res.status(500).json(e));
});


authRoutes.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;

