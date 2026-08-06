// ======================================
// MULTICONFORT IA
// CONCEPT ENGINE HVACR
// MOTOR DE INTERPRETACION DE CONCEPTOS
// ======================================


const concepts =
require("./concepts");




// ======================================
// NORMALIZAR TEXTO
// ======================================

function limpiar(texto){

    return (texto || "")
    .toUpperCase()
    .normalize("NFD")
    .replace(
        /[\u0300-\u036f]/g,
        ""
    );

}




// ======================================
// DETECTAR CONCEPTO
// ======================================

function detectarConcepto(
    consulta
){

    const texto =
        limpiar(
            consulta
        );


    let mapa = {};



    for(
        const concepto in concepts
    ){

        const datos =
            concepts[concepto];


        for(
            const sinonimo of datos.sinonimos
        ){

            if(
                texto.includes(
                    limpiar(sinonimo)
                )
            ){


                if(!mapa[concepto]){


                    mapa[concepto] = {

                        concepto,

                        tipo:
                        datos.tipo || "",

                        familia:
                        datos.familia || "",

                        tecnologia:
                        datos.tecnologia || "",

                        conocimiento:
                        datos.conocimiento || {},

                        coincidencias:[]

                    };


                }



                mapa[concepto]
                .coincidencias
                .push(
                    sinonimo
                );


            }


        }


    }



    return Object.values(
        mapa
    );






    return encontrados;

}





// ======================================
// PRUEBA DIRECTA
// ======================================

if(
    require.main === module
){

    const consulta =
        process.argv
        .slice(2)
        .join(" ");


    console.log(
        detectarConcepto(
            consulta
        )
    );

}



module.exports = {

    detectarConcepto

};