const db = require("../config/database");

module.exports = function () {

    db.serialize(() => {

        console.log("");

        console.log("✓ Base de datos inicializada");

        console.log("");

    });

};