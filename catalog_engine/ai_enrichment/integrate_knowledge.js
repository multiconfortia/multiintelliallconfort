// ======================================
// MULTICONFORT IA
// INTEGRADOR DE CONOCIMIENTO + ENTIDADES
// ======================================

const fs = require("fs");
const path = require("path");

const { reconocerEntidades } =
    require("./entity_recognition");

const { extraerAtributos } =
    require("./attributes");


const { detectarSinonimos } =
    require("./synonym_engine");



const BASE_DIR =
    path.join(__dirname, "..", "..");


const DATA_DIR =
    path.join(BASE_DIR, "public", "data");


const DATABASE_DIR =
    path.join(__dirname, "..", "database");



console.log("=================================");
console.log("MULTICONFORT IA");
console.log("INTEGRACION DE CONOCIMIENTO");
console.log("=================================");




// ======================================
// CARGAR JSON
// ======================================

function cargarJSON(archivo){

    return JSON.parse(
        fs.readFileSync(
            archivo,
            "utf8"
        )
    );

}




// ======================================
// CARGAR CONOCIMIENTO
// ======================================

function cargarConocimiento(){

    let conocimiento = [];


    const archivosPermitidos = [

        "000001 hvac.json",
        "000002-refrigeracion.json",
        "000003-chiller.json",
        "000004-serpentines.json",
        "000005-compresores.json",
        "000006-refrigerantes.json",
        "000007-control.json",
        "000008-electronica.json",
        "000009-ventiladores.json",
        "000010-ducteria.json",
        "000011-filtracion.json",
        "000012-instalacion.json",
        "000013-refacciones.json",
        "000014-torres.json",
        "000015-industriales.json",
        "000016-marcas.json",
        "000017-aplicaciones.json"

    ];



    archivosPermitidos.forEach(archivo=>{

        try{

            const ruta =
                path.join(
                    DATA_DIR,
                    archivo
                );


            const data =
                cargarJSON(ruta);


            conocimiento.push({

                archivo,
                data

            });


        }
        catch(e){

            console.log(
                "Error leyendo:",
                archivo
            );

        }


    });


    return conocimiento;

}




// ======================================
// BUSCAR CONOCIMIENTO
// ======================================

function encontrarConocimiento(
    producto,
    conocimiento
){


    const textoProducto = (

    producto.descripcion +
    " " +
    producto.marca +
    " " +
    producto.fabricante +
    " " +
    producto.modelo +
    " " +
    producto.serie +
    " " +
    producto.codigo_proveedor +
    " " +
    producto.codigo_mc +
    " " +
    producto.categoria +
    " " +
    producto.familia +
    " " +
    producto.subfamilia

).toUpperCase();



    for(const item of conocimiento){


        const datos = item.data;


        let palabras = [];


        palabras.push(
            ...(datos.sinonimos || [])
        );


        palabras.push(
            ...(datos.palabras || [])
        );


        palabras.push(
            ...(datos.productos || [])
        );


        palabras.push(
            ...(datos.marcas || [])
        );



        for(const palabra of palabras){


            if(
                textoProducto.includes(
                    palabra.toUpperCase()
                )
            ){

                return item;

            }


        }


    }


    return null;

}




// ======================================
// INTEGRAR IA
// ======================================

function integrar(){


    const archivoCatalogo =
        path.join(
            DATABASE_DIR,
            "catalog_enriquecido.json"
        );



    const productos =
        cargarJSON(
            archivoCatalogo
        );



    const conocimiento =
        cargarConocimiento();



    let encontrados = 0;

    let entidadesDetectadas = 0;

    let atributosDetectados = 0;

    let sinonimosDetectados = 0;



    const resultado =
    productos.map(producto=>{


        // ==============================
        // RECONOCIMIENTO DE ENTIDADES
        // ==============================


        const textoProducto = (

    producto.descripcion +
    " " +
    producto.marca +
    " " +
    producto.fabricante +
    " " +
    producto.modelo +
    " " +
    producto.serie +
    " " +
    producto.codigo_proveedor +
    " " +
    producto.codigo_mc +
    " " +
    producto.categoria +
    " " +
    producto.familia +
    " " +
    producto.subfamilia

);


        const entidades =
            reconocerEntidades(
                textoProducto
            );



        if(

            entidades.marcas.length ||
            entidades.tecnologias.length ||
            entidades.tipos.length

        ){

            entidadesDetectadas++;


            producto.entidades_ia =
                entidades;

        }


// ==============================
// ATRIBUTOS TECNICOS
// ==============================


const atributos =
    extraerAtributos(
        textoProducto,
        producto.categoria,
        producto.familia
    );


if(
    Object.keys(
        atributos.atributos
    ).length
){

    atributosDetectados++;

    producto.atributos_tecnicos =
        atributos;

}






// ==============================
// SINONIMOS COMERCIALES
// ==============================


const sinonimos =
    detectarSinonimos(
        textoProducto
    );


if(
    sinonimos.sinonimos.length
){

    sinonimosDetectados++;

    producto.sinonimos_ia =
        sinonimos;

}




        // ==============================
        // CONOCIMIENTO TECNICO
        // ==============================


        const info =
            encontrarConocimiento(
                producto,
                conocimiento
            );



        if(info){


            encontrados++;



            producto.conocimiento_ia = {


                fuente:
                    info.archivo,


                aplicaciones:
                    info.data.aplicaciones || [],


                servicios:
                    info.data.servicios_multiconfort || [],


                compatibilidades:
                    info.data.compatibilidades || [],


                normativas:
                    info.data.normativas || [],


                protocolos:
                    info.data.protocolos_comunicacion || [],


                variables:
                    info.data.variables_controladas || []


            };


        }



        return producto;


    });





    const salida =
        path.join(
            DATABASE_DIR,
            "catalog_ia.json"
        );



    fs.writeFileSync(

        salida,

        JSON.stringify(
            resultado,
            null,
            2
        ),

        "utf8"

    );



    console.log("");

    console.log(
        "Productos analizados:",
        productos.length
    );


    console.log(
        "Con conocimiento agregado:",
        encontrados
    );


    console.log(
        "Con entidades IA:",
        entidadesDetectadas
    );


console.log(
    "Con atributos técnicos:",
    atributosDetectados
);


console.log(
    "Con sinónimos comerciales:",
    sinonimosDetectados
);



    console.log("");

    console.log(
        "Archivo generado:"
    );


    console.log(
        salida
    );


}





// ======================================

integrar();