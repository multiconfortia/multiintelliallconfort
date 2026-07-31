// ======================================
// MULTICONFORT IA
// MOTOR DE CONOCIMIENTO HVACR
// ======================================


const fs = require("fs");
const path = require("path");


// ======================================
// RUTA BASE CONOCIMIENTO
// ======================================

const DATABASE =
    path.join(
        __dirname,
        "..",
        "database",
        "technical_knowledge.json"
    );



// ======================================
// CARGAR CONOCIMIENTO
// ======================================

function cargarConocimiento(){

    return JSON.parse(
        fs.readFileSync(
            DATABASE,
            "utf8"
        )
    );

}



// ======================================
// NORMALIZAR TEXTO
// ======================================

function limpiar(texto){

    return (texto || "")
        .toString()
        .toUpperCase()
        .trim();

}



// ======================================
// BUSCAR REFRIGERANTE
// ======================================

function buscarRefrigerante(nombre){

    const conocimiento =
        cargarConocimiento();


    const clave =
        limpiar(nombre);


    return (
        conocimiento.refrigerantes[clave]
        ||
        null
    );

}



// ======================================
// BUSCAR ACEITE
// ======================================

function buscarAceite(nombre){

    const conocimiento =
        cargarConocimiento();


    const clave =
        limpiar(nombre);


    return (
        conocimiento.aceites[clave]
        ||
        null
    );

}



// ======================================
// BUSQUEDA GENERAL
// ======================================

function consultarHVACR(texto){


    const entrada =
        limpiar(texto);



    const conocimiento =
        cargarConocimiento();



    let resultado = {};



    // Refrigerantes

    Object.keys(
        conocimiento.refrigerantes
    )
    .forEach(item=>{

        if(
            entrada.includes(item)
        ){

            resultado.refrigerante =
                conocimiento
                .refrigerantes[item];

        }

    });



    // Aceites

    Object.keys(
        conocimiento.aceites
    )
    .forEach(item=>{

        if(
            entrada.includes(item)
        ){

            resultado.aceite =
                conocimiento
                .aceites[item];

        }

    });



    return resultado;

}



// ======================================
// PRUEBA DIRECTA
// ======================================

if(
    require.main === module
){


    console.log(
        "================================="
    );

    console.log(
        "MULTICONFORT IA"
    );

    console.log(
        "MOTOR CONOCIMIENTO HVACR"
    );

    console.log(
        "================================="
    );


    let consulta =
        process.argv
        .slice(2)
        .join(" ");



    console.log(
        "Consulta:",
        consulta
    );



    console.log(
        JSON.stringify(
            consultarHVACR(consulta),
            null,
            2
        )
    );


}



// ======================================
// EXPORTAR
// ======================================

module.exports = {

    buscarRefrigerante,

    buscarAceite,

    consultarHVACR

};