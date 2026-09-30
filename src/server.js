const express = require("express");

const path = require("path");

const config = require("../config/config");

const logger = require("../config/logger");

// Rutas API

const publicacionesRoute = require("../routes/publicaciones");

const systemRoute = require("../routes/system");

const assistant =
require("../catalog_engine/ai_query/assistant");
const { resolverPublico } = require("../seo_comercial/public_gate/resolver_publico");




// se agrega para tren
const railsenseRoute = require("../routes/railsense");

module.exports = function () {

    const app = express();

    // =========================
    // MIDDLEWARES
    // =========================
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


// =========================
// API MULTICONFORT IA
// =========================

app.post("/api/consulta",(req,res)=>{
    const consulta = req.body.consulta;
    const resultado = resolverPublico(consulta);
    if (!resultado.permitido) {
        return res.status(403).json(resultado);
    }
    if (!resultado.solucion) {
        return res.status(404).json(resultado);
    }
    return res.json(resultado);
});
    



    // =========================
    // FRONTEND (PLATAFORMA)
    // =========================
    app.set("view engine", "ejs");

    app.set("views", path.join(__dirname, "../views"));

    app.use(express.static(path.join(__dirname, "../public")));

    // =========================
    // PLATAFORMA MULTICONFORT
    // =========================
    // =========================
// PLATAFORMA MULTICONFORT
// =========================

app.get("/", (req, res) => {

    res.render("pages/index", {
        title: "MULTICONFORT Plataforma"
    });

});


app.get("/empresa", (req, res) => {

    res.render("pages/empresa", {
        title: "Empresa MULTICONFORT IA"
    });

});


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


app.get("/solucion/:vocablo", (req, res) => {
    const resultado = resolverPublico(req.params.vocablo);
    const { obtenerRelaciones } = require("../seo_comercial/public_gate/relaciones_publicas");
    const relaciones = resultado.solucion ? obtenerRelaciones(resultado.solucion, 10) : [];
    if (!resultado.permitido || !resultado.solucion) return res.status(404).send("Solución no disponible");
    return res.render("pages/producto_publico", {
        title: resultado.solucion.titulo,
        solucion: resultado.solucion,
        relaciones
    });
});

app.get("/soluciones", (req, res) => {

    res.render("pages/soluciones", {
        title: "Soluciones MULTICONFORT IA"
    });

});


app.get("/tecnologia", (req, res) => {

    res.render("pages/tecnologia", {
        title: "Tecnología MULTICONFORT IA"
    });

});


app.get("/embajadores", (req, res) => {

    res.render("pages/embajadores", {
        title: "Embajadores MULTICONFORT IA"
    });

});


app.get("/contacto", (req, res) => {

    res.render("pages/contacto", {
        title: "Contacto MULTICONFORT IA"
    });

});


app.get("/cotizacion", (req, res) => {

    res.render("pages/cotizacion", {
        title: "Solicitar Cotización MULTICONFORT IA"
    });
});   // <-- ESTE faltaba

app.post("/cotizacion", (req, res) => {

    const {
        nombre,
        telefono,
        correo,
        mensaje
    } = req.body;


    console.log("================================");
    console.log("NUEVA SOLICITUD DE COTIZACIÓN");
    console.log("================================");

    console.log("Nombre:", nombre);
    console.log("Teléfono:", telefono);
    console.log("Correo:", correo);
    console.log("Mensaje:", mensaje);


    res.send(`
    
    <html>
    <head>
        <title>Solicitud recibida</title>
    </head>

    <body style="font-family:Arial;text-align:center;padding:50px">

        <h1>Gracias ${nombre}</h1>

        <p>
        Hemos recibido tu solicitud de cotización.
        </p>

        <p>
        El equipo MULTICONFORT IA se pondrá en contacto contigo.
        </p>

        <br>

        <a href="/">
        Regresar a MULTICONFORT IA
        </a>

    </body>
    </html>

    `);

});




    // =========================
    // API EXISTENTE (NO TOCAR)
    // =========================
    // =========================
    // API EXISTENTE
    // =========================
    app.use("/system", systemRoute);


    // =========================
    // PUBLICACIONES MULTICONFORT
    // =========================

    app.use("/knowhow", publicacionesRoute);


    // =========================
    // MULTICONFORT RAILSENSE
    // =========================
    app.use("/railsense", railsenseRoute);

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