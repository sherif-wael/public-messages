const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

//connecting to DB
mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(() => console.log("connected to DB"))
                .catch((err) => console.log(err))



// confgiuring the app
app.use(cors({origin: "http://localhost:3000"}))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: false, limit: "50mb"}));
app.use(passport.initialize());
//using passport stratigies

require("./auth/useFbStrategy")(passport);
require("./auth/useJwtStrategy")(passport);


//using routes
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/message", require("./routes/api/message"))

//serving static files
app.use(express.static(path.join(__dirname, "./client/public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./models/user.js"))
    // res.sendFile(path.join(__dirname, "./client/public/index.js"))
    //ashdkasd
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server is listening to port 5000"))