const User = require("../models/user");

async function createUniqueUsername(name){
    const users = await User.find({name: {$regex: new RegExp(`^${name}`, "i")}});
    return users.length ? name.replace(/\s/g, "") + users.length : name.replace(/\s/g, "")
}

module.exports = createUniqueUsername