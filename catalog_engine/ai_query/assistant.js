// ======================================
// MULTICONFORT IA
// assistant.js
// Asistente HVACR
// ======================================

const { buscar } =
require("./search_engine");

const { recomendar } =
require("./recommendation");

const { generarRespuestaTecnica } =
require("./technical_answer");


function consultar(consulta){


    // =========================
    // PRIMERO: CONOCIMIENTO HVACR
    // =========================

    const respuestaTecnica =
        generarRespuestaTecnica(
            consulta
        );


    if(respuestaTecnica.encontrada){

        return {

            consulta,

            ...respuestaTecnica

        };

    }



    // =========================
    // SEGUNDO: BUSQUEDA PRODUCTOS
    // =========================

    const resultados =
        buscar(consulta);


    const recomendacion =
        recomendar(resultados);



    if(!recomendacion.encontrado){

        return {

            consulta,

            respuesta:
            "No encontré información relacionada.",

            resultados:[]

        };

    }



        return {

    consulta,

    respuesta:
        `Se encontraron ${recomendacion.total} coincidencias relacionadas con su consulta.`,

    recomendacion

};
}



module.exports = {

    consultar

};

// ======================================
// PRUEBA DIRECTA
// ======================================

if(require.main === module){

    const consulta =
        process.argv
        .slice(2)
        .join(" ");

    console.log(
        consultar(consulta)
    );

}