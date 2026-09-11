// ======================================
// MULTICONFORT IA
// MOTOR DE RANKING HVACR
// ======================================


const { construirIndice } =
require("./index_builder_v24");


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
// PRIORIDAD HVACR: RESISTENCIA + CARTER
// ==================================

const consultaRanking = limpiar(busqueda);
const productoRanking = limpiar(
    producto.descripcion + " " +
    producto.familia + " " +
    producto.subfamilia
);

if (
    consultaRanking.includes("RESISTENCIA") &&
    consultaRanking.includes("CARTER") &&
    productoRanking.includes("RESISTENCIA") &&
    productoRanking.includes("CARTER")
) {
    puntos += 100;
}



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

// ====================================================
// REFINAMIENTO DE CONSULTAS TECNICAS - V243
// Requisitos fuertes y penalizacion de contradicciones
// ====================================================
const consultaTecnica = limpiar(busqueda);
const textoTecnico = limpiar((producto.descripcion||'')+' '+(producto.familia||'')+' '+(producto.subfamilia||'')+' '+(producto.marca||''));

// Tipo principal solicitado
// Tipo principal solicitado
// Tipo principal solicitado
const tiposFuertes = [
    'COMPRESOR',
    'RESISTENCIA',
    'CONDENSADOR',
    'EVAPORADOR',
    'VENTILADOR',
    'MOTOR',
    'BOMBA',
    'VALVULA',
    'FILTRO',
    'TERMOSTATO',
    'CONTROLADOR'
];

const descripcionPrincipal =
    limpiar(producto.descripcion || '').substring(0, 180);

function esObjetoPrincipal(tipo) {

    const descripcion = descripcionPrincipal;

    const exclusiones = {
        CONDENSADOR: [
            'ASPA',
            'SERPENTIN',
            'MOTOR',
            'KIT',
            'CONTROL',
            'TARJETA',
            'REJILLA',
            'VENTILADOR',
            'BOBINA',
            'TUBO'
        ],

        VENTILADOR: [
            'RUEDA',
            'FLECHA',
            'KIT',
            'MOTOR',
            'CONTROL',
            'TERMOSTATO',
            'ASPA'
        ],

        MOTOR: [
            'COPLE',
            'KIT'
        ],

        BOMBA: [
            'ACEITE',
            'COJINETE',
            'TERMOSTATO'
        ]
    };

    const listaExclusiones = exclusiones[tipo] || [];

    const posicionTipo=descripcion.indexOf(tipo);
    if(posicionTipo!==-1) {
        const textoAntes=descripcion.substring(0,posicionTipo).trim();
        const palabrasAntes=textoAntes.split(/\s+/);
        if(listaExclusiones.some(x=>palabrasAntes.includes(x))) return false;
    }

    if (listaExclusiones.some(prefijo =>
        new RegExp('^' + prefijo + '\\b').test(descripcion)
    )) {
        return false;
    }

    if (tipo === 'COMPRESOR') {
        return /^(?:[A-Z0-9&.\-]+\s+){0,3}(COMPRESOR|COMP\.?(?:\s+(?:SCROLL|DISCUS))?)(?=\s|$)/.test(descripcion);
    }

    if (tipo === 'EVAPORADOR') {
        return /^(?:[A-Z0-9&.\-]+\s+){0,3}EVAPORADOR(?:ES)?\b/.test(descripcion) ||
               /PROVEEDOR:[A-Z0-9&.\-]+\s+EVAPORADOR(?:ES)?\b/.test(descripcion);
    }

    if (tipo === 'VALVULA') {
        return /^(?:[A-Z0-9&.\-]+\s+){0,3}VALVULA(?:S)?\b/.test(descripcion);
    }

    return new RegExp(
        '^(?:[A-Z0-9&.\\-]+\\s+){0,3}' +
        tipo +
        '(?:S)?\\b'
    ).test(descripcion);
}
for (const tipo of tiposFuertes) {

    if (!consultaTecnica.includes(tipo)) continue;

    if (
        esObjetoPrincipal(tipo) &&
        tipoEsPrincipalConsulta(tipo)
    ) {

        puntos += 70;

    } else {

        puntos -= 20;

    }

}



