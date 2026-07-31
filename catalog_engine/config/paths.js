const path = require("path");

// __dirname = catalog_engine/config

const ROOT = path.join(__dirname, "..");

module.exports = {

    ROOT,

    DATABASE: path.join(ROOT, "database"),

    AI: path.join(ROOT, "ai_enrichment"),

    VALIDATOR: path.join(ROOT, "validator")

};