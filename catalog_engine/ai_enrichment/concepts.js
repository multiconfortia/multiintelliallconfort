// ======================================
// MULTICONFORT IA
// CONCEPTOS HVACR
// BASE DE CONOCIMIENTO
// ======================================


module.exports = {


    // ===============================
    // REFRIGERANTES
    // ===============================

    R410A:{

        tipo:
        "refrigerante",

        familia:
        "refrigerantes",

        sinonimos:[

            "410A",
            "R-410A",
            "FREON 410A",
            "REFRIGERANTE 410A",
            "GAS 410A"

        ],

        conocimiento:{

            aceite:
            "POE"

        }

    },



    R404A:{

        tipo:
        "refrigerante",

        familia:
        "refrigerantes",

        sinonimos:[

            "404A",
            "R-404A",
            "FREON 404A",
            "REFRIGERANTE 404"

        ],

        conocimiento:{

            aceite:
            "POE"

        }

    },



    R32:{

        tipo:
        "refrigerante",

        familia:
        "refrigerantes",

        sinonimos:[

            "R32",
            "R-32"

        ]

    },



    // ===============================
    // COMPRESORES
    // ===============================

    SCROLL:{

        tipo:
        "compresor",

        tecnologia:
        "scroll",

        sinonimos:[

            "SCROLL",
            "COMPRESOR SCROLL"

        ]

    },



    INVERTER:{

        tipo:
        "tecnologia",

        sinonimos:[

            "INVERTER",
            "VARIABLE SPEED",
            "VELOCIDAD VARIABLE"

        ]

    }



};