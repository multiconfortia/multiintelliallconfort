// ======================================
// MULTICONFORT IA
// ENRIQUECIMIENTO TECNICO DE PRODUCTOS
// ======================================


const fs = require("fs");
const path = require("path");

const {
    buscarConocimiento
} = require("./knowledge_bridge");


// ======================================
// RUTAS
// ======================================


const INPUT =
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
        "technical_catalog_preview.json"
    );



// ======================================
// CARGAR CATALOGO
// ======================================

function cargarCatalogo(){

    return JSON.parse(
        fs.readFileSync(
            INPUT,
            "utf8"
        )
    );

}



// ======================================
// ENRIQUECER PRODUCTOS
// ======================================

function enriquecer(){


    const productos =
        cargarCatalogo();


    let contador = 0;



    const resultado =
        productos.map(producto=>{


            const conocimiento =
                buscarConocimiento(
                    producto
                );


            if(
                Object.keys(conocimiento)
                .length > 0
            ){

                contador++;

            }


            return {

                ...producto,


                conocimiento_tecnico:
                    conocimiento

            };


        });



    fs.writeFileSync(

        OUTPUT,

        JSON.stringify(
            resultado,
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
        "ENRIQUECIMIENTO TECNICO"
    );

    console.log(
        "================================="
    );


    console.log(
        "Productos analizados:",
        productos.length
    );


    console.log(
        "Productos enriquecidos:",
        contador
    );


    console.log(
        "Archivo generado:"
    );


    console.log(
        OUTPUT
    );


}



// ======================================
// EJECUCION
// ======================================

if(
    require.main === module
){

    enriquecer();

}



module.exports = {

    enriquecer

};