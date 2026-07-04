const winston = require("winston");
const config = require("./config");

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
});

const logger = winston.createLogger({

    level: config.logs.level || "info",

    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        logFormat
    ),

    transports: [

        new winston.transports.Console({

            format: combine(
                colorize(),
                timestamp({
                    format: "HH:mm:ss"
                }),
                logFormat
            )

        }),

        new winston.transports.File({

            filename: "logs/system.log"

        }),

        new winston.transports.File({

            level: "error",

            filename: "logs/error.log"

        })

    ]

});

module.exports = logger;