// Marca solicitada
const marcasFuertes = ['COPELAND','BITZER','DANFOSS','TRANE','CARRIER','BOHN','HUSSMANN','EMERSON','GUNTNER','GÜNTNER'];
for (const marca of marcasFuertes) {
    if (consultaTecnica.includes(limpiar(marca))) {
        if (textoTecnico.includes(limpiar(marca))) puntos += 60;
        else puntos -= 30;
    }
}

// Refrigerante solicitado: coincidencia fuerte / contradiccion
const refrigerantesNormalizados = [
    {nombre:'R410A', aliases:['R410A','R410','410A']},
    {nombre:'R404A',aliases:['R404A','R404','404A']},
    {nombre:'R22', aliases:['R22']},
    {nombre:'R134A', aliases:['R134A','R134','134A']},
    {nombre:'R507', aliases:['R507','507']},
    {nombre:'R407C', aliases:['R407C','407C']}
];

const refrigeranteSolicitado =
    refrigerantesNormalizados.find(r =>
        r.aliases.some(x => consultaTecnica.includes(x))
    );

if (refrigeranteSolicitado) {

    const tieneSolicitado =
        refrigeranteSolicitado.aliases.some(x =>
            textoTecnico.includes(x)
        );

    if (tieneSolicitado) {

        puntos += 80;

    } else {

        const refrigeranteContrario =
            refrigerantesNormalizados.find(r =>
                r.nombre !== refrigeranteSolicitado.nombre &&
                r.aliases.some(x =>
                    textoTecnico.includes(x)
                )
            );

        if (refrigeranteContrario) {
            puntos -= 80;
        }
    }

}

// Evitar que accesorios/refacciones desplacen al objeto principal solicitado
if (consultaTecnica.includes('COMPRESOR')) {
    const accesorios = [
      'KIT DE ARRANQUE',
      'CONTROL SENTRONIC',
      'DEMAND COOLING',
      'ENFRIADOR DE CABEZA',
      'MODULO PROTECTOR',
      'PLATO DE VALVULAS',
      'JUEGO DE JUNTAS',
      'JGO. DE JUNTAS',
      'VALVE PLATE KIT',
      'ENS. BIELA PISTON',
      'KIT DE ENSAMBLE BIELA PISTON',
      'JUEGO DE ANILLOS',
      'JUNTAS PARA COMPRESOR',
      'EMPAQUES PARA COMPRESOR'
    ];
    if (accesorios.some(x=>textoTecnico.includes(x))) puntos -= 70;


if (consultaTecnica.includes('COMPRESOR') &&
    textoTecnico.includes('MIRILLA PARA COMPRESOR')) {
    puntos -= 70;
}
}




const consultaLimpia =
limpiar(busqueda);


// ==================================
// PRIORIDAD TIPO + MARCA V2.4.2
// ==================================

const textoProductoRanking =
    limpiar(
        producto.descripcion + " " +
        producto.familia + " " +
        producto.subfamilia
    );


// ---------- TIPO DE PRODUCTO ----------

const tiposConsulta = [
    "COMPRESOR",
    "RESISTENCIA",
    "CONDENSADOR",
    "EVAPORADOR",
    "VENTILADOR",
    "MOTOR",
    "BOMBA",
    "VALVULA",
    "FILTRO",
    "TERMOSTATO",
    "CONTROLADOR"
];


// ==================================
// OBJETO PRINCIPAL DE LA CONSULTA
// ==================================

