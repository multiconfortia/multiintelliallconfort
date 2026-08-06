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


// =========================
// BUSQUEDA PRODUCTOS
// =========================

const resultados =
    buscar(consulta);


const recomendacion =
    recomendar(resultados);



// =========================
// RESPUESTA COMBINADA
// =========================

return {

    consulta,


    respuestaTecnica:
        respuestaTecnica.encontrada
        ? respuestaTecnica
        : null,


    recomendacion:
        recomendacion.encontrado
        ? recomendacion
        : null,


    resumen:

        recomendacion.encontrado

        ?

        `Se encontraron ${recomendacion.total} coincidencias relacionadas con su consulta.`

        :

        respuestaTecnica.encontrada

        ?

        "Se encontró información técnica relacionada."

        :

        "No encontré información relacionada."

};

}


    // =========================
    // SEGUNDO: BUSQUEDA PRODUCTOS
    // =========================

   


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