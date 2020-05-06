const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const {to} = require("to-await");
const passport = require("passport");
const {check, validationResult} = require("express-validator");
const Message = require("../../models/message");
const jwt = require("jsonwebtoken");
const keys =  require("../../config/keys");

//operation are searching profiles, current user profile, other user profile
//edir current user profile

router.get("/", passport.authenticate("jwt", {session: false}),
          async (req, res) => {
              const [err, user] = await to(User.findById(req.user.id));
              if(err){
                  res.status(500).json({errors: [{msg: "internal server error"}]});
              }
             res.json({
                 name: user.name,
                 username: user.username,
                 photo: user.photo
             })
          })

router.get("/:id", async (req, res) => {
    const [err, user] = await to(User.findById(req.params.id))
    if(err){
        res.status(500).json({errors: [{msg: "internal server error"}]})
    }
    if(!user){
        res.status(400).json({errors: [{msg: "user isn't found"}]})
    }else{
        res.json({
            name: user.name,
            username: user.username,
            photo: user.photo
        })
    }
})

router.put("/edit", passport.authenticate("jwt", {session: false}), 
         [
             check("name", "Enter a valid name").isLength({min: 5}),
             check("username", "Enter a valid username").isLength({min: 7})
         ], 
          async (req, res) => {
             const errors = validationResult(req);
             if(!(errors.isEmpty())){
                 return res.status(400).json({errors: errors.array()});
             }
             const [err, user] = await to(User.findById(req.user.id));
             if(err){
                 res.status(500).json({errors: [{msg: "internal server error"}]});
             }
             if(user.username !== req.body.username){
                 let [_, users] = await to(User.find({username: req.body.username}));
                 if(user.length > 0) return res.status(400).json({errors: [{msg: "username already exits"}]});
                 await to(Message.updateMany({reciever: user.username}, {$set: {reciever: req.body.username}}))
                 user.username = req.body.username;
                 user.name = req.body.name;
                 user.photo = req.body.photo || user.photo;
                 user.save()
                      .then(edittedUser => {
                        let token = jwt.sign({id: req.user.id, username: edittedUser.username}, keys.JWT_SECRET, {expiresIn: 36000000})
                         res.json({
                             edittedUser: {
                                name: edittedUser.name,
                                username: edittedUser.username,
                                photo: edittedUser.photo,
                                token: `Bearer ${token}`
                                }
                         })
                    })
              }else{
                  const [err, user] = await to(User.findById(req.user.id));
                  user.photo = req.body.photo || user.photo;
                  user.name = req.body.name || user.name;
                  user.save()
                      .then(edittedUser => res.json({edittedUser}))
              }
          })

router.get("/search/:handler", async (req, res) => {
    User.find({$or: [{name: {$regex: new RegExp(req.params.handler, "i")}}, {username: {$regex: new RegExp(req.params.handler, "i")}}]})
        .then(users => {
            let userData = users.map(user => 
                            ({name: user.name, username: user.username, photo: user.photo, id: user._id}));
            res.json({users: userData})
        })
        .catch(err => {
            res.status(500).json({errors: [{msg:"internal server errors"}]})
        })
})

module.exports = router;