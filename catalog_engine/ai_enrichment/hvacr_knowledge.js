// ======================================
// MULTICONFORT IA
// HVACR KNOWLEDGE CORE
// BASE DE CONOCIMIENTO TÉCNICO
// ======================================


const hvacrKnowledge = {


    // ===============================
    // REFRIGERANTES
    // ===============================

    "R410A": {

        tipo:
        "Refrigerante",

        familia:
        "Refrigerantes",

        propiedades:[
            "HFC",
            "ALTA PRESION"
        ],


        usa_aceite:[
            "POE"
        ],


        aplicaciones:[
            "Aire acondicionado",
            "Bombas de calor"
        ]

    },



    // ===============================
    // ACEITES
    // ===============================

    "POE": {

        tipo:
        "Aceite refrigeracion",


        nombre_tecnico:
        "Polyol Ester",


        compatible_con:[
            "R410A",
            "R404A",
            "R134A"
        ]

    },



    // ===============================
    // SOLDADURA
    // ===============================

    "BRAZING": {


        tipo:
        "Soldadura fuerte",


        sinonimos:[
            "SOLDADURA PLATA",
            "SILVER BRAZING",
            "SOLDADURA DURA"
        ],


        aplicacion:[
            "Tubería cobre HVACR",
            "Refrigeración"
        ]


    }


};



module.exports = {

    hvacrKnowledge

};