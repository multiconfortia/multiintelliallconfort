// ======================================
// MULTICONFORT IA
// KNOWLEDGE CORE
// MOTOR DE SINÓNIMOS HVACR
// Version 1.0
// ======================================


const synonymDictionary = {


    // ===============================
    // ACEITES
    // ===============================

    "POE": [
        "POLYOL ESTER",
        "POLYOL ESTER OIL",
        "ACEITE POE",
        "ACEITE POLYOL ESTER",
        "LUBRICANTE POE"
    ],


    "MINERAL": [
        "ACEITE MINERAL",
        "MINERAL OIL",
        "LUBRICANTE MINERAL"
    ],



// ===============================
// SOLDADURA HVACR
// ===============================

"BRAZING":[
    "SOLDADURA PLATA",
    "SOLDADURA DE PLATA",
    "SILVER BRAZING",
    "BRAZING ROD",
    "VARILLA DE PLATA",
    "ALEACION DE PLATA",
    "SILVER ALLOY"
],





    // ===============================
    // REFRIGERANTES
    // ===============================

    "R404A":[
        "404A",
        "R-404A",
        "REFRIGERANTE 404"
    ],


    "R410A":[
        "410A",
        "R-410A"
    ],


    "R32":[
        "R-32",
        "REFRIGERANTE R32"
    ],



    // ===============================
    // COMPRESORES
    // ===============================

    "SCROLL":[
        "SCROLL COMPRESSOR",
        "COMPRESOR SCROLL"
    ],


    "RECIPROCANTE":[
        "PISTON",
        "PISTÓN",
        "RECIPROCATING"
    ],



    // ===============================
    // TECNOLOGIA
    // ===============================

    "INVERTER":[
        "VARIABLE SPEED",
        "VELOCIDAD VARIABLE",
        "FRECUENCIA VARIABLE"
    ],



    // ===============================
    // CONTROL
    // ===============================

    "TERMOSTATO":[
        "CONTROL DE TEMPERATURA",
        "TEMPERATURE CONTROLLER"
    ],



    // ===============================
    // COMUNICACION
    // ===============================

    "MODBUS":[
        "MODBUS RTU",
        "RS485 MODBUS"
    ],


    "BACNET":[
        "BACNET IP",
        "BACNET MS/TP"
    ]


};



// ======================================
// BUSQUEDA DE SINONIMOS
// ======================================


function detectarSinonimos(
    descripcion
){


    const texto =
    (descripcion || "")
    .toUpperCase();



    let encontrados = [];



    for(
        const concepto in synonymDictionary
    ){


        const sinonimos =
        synonymDictionary[concepto];


        for(
            const palabra of sinonimos
        ){


            if(
                texto.includes(
                    palabra
                )
            ){


                encontrados.push({

                    concepto:concepto,

                    encontrado:palabra

                });


            }

        }


    }



    return {


        sinonimos:encontrados,


        metadata:{


            motor:
            "MULTICONFORT_IA_SYNONYM_ENGINE",


            version:
            "1.0",


            confianza:
            0.90


        }


    };


}



module.exports = {


    detectarSinonimos,


    synonymDictionary


};