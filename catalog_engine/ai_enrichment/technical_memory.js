// ======================================
// MULTICONFORT IA
// MEMORIA TECNICA DE PRODUCTOS HVACR V1
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
    "technical_memory.json"
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
    .normalize("NFD")
    .replace(
        /[\u0300-\u036f]/g,
        ""
    );

}



// ======================================
// ANALISIS TECNICO
// ======================================

function analizarProducto(producto){


    const texto =
    limpiar(

        producto.descripcion +
        " " +
        producto.familia +
        " " +
        producto.subfamilia

    );



    let memoria={


        id:
        producto.id,


        descripcion:
        producto.descripcion,


        marca:
        producto.marca || "",


        familia:
        producto.familia || "",


        subfamilia:
        producto.subfamilia || "",



        entidades:{


            tipos:[],


            tecnologias:[],


            refrigerantes:[]

        }


    };



    const tipos=[

        "COMPRESOR",
        "CONTROLADOR",
        "ACEITE",
        "SENSOR",
        "VALVULA",
        "FILTRO",
        "TARJETA"

    ];



    tipos.forEach(tipo=>{


        if(texto.includes(tipo)){

            memoria.entidades.tipos.push(tipo);

        }


    });




    const tecnologias=[


        "POE",
        "MODBUS",
        "BACNET",
        "VRF",
        "VRV",
        "CHILLER",
        "AHU",
        "UMA"


    ];



    tecnologias.forEach(item=>{


        if(texto.includes(item)){

            memoria.entidades.tecnologias.push(item);

        }


    });




    const refrigerantes=[


        "R410A",
        "R404A",
        "R134A",
        "R407C",
        "R32"


    ];



    refrigerantes.forEach(ref=>{


        if(texto.includes(ref)){

            memoria.entidades.refrigerantes.push(ref);

        }


    });



    return memoria;

}




// ======================================
// GENERAR MEMORIA
// ======================================

function generarMemoria(){


const productos =
cargarCatalogo();


const memoria =
productos.map(
    analizarProducto
);



const salida={


metadata:{


motor:
"MULTICONFORT_IA_TECHNICAL_MEMORY",


version:
"1.0",


fecha:
new Date().toISOString()


},



productos:memoria


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
"MEMORIA TECNICA HVACR"
);


console.log(
"================================="
);


console.log(
"Productos analizados:",
productos.length
);


console.log(
"Memoria generada:",
memoria.length
);



}



if(
require.main===module
){

generarMemoria();

}



module.exports={

generarMemoria

};