const sqlite3 = require("sqlite3").verbose();

const config = require("./config");

const db = new sqlite3.Database(

    config.database.path,

    (err) => {

        if (err) {

            console.error(err);

            process.exit(1);

        }

        console.log("SQLite conectado");

    }

);

module.exports = db;