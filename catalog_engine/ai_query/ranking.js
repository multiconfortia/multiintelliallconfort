// ======================================
// MULTICONFORT IA
// MOTOR DE RANKING HVACR
// ======================================


const { construirIndice } =
require("./index_builder");


const {
    detectarSinonimos
} =
require("../ai_enrichment/synonym_engine");



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
// CALCULAR RANKING
// ======================================

function calcularRanking(
    producto,
    busqueda,
    entidadesConsulta
){


    let puntos = 0;


// ==================================
// EXPANSION CONOCIMIENTO SINONIMOS
// ==================================




// ==================================
// EXPANSION SINONIMOS HVACR
// ==================================

const datosSinonimos =
detectarSinonimos(
    busqueda
);


const conceptosSinonimos =
datosSinonimos.sinonimos.map(s =>
    s.concepto
);



    // ==================================
// VALIDACION REFRIGERANTE HVACR
// ==================================

const textoProductoBase =
limpiar(

    producto.descripcion +
    " " +
    producto.marca +
    " " +
    producto.familia +
    " " +
    producto.subfamilia

);



const refrigerantes = [

    "22",
    "404A",
    "410A",
    "134A",
    "507",
    "407C"

];



const consultaLimpia =
limpiar(busqueda);



const refrigeranteSolicitado =
refrigerantes.find(r =>

    consultaLimpia.includes(r)

);



if(refrigeranteSolicitado){


    if(
        !textoProductoBase.includes(
            refrigeranteSolicitado
        )
    ){

        return 0;

    }

}


    // ==================================
    // CONSTRUCCION TEXTO IA
    // ==================================

    const textoProducto =
    construirIndice(producto);


// ==================================
// COINCIDENCIA POR CONCEPTO IA
// ==================================

conceptosSinonimos.forEach(concepto=>{


    if(
        textoProducto.includes(
            concepto
        )
    ){

        puntos += 25;

    }


});




    // ==================================
    // COINCIDENCIA TEXTO
    // ==================================

    const palabras =

    consultaLimpia
    .replace(/[-_]/g," ")
    .split(" ");



    palabras.forEach(palabra=>{


        if(
            palabra.length > 2 &&
            textoProducto.includes(palabra)
        ){

            puntos += 5;

        }


    });





    // ==================================
    // MARCAS
    // ==================================

    if(
        entidadesConsulta &&
        entidadesConsulta.marcas
    ){


        entidadesConsulta.marcas.forEach(marca=>{


            if(

                producto.entidades_ia &&
                producto.entidades_ia.marcas &&
                producto.entidades_ia.marcas.includes(marca)

            ){

                puntos += 50;

            }


        });


    }





    // ==================================
    // TECNOLOGIAS
    // ==================================

    if(
        entidadesConsulta &&
        entidadesConsulta.tecnologias
    ){


        entidadesConsulta.tecnologias.forEach(tecnologia=>{


            if(

                producto.entidades_ia &&
                producto.entidades_ia.tecnologias &&
                producto.entidades_ia.tecnologias.includes(tecnologia)

            ){

                puntos += 30;

            }


        });


    }





    // ==================================
    // TIPO PRODUCTO
    // ==================================

    if(
        entidadesConsulta &&
        entidadesConsulta.tipos
    ){


        entidadesConsulta.tipos.forEach(tipo=>{


            if(

                producto.entidades_ia &&
                producto.entidades_ia.tipos &&
                producto.entidades_ia.tipos.includes(tipo)

            ){

                puntos += 20;

            }


        });


    }





    // ==================================
    // CONOCIMIENTO IA
    // ==================================

    if(
        producto.conocimiento_ia
    ){

        puntos += 10;

    }





    // ==================================
    // RELACIONES IA HVACR
    // ==================================

    if(
        producto.relaciones_ia
    ){


        producto.relaciones_ia.forEach(relacion=>{


            const textoRelacion =

            JSON.stringify(relacion)
            .toUpperCase();



            if(

                textoRelacion.includes(
                    consultaLimpia
                )

            ){

                puntos += 40;

            }




            // Preguntas de aceite

            if(

                consultaLimpia.includes("ACEITE")
                &&
                relacion.tipo === "aceite_recomendado"

            ){

                puntos += 50;

            }


        });


    }





    // ==================================
    // SINONIMOS IA
    // ==================================

    if(
        producto.sinonimos
    ){


        producto.sinonimos.forEach(sinonimo=>{


            if(

                JSON.stringify(sinonimo)
                .toUpperCase()
                .includes(
                    consultaLimpia
                )

            ){

                puntos += 30;

            }


        });


    }





    return puntos;


}





module.exports = {

    calcularRanking

};