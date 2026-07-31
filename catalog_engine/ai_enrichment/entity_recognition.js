// ======================================
// MULTICONFORT IA
// RECONOCIMIENTO DE ENTIDADES HVACR
// ======================================


const {
    normalizarTexto
}
=
require("./entity_dictionary");



const marcas = [
    "COPELAND",
    "CARRIER",
    "TRANE",
    "YORK",
    "DAIKIN",
    "DANFOSS",
    "CAREL",
    "HONEYWELL",
    "EMERSON",
    "SIEMENS",
    "SCHNEIDER",
    "JOHNSON"
];



const tecnologias = [
    "MODBUS",
    "BACNET",
    "MQTT",
    "VRF",
    "VRV",
    "CHILLER",
    "AHU",
    "UMA",
    "POE",
    "R410A",
    "R32",
    "R404A"
];



const equivalencias = {

    "POLIOLESTER":"POE",

    "POLYOL ESTER":"POE",

    "POLIOL ESTER":"POE",

    "R-404A":"R404A",

    "R 404 A":"R404A"

};



const tipos = [
    "COMPRESOR",
    "CONTROLADOR",
    "ACEITE",
    "REFRIGERANTE",
    "SENSOR",
    "TARJETA",
    "VALVULA",
    "FILTRO"
];





function reconocerEntidades(texto){


    texto =
        normalizarTexto(texto);




    // ==================================
    // NORMALIZACION DE TERMINOS TECNICOS
    // ==================================

    Object.keys(equivalencias).forEach(original=>{

        texto = texto.replace(
            original,
            equivalencias[original]
        );

    });




    let entidades = {

        marcas:[],
        tecnologias:[],
        tipos:[]

    };




    // ==================================
    // RECONOCIMIENTO DE MARCAS
    // ==================================

    marcas.forEach(marca=>{

        if(texto.includes(marca)){

            entidades.marcas.push(marca);

        }

    });





    // ==================================
    // RECONOCIMIENTO DE TECNOLOGIAS
    // ==================================

    tecnologias.forEach(item=>{

        if(texto.includes(item)){

            entidades.tecnologias.push(item);

        }

    });





    // ==================================
    // RECONOCIMIENTO DE TIPOS
    // ==================================

    tipos.forEach(tipo=>{

        if(texto.includes(tipo)){

            entidades.tipos.push(tipo);

        }

    });




    return entidades;


}





module.exports = {

    reconocerEntidades

};