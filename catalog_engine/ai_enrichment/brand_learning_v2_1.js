// ======================================
// MULTICONFORT IA
// APRENDIZAJE DE MARCAS HVACR V2.1
// MOTOR DE CONFIANZA
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
    "ai_brands_v2_1.json"
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
// LIMPIAR TEXTO
// ======================================

function limpiar(texto){

    return (texto || "")
    .toUpperCase()
    .trim();

}



// ======================================
// APRENDER MARCAS
// ======================================

function aprenderMarcas(){


const productos =
cargarCatalogo();


let marcas = {};



productos.forEach(producto=>{


    let candidatos=[];



    if(producto.marca){

        candidatos.push({

            nombre:
            limpiar(producto.marca),

            fuente:
            "marca"

        });

    }



    if(producto.descripcion){


        candidatos.push({

            nombre:
            limpiar(producto.descripcion),

            fuente:
            "descripcion"

        });


    }



    candidatos.forEach(item=>{


        const posibles =
        [
            "COPELAND",
            "EMERSON",
            "FULL GAUGE",
            "HONEYWELL",
            "CAREL",
            "DANFOSS",
            "SIKA",
            "KASON"
        ];



        posibles.forEach(marca=>{


            if(
                item.nombre.includes(marca)
            ){


                if(!marcas[marca]){


                    marcas[marca]={

                        apariciones:0,

                        fuentes:{

                            marca:0,

                            descripcion:0

                        }

                    };


                }



                marcas[marca].apariciones++;


                marcas[marca]
                .fuentes[item.fuente]++;


            }


        });



    });


});



// ======================================
// CALCULAR CONFIANZA
// ======================================

Object.keys(marcas)
.forEach(marca=>{


    let dato =
    marcas[marca];


    let confianza =
    (
        dato.fuentes.marca * 0.30
        +
        dato.fuentes.descripcion * 0.10
    );


    if(confianza>1)
        confianza=1;



    dato.confianza =
    Number(confianza.toFixed(2));



});



// ======================================
// GUARDAR
// ======================================

const salida={

metadata:{

motor:
"MULTICONFORT_IA_BRAND_LEARNING",

version:
"2.1",

fecha:
new Date().toISOString()

},


marcas

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
"APRENDIZAJE MARCAS V2.1"
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
Object.keys(marcas).length
);


console.log(
marcas
);



}




if(
require.main===module
){

    aprenderMarcas();

}


module.exports={

 aprenderMarcas

};