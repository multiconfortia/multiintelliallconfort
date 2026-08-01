// ======================================
// MULTICONFORT IA
// MOTOR DE BUSQUEDA INTELIGENTE HVACR
// ======================================

const fs = require("fs");
const path = require("path");


// ======================================
// UBICACION BASE
// ======================================

const DATABASE =
    path.join(
        __dirname,
        "..",
        "database",
        "catalog_enriquecido.json"
    );



// ======================================
// CARGAR CATALOGO IA
// ======================================

function cargarCatalogo(){

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
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}



// ======================================
// CALCULAR RELEVANCIA
// ======================================

function calcularPuntaje(
    producto,
    busqueda
){

    let texto =
        limpiar(

            producto.descripcion +
            " " +
            producto.marca +
            " " +
            producto.familia +
            " " +
            producto.subfamilia

        );


    let puntaje = 0;

const refrigerantes = [
    "R22",
    "R404A",
    "R410A",
    "R134A",
    "R507",
    "R407C"
];


const consultaLimpia =
    limpiar(busqueda);


const refrigeranteSolicitado =
    refrigerantes.find(r =>
        consultaLimpia.includes(r)
    );


if(refrigeranteSolicitado){

    if(!texto.includes(refrigeranteSolicitado)){

        return 0;

    }

}


    const palabras =
        limpiar(busqueda)
        .split(" ");



    palabras.forEach(palabra=>{


        if(texto.includes(palabra)){

            puntaje += 10;

        }


        if(
            producto.entidades_ia
        ){

            const entidades =
                JSON.stringify(
                    producto.entidades_ia
                );


            if(
                limpiar(entidades)
                .includes(palabra)
            ){

                puntaje += 20;

            }

        }



        if(
            producto.atributos
        ){

            if(
                limpiar(
                    JSON.stringify(
                        producto.atributos
                    )
                )
                .includes(palabra)
            ){

                puntaje += 5;

            }

        }



    });


    return puntaje;

}



// ======================================
// BUSQUEDA PRINCIPAL
// ======================================


const { calcularRanking } =
require("./ranking");

const { reconocerEntidades } =
require("../ai_enrichment/entity_recognition");


function buscar(consulta){


    const productos =
        cargarCatalogo();


    const entidadesConsulta =
        reconocerEntidades(
            consulta
        );


    let resultados =
        [];



    productos.forEach(producto=>{


        const puntaje =
    calcularRanking(
        producto,
        consulta,
        entidadesConsulta
    );



        if(puntaje > 0){


            resultados.push({

    puntaje,

    id:
        producto.id,

    descripcion:
        producto.descripcion,

    marca:
        producto.marca,

    familia:
        producto.familia,

    subfamilia:
        producto.subfamilia || "",

    entidades:
        producto.entidades_ia || {},

    atributos:
        producto.atributos || {},

    conocimiento:
        producto.conocimiento_ia || {}

});


        }


    });



    resultados.sort(

        (a,b)=>
            b.puntaje - a.puntaje

    );



    return resultados;

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
        "BUSCADOR HVACR"
    );

    console.log(
        "================================="
    );



    const consulta =
        process.argv
        .slice(2)
        .join(" ");



    console.log(
        "\nBusqueda:",
        consulta
    );



    const resultados =
        buscar(
            consulta
        );



    console.log(
        "\nResultados:",
        resultados.length
    );



    console.log(
        JSON.stringify(
            resultados.slice(0,10),
            null,
            2
        )
    );


}



module.exports = {

    buscar

};


// agregar

function generarTextoBusqueda(producto){

    return [

        producto.descripcion,
        producto.marca,
        producto.familia,
        producto.subfamilia,

        JSON.stringify(producto.entidades_ia || {}),
        JSON.stringify(producto.atributos || {}),
        JSON.stringify(producto.conocimiento_ia || {})

    ]
    .join(" ")
    .toUpperCase();

}