function tipoEsPrincipalConsulta(tipo) {

    const posicion = consultaTecnica.indexOf(tipo);

    if (posicion === -1) return false;

    const textoAntes =
        consultaTecnica
            .substring(0, posicion)
            .trim();

    if (!textoAntes) return true;

    const palabrasContexto = [
        "ACEITE",
        "KIT",
        "JUNTAS",
        "EMPAQUES",
        "EMPAQUE",
        "PLATO",
        "JUEGO",
        "JGO",
        "CONTROL",
        "MODULO",
        "MIRILLA",
        "ADAPTADOR",
        "SOPORTE",
        "MOTOR",
        "ASPA",
        "FLECHA",
        "RUEDA",
        "BOBINA",
        "TARJETA",
        "REJILLA",
        "COJINETE",
        "SELLO",
        "SELLOS",
        "ANILLOS",
        "ANILLO"
    ];

    const palabras = textoAntes.split(/\s+/);

    return !palabrasContexto.some(
        palabra => palabras.includes(palabra)
    );
}


////// tipos consulta

//tiposConsulta.forEach(tipo => {

    //if (
        //consultaLimpia.includes(tipo) &&
        //textoProductoRanking.includes(tipo) &&
        //tipoEsPrincipalConsulta(tipo)
    //) {
        //puntos += 60;
    //}

//});


// ---------- MARCA ----------

const marcasConsulta = [
    "COPELAND",
    "BITZER",
    "DANFOSS",
    "TRANE",
    "CARRIER",
    "BOHN",
    "HUSSMANN",
    "EMERSON",
    "GUNTNER",
    "GÜNTNER"
];

//marcasConsulta.forEach(marca => {

//    if (
  //      consultaLimpia.includes(
    //        limpiar(marca)
      //  ) &&
        //textoProductoRanking.includes(
          //  limpiar(marca)
//        )
  //  ) {
    //    puntos += 50;
    //}

//});


// ==================================
// PRIORIDAD POTENCIA HVACR
// ==================================

// ==================================
// PRIORIDAD ESPECIFICACIONES HVACR V2.4.1
// ==================================

function obtenerAtributo(producto, clave) {

    const a =
        producto.atributos?.[clave];

    if (a?.valor != null) {
        return Number(a.valor);
    }

    const t =
        producto.atributos_tecnicos?.atributos?.[clave];

    if (t?.valor != null) {
        return Number(t.valor);
    }

    return null;
}


// ---------- POTENCIA ----------

const potenciaMatch =
    consultaLimpia.match(
        /(\d+(?:[.,]\d+)?)\s*(?:W|WATTS?)/
    );

if (potenciaMatch) {

    const potenciaSolicitada =
        Number(
            potenciaMatch[1]
                .replace(",", ".")
        );

    let potenciaProducto =
        obtenerAtributo(
            producto,
            "potencia_w"
        );

    // Fallback: buscar potencia en descripción
    if (potenciaProducto == null) {

        const m =
            limpiar(producto.descripcion || "")
                .match(
                    /(\d+(?:[.,]\d+)?)\s*(?:W|WATTS?)/
                );

        if (m) {
            potenciaProducto =
                Number(
                    m[1].replace(",", ".")
                );
        }
    }

    if (potenciaProducto != null) {

        if (
            potenciaProducto ===
            potenciaSolicitada
        ) {
            puntos += 100;
        } else {
            puntos -= 50;
        }
    }
}


// ---------- VOLTAJE ----------

const voltajeMatch =
    consultaLimpia.match(
        /(\d+(?:[.,]\d+)?)\s*V(?:OLTS?)?/
    );

if (voltajeMatch) {

    const voltajeSolicitado =
        Number(
            voltajeMatch[1]
                .replace(",", ".")
        );

    let voltajeProducto =
        obtenerAtributo(
            producto,
            "voltaje"
        );

    // Fallback: buscar voltaje en descripción
    if (voltajeProducto == null) {

        const m =
            limpiar(producto.descripcion || "")
                .match(
                    /(\d+(?:[.,]\d+)?)\s*V(?:OLTS?)?/
                );

        if (m) {
            voltajeProducto =
                Number(
                    m[1].replace(",", ".")
                );
        }
    }

    if (voltajeProducto != null) {

        if (
            voltajeProducto ===
            voltajeSolicitado
        ) {
            puntos += 40;
        } else {
            puntos -= 20;
        }
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
