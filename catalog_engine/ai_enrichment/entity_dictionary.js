// ======================================
// MULTICONFORT IA
// DICCIONARIO NORMALIZACION HVACR
// ======================================


const equivalencias = {


    // ==========================
    // ACEITES
    // ==========================

    "POLIOLESTER": "POE",
    "POLYOL ESTER": "POE",
    "POLIOL ESTER": "POE",
    "ACEITE POLIESTER": "POE",

    "ALQUILBENCENO": "AB",
    "ALKYLBENZENE": "AB",


    // ==========================
    // EQUIPOS HVAC
    // ==========================

    "UNIDAD MANEJADORA DE AIRE": "UMA",
    "UNIDAD MANEJADORA": "UMA",
    "AIR HANDLING UNIT": "AHU",
    "MANEJADORA DE AIRE": "UMA",

    "UNIDAD CONDENSADORA": "CONDENSADORA",

    "UNIDAD EVAPORADORA": "EVAPORADORA",


    // ==========================
    // CONTROL
    // ==========================

    "CONTROL DIGITAL": "CONTROLADOR",
    "CONTROL ELECTRONICO": "CONTROLADOR",
    "CONTROL ELECTRÓNICO": "CONTROLADOR",
    "CONTROLADOR DIGITAL": "CONTROLADOR",


    // ==========================
    // PROTOCOLOS
    // ==========================

    "MODBUS TCP": "MODBUS",
    "MODBUS RTU": "MODBUS",
    "BAC NET/IP": "BACNET",
    "BAC NET": "BACNET",


    // ==========================
    // COMPONENTES
    // ==========================

    "TARJETA ELECTRONICA": "PCB",
    "TARJETA ELECTRÓNICA": "PCB",
    "BOARD": "PCB"


};



function normalizarTexto(texto){


    let resultado =
        (texto || "")
        .toUpperCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );


    Object.keys(equivalencias)
    .forEach(original=>{


        resultado =
            resultado.replace(
                new RegExp(original,"g"),
                equivalencias[original]
            );


    });


    return resultado;

}



module.exports = {

    equivalencias,

    normalizarTexto

};