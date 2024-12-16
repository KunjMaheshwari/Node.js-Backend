const express = require("express");
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require("./connect");
const URL = require("./models/url");
const path = require("path");

const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

const userRoute = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

connectToMongoDB('mongodb://localhost:27017/short-url').then(() =>{
    console.log("MongoDB Connected!");
})

app.use("/", staticRoute);
app.use("/user", userRoute);

// app.get('/test', async(req, res) =>{ // server side rendering means displaying html content on the web page.
//     const allUrl = await URL.find({});
//     return res.render("home", {
//         urls: allUrl,
//     });
// })



app.use("/url", urlRoute);

app.get("/url/:shortId", async(req, res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitedHistory:{
            timestamp: Date.now(),
        }
    }})
    res.redirect(entry.redirectURL)
});

app.listen(PORT, () =>{
    console.log(`Server started at PORT ${PORT}`);
})