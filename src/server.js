const express = require("express");

const path = require("path");

const config = require("../config/config");

const logger = require("../config/logger");

// Rutas API
const systemRoute = require("../routes/system");

module.exports = function () {

    const app = express();

    // =========================
    // MIDDLEWARES
    // =========================
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // =========================
    // FRONTEND (PLATAFORMA)
    // =========================
    app.set("view engine", "ejs");

    app.set("views", path.join(__dirname, "../views"));

    app.use(express.static(path.join(__dirname, "../public")));

    // =========================
    // PLATAFORMA MULTICONFORT
    // =========================
    app.get("/", (req, res) => {

        res.render("pages/index", {
            title: "MULTICONFORT Plataforma"
        });

    });

    app.get("/empresa", (req, res) => {

        res.render("empresa");
    app.get("/plataforma", (req, res) => {
    res.render("pages/plataforma", {
        title: "Plataforma MULTICONFORT IA"
    });
});


app.get("/hvacr", (req, res) => {
    res.render("pages/hvacr", {
        title: "HVACR MULTICONFORT IA"
    });
});


app.get("/bms", (req, res) => {
    res.render("pages/bms", {
        title: "BMS Automatización"
    });
});


app.get("/iot", (req, res) => {
    res.render("pages/iot", {
        title: "IoT Industrial"
    });
});


app.get("/tienda", (req, res) => {
    res.render("pages/tienda", {
        title: "Tienda MULTICONFORT IA"
    });
});


app.get("/productos", (req, res) => {
    res.render("pages/productos", {
        title: "Productos MULTICONFORT IA"
    });
});


app.get("/embajadores", (req, res) => {
    res.render("pages/embajadores", {
        title: "Embajadores MULTICONFORT IA"
    });
});





    });

    app.get("/contacto", (req, res) => {

        res.render("contacto");

    });

    // =========================
    // API EXISTENTE (NO TOCAR)
    // =========================
    app.use("/system", systemRoute);

    // =========================
    // SERVER START
    // =========================
    app.listen(
        config.app.port,
        () => {

            logger.info(
                `Servidor HTTP iniciado en puerto ${config.app.port}`
            );

            logger.info("Plataforma MULTICONFORT activa");
        }
    );

};