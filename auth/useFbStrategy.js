const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");
const {to} = require("to-await");
const createUnqiueUsername = require("../utils/createUniqueUsername")

// `${process.env.SERVER_API_URL}/api/auth/facebook/callback`

//-auth/facebook >> checks accessToken >> if exists >> calls the handler >> else >> 
//asks for user credentials and calls handler 
//done method called >> redirect to callback url
//sometimes facenook doesn't provide an email or a photo
//you would need to query a user by an email and a providerId
//if user with a provider id is retuned >> go to callback url
//if user email exists with no provider >> add provider and photo
//if no user >> create one and check if email was returned 
const opts = {
    clientID: "514043582838295",
    clientSecret: "7c87c9495b0f5be72bc138f375064d1a",
    callbackURL: `http://public-messages.herokuapp.com/api/auth/facebook/callback`,
    profileFields: ["emails", "displayName", "id", "photos"]
}

// if(user && !user.provider){
//     user.provider = profile.provider;
//     user.providerId = profileId,
//     user.photo = user.photo || profile.photo;
//     await user.save()
//     done(null, user)
// }

async function facebookHandler(accessToken, refreshToken, profile, done){
    const [err, user] = await to(User.findOne({email: profile.emails[0].value}));
    if(err) done(err);
    if(user && user.provider && user.providerId) done(null, user)
    if(user && !user.providerId){
        user.provider = profile.provider;
        user.providerId = profile.id;
        user.photo = user.photo || profile.photos[0].value;
        user.save()
            .then(savedUser => done(null, savedUser))
    }
    if(!user){
        const newUser = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: profile.provider,
            providerId: profile.id,
            username: await createUnqiueUsername(profile.displayName),
            photo: profile.photos ? profile.photos[0].value : undefined
        })
        let [err, savedUser] = await to(newUser.save());
        if(err) done(err);
        done(null, savedUser)
    }
}

module.exports = passport => {
    passport.use(new FacebookStrategy(opts, facebookHandler))
}