const express = require("express");

const router = express.Router();


router.get("/", (req, res) => {

    res.render("pages/railsense", {
        title: "MULTICONFORT RailSense EDGE"
    });

});


module.exports = router;