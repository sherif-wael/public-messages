const express = require("express");
const router = express.Router();
const {to} = require("to-await");
const Message = require("../../models/message");
const passport = require("passport");
const {check, validationResult} = require("express-validator")

//operations: [create, delete, queryAll, userSentMesages, userRecievedMessages];

//Get request
//Not Authenticated path
//get all messages
router.get("/all", async (req, res) => {
    let [err, count] = await to(Message.find().count());
    Message.find()
           .sort({date: -1})
           .skip(Number(req.query.skip)).limit(Number(req.query.limit))
           .then(messages => {
               res.json({messages, count})
           }) 
           .catch(err => console.log(err)) 
})

//Get request
//Authenticated Path
//get messages created by user
router.get("/user/sent", passport.authenticate("jwt", {session: false}), 
          async (req, res) => {
              const [err, messages] = await to(Message.find({author: req.user.id}).sort({date: -1}));
              if(err){
                  return res.status(500).json({errors: [{msg:"internal server err"}]})
              }
              res.json({messages})
          })

//GET request
//Authenticated path
//get user recieved messages
router.get("/user/recieved", passport.authenticate("jwt", {session: false}), 
         async (req, res) => {
             const [err, messages]  = await to(Message.find({reciever: req.user.username}).sort({date: -1}));
             if(err){
                return res.status(500).json({errors: [{msg: "internal server error"}]})
             }
             res.json({messages})
         })

//POST request
//Authenticated path
//create a message requires (to, from ,body) fields
router.post("/create", passport.authenticate("jwt", {session: false}),
           [
               check("body", "enter a message")
                   .isLength({min: 20, max: 280}).withMessage("message length is 20-280 characters")
                   .not().isEmpty(),
                check("reciever").custom(value => {
                    if(value != "all"){
                        return User.find({username: value}).then(users => {
                            if(users.length == 0) return Promise.reject("Username doesn't exist")
                      })
                    }
                    return true;
                })
           ],
            async (req, res) => {
                const errors = validationResult(req);
                console.log(errors.array())
                if(!(errors.isEmpty())){
                    return res.status(400).json({errors: errors.array()})
                }
                let message = new Message({
                    reciever: req.body.reciever,
                    author: req.user.id,
                    body: req.body.body
                })
                message.save()
                       .then(message => res.json({message}))
                       .catch(err => res.status(500).json({errors: [{msg: "internal server error"}]}));
            })

//GET request
//Authenticated path
//delete message by id
router.get("/delete/:id", passport.authenticate("jwt", {session: false}), 
           async (req, res) => {
               Message.findOneAndDelete({_id: req.params.id, $or: [{author: req.user.id}, {reciever: req.user.username}]})
                      .then(message => res.json({message}))
                      .catch(err => res.status(400).json({errors: [{msg: "message is not found"}]}))
           })



//GET request
//get messages recieved by other user;
//Not a private Route
router.get("/recieved/:username", async (req, res ) => {
    let [err, messages] = await to(Message.find({reciever: req.params.username}));
    if(err){
        return res.status(500).json({errors: [{msg: "internal server error"}]})
    }
    res.json({messages})
})

module.exports = router;
