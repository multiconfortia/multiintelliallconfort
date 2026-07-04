const config = require("../config/config");

exports.getSystem = (req, res) => {

    res.json({

        success: true,

        system: config.app.name,

        version: "1.0.0",

        environment: config.app.env,

        status: "RUNNING",

        timestamp: new Date().toISOString()

    });

};