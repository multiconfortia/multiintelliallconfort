// ======================================
// MULTICONFORT IA
// ENRIQUECIMIENTO TECNICO V2
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
        "technical_catalog_intelligent.json"
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
// ENRIQUECER
// ======================================

function enriquecer(){


    const productos =
        cargarCatalogo();


    let enriquecidos = 0;
    let sinConocimiento = 0;



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


                enriquecidos++;


                return {

                    ...producto,


                    conocimiento_tecnico:{

                        ...conocimiento,


                        inteligencia:{

                            motor:
                            "MULTICONFORT_IA_TECHNICAL_ENRICHMENT",

                            version:
                            "2.0",

                            confianza:
                            0.95

                        }

                    }

                };


            }


            else{


                sinConocimiento++;


                return producto;


            }



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
        "ENRIQUECIMIENTO TECNICO V2"
    );

    console.log(
        "================================="
    );


    console.log(
        "Productos analizados:",
        productos.length
    );


    console.log(
        "Con conocimiento:",
        enriquecidos
    );


    console.log(
        "Sin conocimiento:",
        sinConocimiento
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