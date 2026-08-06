// ======================================
// MULTICONFORT IA
// CONCEPT BRIDGE
// PUENTE CONCEPTO + CONOCIMIENTO + PRODUCTOS
// ======================================


const {
    detectarConcepto
} = require("../ai_enrichment/concept_engine");


const {
    buscar
} = require("./search_engine");


const {
    generarRespuesta
} = require("./response_generator");




// ======================================
// CONSULTA INTELIGENTE
// ======================================

function consultarConcepto(
    consulta
){


    // ==========================
    // 1. IDENTIFICAR CONCEPTO
    // ==========================

    const conceptos =
        detectarConcepto(
            consulta
        );



    // ==========================
    // 2. BUSCAR PRODUCTOS
    // ==========================

    const productos =
        buscar(
            consulta
        );




    // ==========================
    // 3. RESPUESTA UNIFICADA
    // ==========================

    const datos = {

    consulta,

    conceptos,

    productos

};


return {

    ...datos,

    respuesta:
    generarRespuesta(datos)

};


}

module.exports = {

    consultarConcepto

};




// ======================================
// PRUEBA DIRECTA
// ======================================

if(
    require.main === module
){

    console.log(

        JSON.stringify(

            consultarConcepto(
                "Freon 410A"
            ),

            null,

            2

        )

    );

}