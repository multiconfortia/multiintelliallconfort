// ======================================
// MULTICONFORT IA
// KNOWLEDGE CORE
// MOTOR DE ATRIBUTOS TÉCNICOS HVACR
// Version 2.0
// ======================================


function extraerAtributos(
    descripcion,
    categoria,
    familia
){


    const texto =
        (descripcion || "")
        .toUpperCase()
        .trim();



    let atributos = {};



    // ======================================
    // IDENTIFICACION DEL EQUIPO
    // ======================================

    if(familia){

        atributos.familia = familia;

    }


    if(categoria){

        atributos.categoria = categoria;

    }



    // ======================================
    // POTENCIA HP
    // ======================================

    const hp =
    texto.match(
        /(\d+(\.\d+)?)\s*HP/
    );


    if(hp){

        atributos.potencia_hp = {

            valor:Number(hp[1]),
            unidad:"HP"

        };

    }




    // ======================================
    // RPM
    // ======================================


    const rpm =
    texto.match(
        /(\d+)\s*RPM/
    );


    if(rpm){

        atributos.rpm = {

            valor:Number(rpm[1]),
            unidad:"RPM"

        };

    }




    // ======================================
    // VOLTAJE
    // ======================================


    const voltaje =
    texto.match(
        /(\d{2,3})\s*V/
    );


    if(voltaje){

        atributos.voltaje = {

            valor:Number(voltaje[1]),
            unidad:"V"

        };

    }




    // ======================================
    // FRECUENCIA
    // ======================================


    const frecuencia =
    texto.match(
        /(\d{2})\s*HZ/
    );


    if(frecuencia){

        atributos.frecuencia = {

            valor:Number(frecuencia[1]),
            unidad:"Hz"

        };

    }




    // ======================================
    // FASE ELECTRICA
    // ======================================


    if(
        texto.includes("3F") ||
        texto.includes("TRIFASICO")
    ){

        atributos.fases = 3;

    }


    if(
        texto.includes("1F") ||
        texto.includes("MONOFASICO")
    ){

        atributos.fases = 1;

    }




    // ======================================
    // CAPACIDAD FRIGORIFICA BTU
    // ======================================


    const btu =
    texto.match(
        /(\d+)\s*BTU/
    );


    if(btu){

        atributos.capacidad_btu = {

            valor:Number(btu[1]),
            unidad:"BTU"

        };

    }




    // ======================================
    // TONELADAS DE REFRIGERACION
    // ======================================


    const toneladas =
    texto.match(
        /(\d+(\.\d+)?)\s*(TR|TON)/
    );


    if(toneladas){

        atributos.capacidad_tr = {

            valor:Number(toneladas[1]),
            unidad:"TR"

        };

    }




    // ======================================
    // REFRIGERANTES
    // ======================================


    const refrigerante =
    texto.match(
        /\b(R22|R134A|R404A|R407C|R410A|R507|R32|R290|R600A)\b/
    );


    if(refrigerante){

        atributos.refrigerante =
            refrigerante[1];

    }




    // ======================================
    // ACEITES
    // ======================================


    if(
        texto.includes("POE") ||
        texto.includes("POLYOL ESTER")
    ){

        atributos.aceite = {

            tipo:"POE",
            descripcion:"Polyol Ester"

        };

    }



    if(
        texto.includes("MINERAL")
    ){

        atributos.aceite = {

            tipo:"MINERAL"

        };

    }




    // ======================================
    // PESO
    // ======================================


    const peso =
    texto.match(
        /(\d+(\.\d+)?)\s*(KG|KGS)/
    );


    if(peso){

        atributos.peso = {

            valor:Number(peso[1]),
            unidad:"kg"

        };

    }




    // ======================================
    // CONEXIONES
    // ======================================


    const conexion =
    texto.match(
        /\b(1\/4|3\/8|1\/2|5\/8|3\/4)\s*(SAE|NPT)?\b/
    );


    if(conexion){


        atributos.conexion = {

            medida:conexion[1],
            tipo:conexion[2] || "SAE"

        };


    }





    // ======================================
    // TECNOLOGIA
    // ======================================


    if(texto.includes("DIGITAL")){


        atributos.tecnologia =
            "Digital";


    }


    if(texto.includes("INVERTER")){


        atributos.tecnologia =
            "Inverter";


    }


    if(texto.includes("SCROLL")){


        atributos.tipo_compresor =
            "Scroll";


    }


    if(texto.includes("RECIPROCANTE")){


        atributos.tipo_compresor =
            "Reciprocante";


    }




    // ======================================
    // COMUNICACION
    // ======================================


    if(texto.includes("MODBUS")){


        atributos.comunicacion =
            "Modbus";


    }


    if(texto.includes("BACNET")){


        atributos.comunicacion =
            "BACnet";


    }




    // ======================================
    // APLICACION HVACR
    // ======================================


    if(texto.includes("AIRE ACONDICIONADO")){


        atributos.aplicacion =
            "Aire acondicionado";


    }


    if(texto.includes("REFRIGERACION")){


        atributos.aplicacion =
            "Refrigeracion";


    }




    // ======================================
    // RESPUESTA KNOWLEDGE CORE
    // ======================================


    return {


        atributos,


        metadata:{


            motor:
            "MULTICONFORT_IA_ATTRIBUTES_ENGINE",


            version:
            "2.0",


            confianza:
            0.80,


            fuente:
            "descripcion_producto"


        }


    };


}




module.exports = {


    extraerAtributos


};