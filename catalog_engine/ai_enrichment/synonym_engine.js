// ======================================
// MULTICONFORT IA
// KNOWLEDGE CORE
// MOTOR DE SINÓNIMOS HVACR
// Version 1.0
// ======================================


const synonymDictionary =
require("./synonyms");



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