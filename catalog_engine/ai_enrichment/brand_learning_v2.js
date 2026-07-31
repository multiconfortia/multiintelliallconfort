// ======================================
// MULTICONFORT IA
// APRENDIZAJE AVANZADO DE MARCAS HVACR
// VERSION 2.0
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
        "ai_brands_v2.json"
    );


// ======================================
// MARCAS HVAC CONOCIDAS
// ======================================

const marcasBase = [

    "COPELAND",
    "CARRIER",
    "TRANE",
    "YORK",
    "DAIKIN",
    "DANFOSS",
    "CAREL",
    "HONEYWELL",
    "EMERSON",
    "SIEMENS",
    "SCHNEIDER",
    "JOHNSON",
    "FULL GAUGE",
    "SIKA",
    "KASON"

];


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
// APRENDIZAJE
// ======================================

function aprenderMarcas(){


    const productos =
        cargarCatalogo();


    let aprendizaje = {};



    productos.forEach(producto=>{


        const texto = limpiar(

            producto.marca +
            " " +
            producto.fabricante +
            " " +
            producto.descripcion +
            " " +
            producto.modelo +
            " " +
            producto.codigo_proveedor

        );



        marcasBase.forEach(marca=>{


            if(
                texto.includes(
                    limpiar(marca)
                )
            ){


                if(!aprendizaje[marca]){

                    aprendizaje[marca]={
                        apariciones:0,
                        fuentes:[]
                    };

                }


                aprendizaje[marca].apariciones++;



                if(
                    producto.marca &&
                    limpiar(producto.marca)
                    .includes(
                        limpiar(marca)
                    )
                ){

                    aprendizaje[marca]
                    .fuentes
                    .push("marca");

                }


                if(
                    producto.descripcion &&
                    limpiar(producto.descripcion)
                    .includes(
                        limpiar(marca)
                    )
                ){

                    aprendizaje[marca]
                    .fuentes
                    .push("descripcion");

                }


            }


        });


    });



    const salida = {

        metadata:{

            motor:
            "MULTICONFORT_IA_BRAND_LEARNING",

            version:
            "2.0",

            fecha:
            new Date().toISOString()

        },


        marcas:
        aprendizaje


    };



    fs.writeFileSync(

        OUTPUT,

        JSON.stringify(
            salida,
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
        "APRENDIZAJE DE MARCAS V2"
    );

    console.log(
        "================================="
    );


    console.log(
        "Productos analizados:",
        productos.length
    );


    console.log(
        "Marcas detectadas:",
        Object.keys(aprendizaje).length
    );


    console.log(
        aprendizaje
    );


}



if(
    require.main === module
){

    aprenderMarcas();

}



module.exports = {

    aprenderMarcas

};