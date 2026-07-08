const express = require("express");

const router = express.Router();

const systemController = require("../controllers/systemController");


// Página principal

router.get("/", systemController.getSystem);


// Empresa

router.get("/empresa", (req, res) => {

    res.render("pages/empresa");

});


// Contacto

router.get("/contacto", (req, res) => {

    res.render("pages/contacto");

});


// Cotización

router.get("/cotizacion", (req, res) => {

    res.render("pages/cotizacion");

});


module.exports = router;