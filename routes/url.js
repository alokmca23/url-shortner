const express  = require("express");
const URL = require("../models/url");

const {handleGenerateNewShortURL, handleGetAnalytics} = require("../controllers/url");

const router = express.Router();


router.get("/test", async (req,res) =>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls : allUrls,
    });
});

router.post("/",handleGenerateNewShortURL);
router.get("/:shortID", async (req,res) =>{
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
    res.redirect(entry.redirectURL);
});
router.get("/analytics/:shortID",handleGetAnalytics);

module.exports = router;