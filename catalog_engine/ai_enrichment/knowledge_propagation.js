// ======================================
// MULTICONFORT IA
// KNOWLEDGE PROPAGATION ENGINE
// MOTOR DE RELACIONES HVACR
// ======================================


const {
    consultarHVACR
} = require("./technical_knowledge_engine");



// ======================================
// PROPAGAR CONOCIMIENTO
// ======================================


function propagarConocimiento(producto){


    let relaciones = [];



    const texto =

    (
        producto.descripcion ||
        ""
    )
    +
    " "
    +
    JSON.stringify(
        producto.sinonimos || []
    );



    const conocimiento =

        consultarHVACR(texto);



    // ==================================
    // REFRIGERANTES
    // ==================================

    if(conocimiento.refrigerante){


        relaciones.push({

            tipo:
            "conocimiento_refrigerante",


            datos:
            conocimiento.refrigerante


        });


    }



    // ==================================
    // ACEITES ASOCIADOS
    // ==================================

    if(
        conocimiento.refrigerante &&
        conocimiento.refrigerante.aceites_asociados
    ){


        conocimiento.refrigerante
        .aceites_asociados
        .forEach(aceite=>{


            relaciones.push({

                tipo:
                "aceite_recomendado",


                relacion:
                aceite,


                motivo:
                "Compatibilidad HVACR"

            });


        });


    }



    // ==================================
    // SOLDADURA HVACR
    // ==================================

    if(
        producto.familia === "Soldadura"
    ){


        relaciones.push({

            tipo:
            "aplicacion",


            relacion:
            "Brazing HVACR",


            motivo:
            "Soldadura fuerte para tuberia de refrigeracion"

        });


    }



    return relaciones;


}




module.exports = {


    propagarConocimiento


};


// ==================================
// ACEITE HVACR
// ==================================

if(
 producto.familia &&
 producto.familia.includes("Aceite")
){

    const aceite =
    producto.descripcion.toUpperCase();


    if(
        aceite.includes("POE")
    ){

        relaciones.push({

            tipo:
            "compatibilidad_aceite",


            compatible_con:[

                "R404A",
                "R410A",
                "R134A"

            ],


            motivo:
            "Aceite poliolester usado con refrigerantes HFC"

        });


    }

}