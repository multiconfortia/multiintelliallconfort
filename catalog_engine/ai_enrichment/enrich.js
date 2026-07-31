// ======================================
// MULTICONFORT IA
// ENRIQUECEDOR DE CATÁLOGO
// ======================================


const fs = require("fs");
const path = require("path");

const paths = require("../config/paths");


const { clasificarProducto } =
require("./rules_engine");


const { extraerAtributos } =
require("./attributes");


const { clasificarExcepcion } =
require("./exceptions");

const { propagarConocimiento } =
require("./knowledge_propagation");


// ======================================
// MOTOR DE SINÓNIMOS HVACR
// ======================================

const { detectarSinonimos } =
require("./synonym_engine");




// Entrada

const archivoEntrada = path.join(
    __dirname,
    "../../catalog_builder/output/catalogo_maestro.json"
);



// Salida

const archivoSalida = path.join(
    paths.DATABASE,
    "catalog_enriquecido.json"
);



console.log("=================================");
console.log("MULTICONFORT IA");
console.log("ENRIQUECIMIENTO DE CATÁLOGO");
console.log("=================================");



const catalogo = JSON.parse(

    fs.readFileSync(
        archivoEntrada,
        "utf8"
    )

);



let clasificados = 0;
let pendientes = 0;

let porExcepcion = 0;
let porReglas = 0;



const catalogoEnriquecido =

catalogo.map(producto => {



    let resultado;



    // =================================================
    // NIVEL 1
    // CLASIFICACIÓN EXACTA POR CÓDIGO
    // =================================================


    resultado = clasificarExcepcion(

        producto.codigo_proveedor || ""

    );



    if(resultado){

        porExcepcion++;

    }



    // =================================================
    // NIVEL 2
    // MOTOR DE REGLAS HVACR
    // =================================================


    if(!resultado){


        resultado = clasificarProducto(

            producto.codigo_proveedor || "",

            producto.descripcion || ""

        );


        if(resultado.categoria){

            porReglas++;

        }


    }



    // Seguridad

    if(!resultado){

        resultado = {

            categoria:"",
            familia:"",
            subfamilia:"",
            marca:"",
            atributos:{}

        };

    }



    if(resultado.categoria){

        clasificados++;

    }

    else{

        pendientes++;

    }



    // =================================================
    // EXTRACCIÓN DE ATRIBUTOS HVACR
    // =================================================


    const atributosExtraidos =

        extraerAtributos(

            producto.descripcion || "",

            resultado.categoria,

            resultado.familia

        );




    // =================================================
    // DETECCIÓN DE SINÓNIMOS HVACR
    // =================================================


    const sinonimosDetectados =

        detectarSinonimos(

            producto.descripcion || ""

        );

  
// =================================================
// PROPAGACION DE CONOCIMIENTO HVACR
// =================================================


const conocimientoPropagado =

    propagarConocimiento({

        ...producto,

        familia:
        resultado.familia,

        sinonimos:
        sinonimosDetectados.sinonimos

    });



    return {


        ...producto,


        categoria:

            resultado.categoria,



        familia:

            resultado.familia,



        subfamilia:

            resultado.subfamilia,



        marca:

            resultado.marca ||

            producto.marca,



        // ===============================
        // ATRIBUTOS TÉCNICOS
        // ===============================

        atributos:

            atributosExtraidos.atributos,



        metadata_atributos:

            atributosExtraidos.metadata,



        // ===============================
        // SINÓNIMOS HVACR
        // ===============================

        sinonimos:

            sinonimosDetectados.sinonimos,



        metadata_sinonimos:

            sinonimosDetectados.metadata,

relaciones_ia:

    conocimientoPropagado,



    };



});







// =================================================
// GUARDAR RESULTADO
// =================================================


fs.writeFileSync(


    archivoSalida,


    JSON.stringify(

        catalogoEnriquecido,

        null,

        2

    ),


    "utf8"


);





console.log("");

console.log(
"Productos procesados:",
catalogo.length
);


console.log(
"Clasificados:",
clasificados
);


console.log(
"Pendientes IA:",
pendientes
);



console.log("");

console.log(
"Clasificación por excepción:",
porExcepcion
);


console.log(
"Clasificación por reglas:",
porReglas
);



console.log("");

console.log(
"Archivo generado:"
);


console.log(
archivoSalida
);



console.log("");

console.log(
"Proceso terminado."
);