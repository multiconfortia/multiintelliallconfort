// ======================================
// MULTICONFORT IA
// APRENDIZAJE AUTOMATICO DE MARCAS HVACR
// ======================================

const fs = require("fs");
const path = require("path");


// ======================================
// RUTAS
// ======================================

const DATABASE =
    path.join(
        __dirname,
        "..",
        "database",
        "catalog_ia.json"
    );


const OUTPUT =
    path.join(
        __dirname,
        "..",
        "database",
        "ai_dictionary.json"
    );



// ======================================
// CARGAR CATALOGO
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
// NORMALIZAR
// ======================================

function limpiar(texto){

    return (texto || "")
        .toString()
        .toUpperCase()
        .trim();

}



// ======================================
// APRENDER MARCAS
// ======================================

function aprenderMarcas(){


    const productos =
        cargarCatalogo();


    let marcas = [];



    productos.forEach(producto=>{


        if(
            producto.marca &&
            producto.marca.trim() !== ""
        ){

            marcas.push(
                limpiar(
                    producto.marca
                )
            );

        }


    });



    // eliminar duplicados

    marcas =
        [...new Set(marcas)];



    marcas.sort();



    const diccionario = {

        metadata:{

            motor:
            "MULTICONFORT_IA_BRAND_LEARNING",

            version:
            "1.0",

            fecha:
            new Date().toISOString()

        },


        marcas

    };



    fs.writeFileSync(

        OUTPUT,

        JSON.stringify(
            diccionario,
            null,
            2
        ),

        "utf8"

    );



    console.log(
        "================================="
    );

    console.log(
        "MULTICONFORT IA"
    );

    console.log(
        "APRENDIZAJE DE MARCAS"
    );

    console.log(
        "================================="
    );


    console.log(
        "Productos analizados:",
        productos.length
    );


    console.log(
        "Marcas aprendidas:",
        marcas.length
    );


    console.log(
        marcas
    );


}



// ======================================
// EJECUCION DIRECTA
// ======================================

if(
    require.main === module
){

    aprenderMarcas();

}



module.exports = {

    aprenderMarcas

};