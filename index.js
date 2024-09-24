const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {connectMongoDb} = require("./connection");
const { restrictToLoggedInUserOnly, checkAuth} = require("./middlewares/auth");
const URL = require("./models/url");
// require('dotenv').config();

const urlRoutes = require("./routes/url");
const userRoutes = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://localhost:27017/short-url")
// console.log("environment variable:", process.env.DATABASE_URL);
// connectMongoDb(process.env.DATABASE_URL)
.then(() => console.log("MongoDb connected!"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoutes);
app.use("/user",userRoutes);
app.use("/", checkAuth, staticRoute);


app.get("/url/:shortID", async (req,res) =>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortID,
        },
        {
            $push : {
                visitHistory :{ 
                    timestamp : Date.now(),
                },
            }
        }
    );
    // console.log(shortID,entry.redirectURL);
    return res.redirect(entry.redirectURL);
});

app.listen(PORT , ()=> console.log(`Server started at port :${PORT}`));