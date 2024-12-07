const express = require("express");
const fs = require("fs");

const {connectMongoDB} = require("./connection"); 

const userRouter = require('./routes/user');

const {logReqRes} = require("./middlewares");

// import the data from MOCK_DATA.json file 
// const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Connection
// mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
//     .then(() => console.log("MongoDB Connected."))
//     .catch(err => console.log("Mongo Error", err));

connectMongoDB();


app.use(express.urlencoded({ extended: false })); // middleware and this is a built in middleware.
//this middleware basically converts all the data that we are getting from frontend to Objects.

// app.use((req, res, next) =>{ // next is the reference of the next middleware in our application.
//     console.log("Hello from Middleware M1");
//     // return res.json({msg : "Hello From Middleware M1"});
//     // req.myUserName = "kunjmaheshwari.dev";
//     next();
// })

// app.use((req, res, next) =>{ // Middleware 2
//     console.log("Hello from Middleware M2");
//     // return res.end("Hey");
//     next();
// })

// app.use((res, req, next) => {
//     fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path}`,
//         (err, data) => {
//             next();
//         }
//     );
// });

app.use(logReqRes("log.txt"));

app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})