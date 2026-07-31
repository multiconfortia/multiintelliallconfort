// ======================================
// MULTICONFORT IA
// VISOR DE PRODUCTO IA
// BUSQUEDA INTELIGENTE
// KNOWLEDGE CORE HVACR
// Version 1.1
// ======================================


const fs = require("fs");
const path = require("path");


// ======================================
// CARGAR CATALOGO
// ======================================

const archivoCatalogo =
    path.join(
        __dirname,
        "..",
        "database",
        "catalog_ia.json"
    );


function cargarCatalogo(){

    return JSON.parse(
        fs.readFileSync(
            archivoCatalogo,
            "utf8"
        )
    );

}



// ======================================
// NORMALIZAR TEXTO
// ======================================

function normalizar(texto){

    return (
        texto || ""
    )
    .toString()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"");

}



// ======================================
// CREAR TEXTO DE BUSQUEDA IA
// ======================================
// ======================================
// CREAR TEXTO DE BUSQUEDA IA
// ======================================

function textoProducto(producto){

    let texto = "";


    /// Datos principales

texto += " " + (producto.descripcion || "");
texto += " " + (producto.marca || "");
texto += " " + (producto.fabricante || "");
texto += " " + (producto.modelo || "");
texto += " " + (producto.familia || "");
texto += " " + (producto.subfamilia || "");
texto += " " + (producto.codigo_proveedor || "");
texto += " " + (producto.categoria || "");

// Atributos comerciales
texto += " " + JSON.stringify(producto.atributos || {});



    // Entidades IA

    if(producto.entidades_ia){

        texto +=
            " " +
            JSON.stringify(
                producto.entidades_ia
            );

    }



    // Sinónimos IA

    if(producto.sinonimos_ia){

        texto +=
            " " +
            JSON.stringify(
                producto.sinonimos_ia
            );

    }



    // Atributos técnicos

    if(producto.atributos_tecnicos){

        texto +=
            " " +
            JSON.stringify(
                producto.atributos_tecnicos
            );

    }



    // IMPORTANTE:
    // conocimiento_ia NO participa en búsqueda
    // Se utilizará después para respuestas técnicas



    return normalizar(texto);

}






// ======================================
// MOTOR DE RELEVANCIA IA
// ======================================

function calcularRelevancia(producto, consulta){


    let score = 0;


    const busqueda =
        normalizar(
            consulta
        );



    const texto =
        textoProducto(
            producto
        );



    // Coincidencia general

    if(texto.includes(busqueda)){


        score += 50;


    }



    // Descripción prioridad alta

    const descripcion =
        normalizar(
            producto.descripcion
        );


    if(descripcion.includes(busqueda)){


        score += 30;


    }



    // Familia

    if(
        normalizar(producto.familia)
        .includes(busqueda)
    ){


        score += 20;


    }



    // Categoría

    if(
        normalizar(producto.categoria)
        .includes(busqueda)
    ){


        score += 10;


    }



    // Sinónimos IA

    if(producto.sinonimos_ia){


        if(
            normalizar(
                JSON.stringify(
                    producto.sinonimos_ia
                )
            )
            .includes(busqueda)
        ){


            score += 40;


        }


    }



    // Tecnologías IA

    if(producto.entidades_ia){


        if(
            normalizar(
                JSON.stringify(
                    producto.entidades_ia
                )
            )
            .includes(busqueda)
        ){


            score += 25;


        }


    }



    return score;


}




// ======================================
// BUSQUEDA INTELIGENTE
// ======================================

// ======================================
// BUSQUEDA INTELIGENTE POR TOKENS IA
// ======================================

function buscar(productos, consulta){


    const tokens =
        normalizar(consulta)
        .split(/\s+/)
        .filter(t=>t.length>0);

const tokensTecnicos =
    tokens.map(t =>
        t.replace("R","")
    );



    return productos

    .map(producto=>{


        let score =
            calcularRelevancia(
                producto,
                consulta
            );


        const texto =
            textoProducto(
                producto
            );



        let coincidencias = 0;



        tokens.forEach(token=>{

// Validación especial refrigerantes

if(
    tokens.includes("404") ||
    tokens.includes("R404A")
){

    if(
        texto.includes("404A") ||
        texto.includes("R404A")
    ){

        score += 80;

    }
    else{

        score -= 10;
    }

}


    if(texto.includes(token)){

        coincidencias++;

        score += 15;

    }


});


// Penalizar productos que no contienen todos los términos importantes

if(coincidencias < tokens.length){

    score -= 5;

}



        return {

            producto,

            score,

            coincidencias

        };


    })



    .filter(r=>r.coincidencias>0)



    .sort(
        (a,b)=>
        b.score-a.score
    );


}




// ======================================
// RESUMEN
// ======================================

function mostrarResumen(productos){


    let resumen = {};


    productos.forEach(producto=>{


        let categoria =
            producto.categoria ||
            "SIN CATEGORIA";


        resumen[categoria] =
            (resumen[categoria] || 0) + 1;


    });


    console.log(resumen);


}




// ======================================
// EJECUCION
// ======================================


const productos =
    cargarCatalogo();



const consulta =
    process.argv
    .slice(2)
    .join(" ");





if(!consulta){


    mostrarResumen(
        productos
    );


}

else{


    const resultados =
        buscar(
            productos,
            consulta
        );



    if(resultados.length){


        console.log(
            "Productos encontrados:",
            resultados.length
        );


        console.log("");



        resultados
        .slice(0,10)
        .forEach(resultado=>{


            console.log(
                "=============================="
            );


            console.log(
                "SCORE IA:",
                resultado.score
            );


            console.log(
                JSON.stringify(
                    resultado.producto,
                    null,
                    2
                )
            );


        });



    }

    else{


        console.log(
            "Sin resultados para:",
            consulta
        );


    }


}