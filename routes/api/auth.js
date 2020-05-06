const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

router.get("/facebook", passport.authenticate("facebook", {session: false, scope: "email"}))

router.get("/facebook/callback", passport.authenticate("facebook", {session: false}),
          (req, res) => {
              let payload = {id: req.user._id, username: req.user.username};
              let token = jwt.sign(payload, keys.JWT_SECRET, {expiresIn: 360000000});
              res.redirect(`http://localhost:3000/fb/Bearer ${token}`)
            //   res.send(`
            //    <script>
            //      localStorage.setItem("jwt","Bearer ${token}");
            //      window.location.href = "/";
            //    </script>
            //   `)
          })
        
router.post("/signup", 
          [
              check("name", "Enter Your name").isLength({min: 5}).not().isEmpty(),
              check("email")
                 .isEmail().withMessage("Enter a valid email")
                 .custom(value => {
                     return User.findOne({email: value}).then(user => {
                         if(user) return Promise.reject("Email is already in use")
                     })
                 }),
              check("password")
                 .not().isEmpty().withMessage("Enter your password")
                 .isLength({min: 7}).withMessage("min password length is 7"),
              check("username")
                 .custom(value => {
                     return User.findOne({username: value}).then(user => {
                         if(user) return Promise.reject("username already in use")
                     })
                 })   
          ], (req, res) => {
              const errors = validationResult(req);
              if(!(errors.isEmpty())){
                   return res.status(400).json({errors: errors.array()})
              }
              let newUser = new User({
                  name: req.body.name,
                  username: req.body.username,
                  email: req.body.email,
                  password: req.body.password
              })
              bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                      newUser.password = hash;
                      newUser.save()
                             .then(() => res.json({success: true}))
                  })
              })
          })


router.post("/login", 
        [
            check("email", "Enter a valid email")
               .isEmail()   ,
            check("password")
               .not().isEmpty().withMessage("Enter you password")
        ], (req, res) => {
            const errors =  validationResult(req);
            if(!(errors.isEmpty())) {
                return res.status(400).json({errors: errors.array()})
            }
            User.findOne({email: req.body.email})
                .then(user => {
                    if(!user){
                        return res.status(400).json({errors: [{msg: "email doesn't exist"}]})
                    }
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if(!result){
                            return res.status(400).json({errors: [{msg: "invalid password"}]});
                        }
                        let payload = {id: user._id, username: user.username};
                        let token = jwt.sign(payload, keys.JWT_SECRET, {expiresIn: 360000000})
                        return res.json({
                            success: true,
                            token: `Bearer ${token}`
                        })
                    })
                })
                .catch(err => console.log(err))
        })
        
module.exports = router;