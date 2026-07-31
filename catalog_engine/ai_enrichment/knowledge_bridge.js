// ======================================
// MULTICONFORT IA
// PUENTE CATALOGO - CONOCIMIENTO HVACR
// ======================================


const fs = require("fs");
const path = require("path");

const {
    normalizarTexto
} = require("./entity_dictionary");


// ======================================
// RUTAS
// ======================================


const KNOWLEDGE =
    path.join(
        __dirname,
        "..",
        "database",
        "technical_knowledge.json"
    );


// ======================================
// CARGAR CONOCIMIENTO
// ======================================

function cargarKnowledge(){

    return JSON.parse(
        fs.readFileSync(
            KNOWLEDGE,
            "utf8"
        )
    );

}


// ======================================
// BUSCAR CONOCIMIENTO
// ======================================

function buscarConocimiento(producto){

    const knowledge =
        cargarKnowledge();


    let texto =
        normalizarTexto(
            JSON.stringify(producto)
        );


    console.log("TEXTO ANALIZADO:");
    console.log(texto);


    let resultado = {};

function normalizarRefrigerante(valor){

    return [
        valor,
        valor.replace(/^R/,""),
        valor.replace(/^R/,"R-")
    ];

}


    // ======================================
    // REFRIGERANTES
    // ======================================

    // ======================================
// REFRIGERANTES
// ======================================

if(knowledge.refrigerantes){

    Object.keys(
        knowledge.refrigerantes
    )
    .forEach(item=>{


        const variantes =
            normalizarRefrigerante(item);


        const encontrado =
            variantes.some(v =>
                texto.includes(v)
            );


        if(encontrado){

            resultado.refrigerante =
                knowledge.refrigerantes[item];

        }


    });

}



    // ======================================
    // ACEITES
    // ======================================

    if(knowledge.aceites){

        Object.keys(
            knowledge.aceites
        )
        .forEach(item=>{


            const patron =
                new RegExp(
                    "\\b" + item + "\\b",
                    "i"
                );


            if(
                patron.test(texto)
            ){

                resultado.aceite =
                    knowledge.aceites[item];

            }


        });

    }



    delete resultado.inteligencia;


    return resultado;

}
// ===============================
// REFRIGERANTES
// ===============================

// ======================================
// REFRIGERANTES
// ======================================



// ======================================
// PRUEBA
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
"PUENTE CONOCIMIENTO HVACR"
);

console.log(
"================================="
);



let producto = {

 descripcion:
 "REFRIGERANTE 404A 10.89KG",

 marca:
 ""
};



console.log(
JSON.stringify(
buscarConocimiento(producto),
null,
2
)
);


}



module.exports = {

 buscarConocimiento

};