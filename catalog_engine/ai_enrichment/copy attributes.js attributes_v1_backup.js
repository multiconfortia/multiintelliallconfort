// ======================================
// MULTICONFORT IA
// MOTOR DE ATRIBUTOS TÉCNICOS
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



    // ===============================
    // POTENCIA HP
    // ===============================

    const hp =
    texto.match(
        /(\d+(\.\d+)?)\s*HP/
    );


    if(hp){

        atributos.potencia_hp =
            hp[1];

    }



    // ===============================
    // RPM
    // ===============================

    const rpm =
    texto.match(
        /(\d+)\s*RPM/
    );


    if(rpm){

        atributos.rpm =
            rpm[1];

    }



    // ===============================
    // VOLTAJE
    // ===============================

    const voltaje =
    texto.match(
        /(\d{2,3})\s*V/
    );


    if(voltaje){

        atributos.voltaje =
            voltaje[1] + "V";

    }


    // ===============================
// FRECUENCIA
// ===============================

const frecuencia =
texto.match(
    /(\d{2})\s*HZ/
);


if(frecuencia){

    atributos.frecuencia =
        frecuencia[1] + "Hz";

}


// ===============================
// FASE ELECTRICA
// ===============================

if(
    texto.includes("3F") ||
    texto.includes("TRIFASICO")
){

    atributos.fases="3";

}


if(
    texto.includes("1F") ||
    texto.includes("MONOFASICO")
){

    atributos.fases="1";

}


    // ===============================
    // CAPACIDAD FRIGORIFICA
    // ===============================


const btu =
texto.match(
    /(\d+)\s*BTU/
);


if(btu){

    atributos.capacidad_btu =
        btu[1];

}






    // ===============================
    // REFRIGERANTES
    // ===============================

    const refrigerante =
    texto.match(
        /\b(R22|R134A|R404A|R407C|R410A|R507|R32)\b/
    );


    if(refrigerante){

        atributos.refrigerante =
            refrigerante[1];

    }



    // ===============================
    // PESO
    // ===============================

    const peso =
    texto.match(
        /(\d+(\.\d+)?)\s*(KG|KGS)/
    );


    if(peso){

        atributos.peso_kg =
            peso[1];

    }



    // ===============================
    // CONEXIONES
    // ===============================

    const conexion =
    texto.match(
        /\b(1\/4|3\/8|1\/2|5\/8|3\/4)\s*(SAE|NPT)?\b/
    );


    if(conexion){

        atributos.conexion =
            conexion[1] +
            (conexion[2] ? " " + conexion[2] : "");

    }



    // ===============================
    // CONTROL
    // ===============================

    if(texto.includes("TERMOSTATO")){

        atributos.tipo =
            "Termostato";

    }


    if(texto.includes("DIGITAL")){

        atributos.tecnologia =
            "Digital";

    }



    return atributos;

}



module.exports = {

    extraerAtributos

};