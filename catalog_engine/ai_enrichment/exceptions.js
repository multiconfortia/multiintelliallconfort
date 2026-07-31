// ======================================
// MULTICONFORT IA
// EXCEPCIONES DE CATÁLOGO
// ======================================


const excepciones = {


    "HER-UNI-NOR-B6271(PIEZA)": {

        categoria:"Accesorios HVAC",
        familia:"Herrajes",
        subfamilia:"Abrazaderas"

    },


    "HER-UNI-NOR-B6449(PIEZA)": {

        categoria:"Accesorios HVAC",
        familia:"Herrajes",
        subfamilia:"Clips y fijaciones"

    },


    "HER-TAN-BAR-CB1000": {

        categoria:"Herramientas HVAC",
        familia:"Carga de refrigerante",
        subfamilia:"Tanques y cilindros"

    },


    "HER-TAN-GRBP001": {

        categoria:"Herramientas HVAC",
        familia:"Carga de refrigerante",
        subfamilia:"Tanques y cilindros"

    },


    "HER-TER-EME-SP160008": {

        categoria:"Instrumentación",
        familia:"Medición",
        subfamilia:"Termómetros"

    },


    "HER-TER-TAY-6065": {

        categoria:"Instrumentación",
        familia:"Medición",
        subfamilia:"Termómetros"

    },


    "HER-MNG-RIT-JGO19020": {

        categoria:"Herramientas HVAC",
        familia:"Mangueras",
        subfamilia:"Accesorios y repuestos"

    },


    "HER-SOL-FLE-FUNDENTE200": {

        categoria:"Consumibles",
        familia:"Soldadura",
        subfamilia:"Fundentes"

    },


    "CNT-FUL-GB01C": {

        categoria:"Instrumentación y Control",
        familia:"Accesorios de control",
        subfamilia:"Protecciones y guardas"

    },


    "CNT-FUL-TC900E POWER": {

        categoria:"Instrumentación y Control",
        familia:"Controladores electrónicos",
        subfamilia:"Control temperatura"

    },


    "CNT-FUL-GB01S": {

        categoria:"Instrumentación y Control",
        familia:"Accesorios de control",
        subfamilia:"Cajas de instalación"

    }


};


function clasificarExcepcion(codigo){

    return excepciones[codigo] || null;

}


module.exports = {
    clasificarExcepcion
};