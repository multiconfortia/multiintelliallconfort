// ======================================
// MULTICONFORT IA
// TECHNICAL ANSWER ENGINE
// CAPA SUPERIOR RESPUESTA HVACR
// ======================================


const {
    responderTecnico
} = require("./knowledge_answer");



// ======================================
// GENERAR RESPUESTA TÉCNICA
// ======================================

function generarRespuestaTecnica(consulta){


    const respuesta =

        responderTecnico(
            consulta
        );


    if(respuesta){


        return {

            encontrada:true,

            tipo:
            "respuesta_tecnica",


            datos:
            respuesta

        };


    }



    return {

        encontrada:false

    };


}



// ======================================
// EXPORTAR
// ======================================

module.exports = {

    generarRespuestaTecnica

};