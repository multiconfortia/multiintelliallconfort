// ======================================
// MULTICONFORT IA
// RESPONSE GENERATOR
// GENERADOR DE RESPUESTA HVACR
// ======================================


function generarRespuesta(
    datos
){


    let respuesta = "";



    // ===============================
    // CONCEPTO DETECTADO
    // ===============================

    if(
        datos.conceptos &&
        datos.conceptos.length
    ){

        const concepto =
        datos.conceptos[0];


        respuesta +=

`Concepto identificado:
${concepto.concepto}

Tipo:
${concepto.tipo}

Familia:
${concepto.familia}

`;


        if(
            concepto.conocimiento &&
            concepto.conocimiento.aceite
        ){

            respuesta +=

`Información técnica:
• Aceite recomendado: ${concepto.conocimiento.aceite}

`;

        }

    }



    // ===============================
    // PRODUCTOS
    // ===============================


    if(
        datos.productos &&
        datos.productos.length
    ){


        respuesta +=

"Opciones disponibles:\n\n";



        datos.productos
        .slice(0,5)
        .forEach(
            (producto,index)=>{


                respuesta +=

`${index+1}) ${producto.descripcion}
`;

                respuesta +=

`   Familia: ${producto.familia}
`;

                respuesta +=

`   Confianza: ${producto.puntaje}

\n`;

            }
        );



        respuesta +=

"¿Desea comparación técnica, selección por aplicación o cotización?";


    }



    return respuesta;


}



module.exports = {

    generarRespuesta

};