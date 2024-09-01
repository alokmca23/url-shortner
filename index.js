const express = require("express");
const path = require("path");
const urlRoutes = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const {connectMongoDb} = require("./connection");
require('dotenv').config()

const app = express();
const PORT = 8001;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

// connectMongoDb("mongodb://localhost:27017/short-url")
 connectMongoDb(process.env.DATABASE_URL)
.then(() => console.log("MongoDb connected!"));
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoutes);
app.use("/",staticRoute);
app.listen(PORT , ()=> console.log(`Server started at port :${PORT}`));