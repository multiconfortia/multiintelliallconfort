const express = require("express");

const logger = require("../config/logger");

const config = require("../config/config");

module.exports = function(){

    const app = express();

    app.use(express.json());

    app.get("/",(req,res)=>{

        res.send({

            sistema:"MULTICONFORT-AI",

            version:"1.0.0",

            estado:"OK"

        });

    });

    app.listen(

        config.app.port,

        ()=>{

            logger.info(

                `Servidor iniciado en puerto ${config.app.port}`

            );

        }

    );

};