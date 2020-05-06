const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const {to} = require("to-await");

const opts = {
    secretOrKey: keys.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

async function jwtHandler(payload, done){
    const [err, user] = await to(User.findById(payload.id));
    if(err) done(err);
    if(!user) done(null, false);
    if(user) done(null, user);
}

module.exports = passport => {
    passport.use(new JwtStrategy(opts, jwtHandler))
}