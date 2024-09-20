const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body) return res.status(400).json({Error : "url is required"});
    const shortID = shortid();
    await URL.create({
        shortID : shortID,
        redirectURL : body.url, 
        visitHistory : [],
        generatedBy : req.user._id,
    })
    return res.render("home",{
        id : shortID,
    });
}
async function handleGetAnalytics(req,res){
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortID });
    return res.json({
        totalClicks : result.visitHistory.length, 
        analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}