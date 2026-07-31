// ======================================
// MULTICONFORT IA
// KNOWLEDGE ANSWER ENGINE
// CAPA DE RESPUESTA TECNICA HVACR
// ======================================


const fs = require("fs");
const path = require("path");



// ======================================
// BASE DE CONOCIMIENTO
// ======================================

const DATABASE = path.join(
    __dirname,
    "../database/catalog_enriquecido.json"
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
// NORMALIZAR TEXTO
// ======================================

function limpiar(texto){

    return (
        texto || ""
    )
    .toUpperCase()
    .replace(/-/g,"")
    .replace(/R404A/g,"404A")
    .replace(/R410A/g,"410A")
    .replace(/R134A/g,"134A")
    .trim();

}




// ======================================
// DETECTAR PREGUNTA TECNICA
// ======================================

function esPreguntaTecnica(texto){

    const palabras = [

        "QUE ACEITE",
        "USA",
        "UTILIZA",
        "COMPATIBLE",
        "RECOMENDADO",
        "APLICACION"

    ];


    return palabras.some(p =>

        texto.includes(p)

    );

}





// ======================================
// BUSCAR RELACIONES IA
// ======================================

function buscarRelacionTecnica(consulta){


    const catalogo =
        cargarCatalogo();


    let resultados = [];



    const palabrasClave = consulta
    .split(" ")
    .filter(p =>
        p.length > 3 &&
        ![
            "QUE",
            "USA",
            "UTILIZA",
            "PARA"
        ].includes(p)
    );



    catalogo.forEach(producto=>{


        const textoProducto =

        limpiar(

            producto.descripcion +
            " " +
            JSON.stringify(producto.sinonimos || []) +
            " " +
            JSON.stringify(producto.relaciones_ia || [])

        );



        if(

            palabrasClave.some(p =>
                textoProducto.includes(p)
            )

        ){



            if(producto.relaciones_ia){


                resultados.push({

                    producto:
                    producto.descripcion,


                    relaciones:
                    producto.relaciones_ia


                });


            }


        }



    });



    return resultados;


}





// ======================================
// GENERAR RESPUESTA HVACR
// ======================================

function responderTecnico(consulta){


    const texto =
        limpiar(consulta);



    if(
        !esPreguntaTecnica(texto)
    ){

        return null;

    }



    const relaciones =
        buscarRelacionTecnica(texto);



    if(
        relaciones.length === 0
    ){

        return null;

    }



    let aceites = [];



    relaciones.forEach(r=>{


        r.relaciones.forEach(rel=>{


            if(
                rel.tipo ===
                "aceite_recomendado"
            ){


                aceites.push(
                    rel.relacion
                );


            }


        });


    });





    // eliminar duplicados

    aceites =
    [...new Set(aceites)];




    if(
        aceites.length
    ){


        return {


            tipo:
            "respuesta_tecnica",


            respuesta:

            "El refrigerante consultado utiliza aceite " +

            aceites.join(", ") +

            ".",



            aceites:
            aceites,


            origen:
            "MULTICONFORT_IA_KNOWLEDGE"

        };


    }



    return null;


}





module.exports = {

    responderTecnico,
    buscarRelacionTecnica

};