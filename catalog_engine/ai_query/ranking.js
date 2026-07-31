// ======================================
// MULTICONFORT IA
// MOTOR DE RANKING HVACR
// ======================================

const { construirIndice } =
require("./index_builder");


function calcularRanking(
    producto,
    consulta,
    entidadesConsulta
){


    let puntos = 0;



    const textoProducto =
    construirIndice(producto);



    // ==============================
    // COINCIDENCIA TEXTO
    // ==============================

    const palabras =
    consulta
    .toUpperCase()
    .replace(/[-_]/g,"")
    .split(" ");



    palabras.forEach(palabra=>{


        if(
            textoProducto.includes(palabra)
        ){

            puntos += 5;

        }


    });





    // ==============================
    // MARCAS
    // ==============================

    if(
        entidadesConsulta.marcas
    ){


        entidadesConsulta.marcas.forEach(marca=>{


            if(

                producto.entidades_ia &&
                producto.entidades_ia.marcas.includes(marca)

            ){

                puntos += 50;

            }


        });


    }





    // ==============================
    // TECNOLOGIAS
    // ==============================

    if(
        entidadesConsulta.tecnologias
    ){


        entidadesConsulta.tecnologias.forEach(tecnologia=>{


            if(

                producto.entidades_ia &&
                producto.entidades_ia.tecnologias.includes(tecnologia)

            ){

                puntos += 30;

            }


        });


    }





    // ==============================
    // TIPO DE PRODUCTO
    // ==============================

    if(
        entidadesConsulta.tipos
    ){


        entidadesConsulta.tipos.forEach(tipo=>{


            if(

                producto.entidades_ia &&
                producto.entidades_ia.tipos.includes(tipo)

            ){

                puntos += 20;

            }


        });


    }





    // ==============================
    // CONOCIMIENTO IA
    // ==============================

    if(
        producto.conocimiento_ia
    ){

        puntos += 10;

    }


// ==============================
// RELACIONES IA HVACR
// ==============================


if(producto.relaciones_ia){


    producto.relaciones_ia.forEach(relacion=>{


        const textoRelacion =

        JSON.stringify(relacion)
        .toUpperCase();



        const consultaNormalizada =

        consulta.toUpperCase();



        if(
            textoRelacion.includes(
                consultaNormalizada
            )
        ){

            puntos += 40;

        }



        // Preguntas de aceite

        if(

            consultaNormalizada.includes("ACEITE")
            &&
            relacion.tipo === "aceite_recomendado"

        ){

            puntos += 50;

        }


    });


}



// ==============================
// SINONIMOS IA
// ==============================

if(producto.sinonimos){

    producto.sinonimos.forEach(sinonimo=>{

        if(
            JSON.stringify(sinonimo)
            .toUpperCase()
            .includes(
                consulta.toUpperCase()
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

