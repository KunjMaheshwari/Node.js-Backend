const fs = require("fs");

function logReqRes(fileName){
    return (req, res, next) =>{
        fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path}`,
        (err, data) => {
            next();
        }
    );
    }
}

module.exports = {
    logReqRes
}