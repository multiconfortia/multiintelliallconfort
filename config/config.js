require("dotenv").config();

module.exports = {

    app: {

        name: process.env.APP_NAME || "MULTICONFORT IA",

        port: parseInt(process.env.PORT, 10) || 3001,

        env: process.env.NODE_ENV || "development"

    },

    database: {

        path: process.env.DB_PATH || "./database/app.db"

    },

    admin: {

        number: process.env.ADMIN_NUMBER || null

    },

    ollama: {

        url: process.env.OLLAMA_URL || "http://localhost:11434",

        model: process.env.OLLAMA_MODEL || "llama3"

    },

    logs: {

        level: process.env.LOG_LEVEL || "info"

    }

};