// ======================================
// MULTICONFORT IA
// MOTOR DE REGLAS HVACR
// ======================================

function clasificarPorCodigo(codigo) {

    if(!codigo) return null;


    const c = codigo.toUpperCase();



    if(c.startsWith("RES-")){

        return {
            categoria:"Eléctrico HVAC",
            familia:"Resistencias y calefacción",
            subfamilia:"Elementos calefactores"
        };

    }


    if(c.startsWith("BRO-")){

        return {
            categoria:"Refrigeración",
            familia:"Conexiones",
            subfamilia:"Conexiones de bronce"
        };

    }


    if(c.startsWith("EMP-")){

        return {
            categoria:"Refacciones",
            familia:"Sellos y empaques",
            subfamilia:"Empaques refrigeración"
        };

    }


    if(c.startsWith("MOT-")){

        return {
            categoria:"Componentes HVAC",
            familia:"Motores eléctricos",
            subfamilia:"Motores ventilador"
        };

    }


    if(c.startsWith("FIL-")){

        return {
            categoria:"Refrigeración",
            familia:"Filtración",
            subfamilia:"Filtros deshidratadores"
        };

    }


    if(c.startsWith("CIN-")){

        return {
            categoria:"Material HVAC",
            familia:"Cintas técnicas",
            subfamilia:"Sellado y aislamiento"
        };

    }


    if(c.startsWith("AIS-")){

        return {
            categoria:"Aislamiento",
            familia:"Material aislante",
            subfamilia:"Adhesivos y espumas"
        };

    }


        if(c.startsWith("VSE-")){

        return {
            categoria:"Refrigeración",
            familia:"Válvulas",
            subfamilia:"Válvulas de servicio"
        };

    }


    if(c.startsWith("CON-")){

        return {
            categoria:"Instrumentación y Control",
            familia:"Accesorios de control",
            subfamilia:"Termostatos y accesorios"
        };

    }


    if(c.startsWith("FOA-")){

        return {
            categoria:"Químicos HVAC",
            familia:"Limpieza",
            subfamilia:"Limpiadores de serpentín"
        };

    }


    if(c.startsWith("INS-")){

        return {
            categoria:"Instalación HVAC",
            familia:"Aislamiento y selladores",
            subfamilia:"Espumas y adhesivos"
        };

    }


    if(c.startsWith("ASP-")){

        return {
            categoria:"Componentes HVAC",
            familia:"Ventilación",
            subfamilia:"Aspas y hélices"
        };

    }


    if(c.startsWith("REL-")){

        return {
            categoria:"Eléctrico HVAC",
            familia:"Control eléctrico",
            subfamilia:"Relevadores"
        };

    }


    if(c.startsWith("VEX-")){

        return {
            categoria:"Refrigeración",
            familia:"Conexiones",
            subfamilia:"Adaptadores de válvula"
        };

    }


    return null;

}


function clasificarProducto(codigo, descripcion) {


    const texto = (descripcion || "")
    .toUpperCase()
    .trim();


    let resultado = {

        categoria: "",
        familia: "",
        subfamilia: "",
        marca: "",
        atributos: {}

    };

// Primero intenta clasificar por código proveedor

const clasificacionCodigo =
    clasificarPorCodigo(codigo);


if(clasificacionCodigo){

    resultado.categoria =
        clasificacionCodigo.categoria;

    resultado.familia =
        clasificacionCodigo.familia;

    resultado.subfamilia =
        clasificacionCodigo.subfamilia;

}

    // -------------------------------
    // REFRIGERANTES
    // -------------------------------

    if(
    resultado.categoria === "" &&
    (
        texto.includes("REFRIGERANTE") ||
        texto.includes("FREON") ||
        texto.includes("R-22") ||
        texto.includes("R22") ||
        texto.includes("404A")
    )
){

        resultado.categoria =
            "Refrigeración";

        resultado.familia =
            "Refrigerantes";

        resultado.subfamilia =
            "Gases refrigerantes";

    }



    // -------------------------------
    // CONTROLADORES
    // -------------------------------

    else if(
    resultado.categoria === "" &&
    (
        texto.includes("CONTROLADOR") ||
        texto.includes("CONTROL") ||
        texto.includes("SENSOR")
    )
){

        resultado.categoria =
            "Instrumentación y Control";

        resultado.familia =
            "Controladores electrónicos";

        resultado.subfamilia =
            "Control temperatura";

    }



    // -------------------------------
    // SOLDADURA
    // -------------------------------

    else if(
    resultado.categoria === "" &&
    texto.includes("SOLDADURA")
){

        resultado.categoria =
            "Consumibles";

        resultado.familia =
            "Soldadura";

        resultado.subfamilia =
            "Material de unión";

    }



    // -------------------------------
    // TUBERÍA / COBRE
    // -------------------------------

    else if(
    resultado.categoria === "" &&
    (
        texto.includes("COBRE") ||
        texto.includes("TUBO") ||
        texto.includes("CODO")
    )
){

        resultado.categoria =
            "Material HVAC";

        resultado.familia =
            "Tubería y conexiones";

        resultado.subfamilia =
            "Cobre";

    }



    // -------------------------------
    // ACEITES
    // -------------------------------

    else if(
    resultado.categoria === "" &&
    texto.includes("ACEITE")
){

        resultado.categoria =
            "Lubricantes";

        resultado.familia =
            "Aceites refrigeración";

        resultado.subfamilia =
            "Aceite POE / Mineral";

    }



    // -------------------------------
    // AISLAMIENTO
    // -------------------------------

    else if(
    resultado.categoria === "" &&
    (
        texto.includes("AISL") ||
        texto.includes("INSULTUBE") ||
        texto.includes("FOAM")
    )
){

        resultado.categoria =
            "Aislamiento";

        resultado.familia =
            "Aislamiento térmico";

        resultado.subfamilia =
            "Tubular / espuma";

    }



    // -------------------------------
    // MARCAS CONOCIDAS
    // -------------------------------

    const marcas = [
        "FULL GAUGE",
        "GEFRIEREN",
        "HARRYS",
        "SIKA",
        "SIKAFLEX",
        "KASON",
        "MCMILLAN",
        "NORCUL"
    ];


    for(const marca of marcas){

        if(texto.includes(marca)){

            resultado.marca = marca;
            break;

        }

    }



    return resultado;

}



module.exports = {
    clasificarProducto
};