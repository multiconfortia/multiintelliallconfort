const fs = require("fs");
const path = require("path");


function loadMCDDL(filePath){

    const absolutePath = path.resolve(filePath);

    const data = fs.readFileSync(
        absolutePath,
        "utf8"
    );

    const device = JSON.parse(data);

    return device;

}


module.exports = {
    loadMCDDL
};