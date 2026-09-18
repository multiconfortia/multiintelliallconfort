const fs = require("fs");
const path = require("path");

// ============================================================
// MULTICONFORT IA
// SEO COMERCIAL V2
// ANALYZER
// ============================================================
// Objetivo:
// Analizar el catálogo real SIN modificarlo
// y determinar qué productos tienen potencial SEO.
//
// NO genera HTML.
// NO modifica catalog_ia_v2.1.json.
// ============================================================

const ROOT = path.resolve(__dirname, "..", "..");

// ==================================================
// IDENTIDAD SEO MASTER TEST
// ==================================================
const IDENTIDAD_FILE = path.join(
    ROOT,
    "seo_comercial",
    "engine",
    "seo-identidad-MASTER_TEST.json"
);

if (!fs.existsSync(IDENTIDAD_FILE)) {
    console.error("ERROR: NO EXISTE MASTER DE IDENTIDAD SEO:");
    console.error(IDENTIDAD_FILE);
    process.exit(1);
}

const identidadMaster = JSON.parse(
    fs.readFileSync(IDENTIDAD_FILE, "utf8")
);

const identidadIndex = new Map(
    (identidadMaster.resultados || []).map(x => [x.id_multiconfort, x])
);
// ==================================================
// FIN IDENTIDAD SEO MASTER TEST
// ==================================================


const CATALOGO = path.join(
    ROOT,
    "catalog_engine",
    "database",
    "catalog_ia_v2.1.json"
);

const OUTPUT = path.join(
    ROOT,
    "seo_comercial",
    "output"
);

const REPORTE = path.join(
    OUTPUT,
    "seo-analysis-v2_IDENTITY_TEST.json"
);

console.log("==============================================");
console.log(" MULTICONFORT IA");
console.log(" SEO COMERCIAL V2");
console.log(" ANALYZER");
console.log("==============================================\n");

// ------------------------------------------------------------
// NORMALIZAR
// ------------------------------------------------------------

function normalizar(valor) {
    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .trim();
}

// ------------------------------------------------------------
// TEXTO DEL PRODUCTO
// ------------------------------------------------------------

function textoProducto(p) {

    return normalizar([
        p.categoria,
        p.familia,
        p.subfamilia,
        p.marca,
        p.fabricante,
        p.modelo,
        p.serie,
        p.descripcion,
        p.codigo_proveedor,
        p.codigo_mc
    ].join(" "));
}

// ------------------------------------------------------------
// KEYWORDS HVACR
// ------------------------------------------------------------

const KEYWORDS_HVACR = [

    "HVAC",
    "HVACR",
    "AIRE ACONDICIONADO",
    "REFRIGERACION",
    "REFRIGERANTE",

    "COMPRESOR",
    "CONDENSADOR",
    "CONDENSADORA",
    "EVAPORADOR",
    "EVAPORADORA",

    "VALVULA",
    "EXPANSION",
    "SOLENOIDE",

    "CONTROLADOR",
    "CONTROL",
    "TERMOSTATO",
    "SENSOR",

    "VENTILADOR",
    "MOTOVENTILADOR",
    "MOTOR",

    "SERPENTIN",
    "INTERCAMBIADOR",

    "BOMBA",
    "MOTOBOMBA",

    "FILTRO",
    "DESHIDRATADOR",

    "RESISTENCIA",
    "CALEFACCION",

    "CARTER",

    "DANFOSS",
    "COPELAND",
    "BITZER",
    "SPORLAN",
    "TRANE",
    "CARRIER",
    "EMERSON",
    "FULL GAUGE",
    "BOHN",

    "R410A",
    "R404A",
    "R22",
    "R134A",
    "R32",
    "R407C",
    "R507",
    "R290",
    "R600A"
];

// ------------------------------------------------------------
// DETECTAR RELEVANCIA
// ------------------------------------------------------------

function analizarRelevancia(p) {

    const texto = textoProducto(p);

    const encontrados = [];

    for (const keyword of KEYWORDS_HVACR) {

        if (texto.includes(keyword)) {
            encontrados.push(keyword);
        }
    }

    return {
        puntos: Math.min(encontrados.length, 20),
        keywords: encontrados
    };
}

// ------------------------------------------------------------
// CALIDAD DE DESCRIPCION
// ------------------------------------------------------------

function analizarDescripcion(p) {

    const descripcion =
        String(p.descripcion || "").trim();

    let calidad = "BAJA";

    if (descripcion.length >= 60) {
        calidad = "ALTA";
    }
    else if (descripcion.length >= 30) {
        calidad = "MEDIA";
    }

    return {
        existe: descripcion.length > 0,
        longitud: descripcion.length,
        calidad
    };
}

// ------------------------------------------------------------
// CLASIFICACION
// ------------------------------------------------------------

function analizarClasificacion(p) {

    return {

        categoria:
            Boolean(String(p.categoria || "").trim()),

        familia:
            Boolean(String(p.familia || "").trim()),

        subfamilia:
            Boolean(String(p.subfamilia || "").trim()),

        marca:
            Boolean(String(p.marca || "").trim()),

        fabricante:
            Boolean(String(p.fabricante || "").trim()),

        modelo:
            Boolean(String(p.modelo || "").trim()),

        serie:
            Boolean(String(p.serie || "").trim())
    };
}

// ------------------------------------------------------------
// ATRIBUTOS
// ------------------------------------------------------------

function analizarAtributos(p) {

    const atributos =
        p.atributos_tecnicos?.atributos || {};

    const cantidad =
        Object.keys(atributos).length;

    const cobertura =
        typeof p.completitud_atributos?.cobertura_simple === "number"
            ? p.completitud_atributos.cobertura_simple
            : 0;

    return {

        cantidad,

        cobertura,

        porcentaje:
            Math.round(cobertura * 100)

    };
}

// ------------------------------------------------------------
// COMERCIAL
// ------------------------------------------------------------

function analizarComercial(p) {

    const existencia =
        typeof p.existencia === "number"
            ? p.existencia
            : 0;

    const precio =
        typeof p.precio_publico === "number"
            ? p.precio_publico
            : 0;

    const activo =
        normalizar(p.estado) === "ACTIVO";

    return {

        activo,

        existencia,

        disponible:
            existencia > 0,

        tienePrecio:
            precio > 0,

        precio,

        comercializable:
            activo && existencia > 0
    };
}

// ------------------------------------------------------------
// SCORE SEO
// ------------------------------------------------------------

function calcularScore(data) {

    let score = 0;

    // Descripción
    if (data.descripcion.calidad === "ALTA") {
        score += 20;
    }
    else if (data.descripcion.calidad === "MEDIA") {
        score += 12;
    }
    else if (data.descripcion.existe) {
        score += 5;
    }

    // Clasificación
    if (data.clasificacion.categoria) {
        score += 4;
    }

    if (data.clasificacion.familia) {
        score += 4;
    }

    if (data.clasificacion.subfamilia) {
        score += 4;
    }

    // Marca / fabricante
    if (data.clasificacion.marca) {
        score += 5;
    }

    if (data.clasificacion.fabricante) {
        score += 3;
    }

    // Modelo
    if (data.clasificacion.modelo) {
        score += 5;
    }

    // Atributos
    score += Math.min(
        15,
        data.atributos.cantidad * 2
    );

    // Completitud
    score += Math.min(
        10,
        Math.round(data.atributos.cobertura * 10)
    );

    // Relevancia HVACR
    score += data.relevancia.puntos;

    // Comercial
    if (data.comercial.activo) {
        score += 5;
    }

    if (data.comercial.disponible) {
        score += 5;
    }

    return Math.min(score, 100);
}

// ------------------------------------------------------------
// CLASIFICACION SEO V2
// ------------------------------------------------------------

function clasificar(score, data) {

    if (
        score >= 75 &&
        data.relevancia.puntos >= 5 &&
        data.descripcion.existe
    ) {
        return "SEO_READY";
    }

    if (
        score >= 45 &&
        data.relevancia.puntos >= 2
    ) {
        return "SEO_PENDING";
    }

    return "NO_PUBLICAR";
}

// ------------------------------------------------------------
// ANALIZAR PRODUCTO
// ------------------------------------------------------------

// ------------------------------------------------------------
// ANALIZAR PRODUCTO
// ------------------------------------------------------------

function analizarProducto(p) {

    // Identidad SEO V1
    const identidad = identidadIndex.get(p.id_multiconfort) || null;

    const relevancia = analizarRelevancia(p);
    const descripcion = analizarDescripcion(p);
    const clasificacion = analizarClasificacion(p);
    const atributos = analizarAtributos(p);
    const comercial = analizarComercial(p);

    const base = {
        relevancia,
        descripcion,
        clasificacion,
        atributos,
        comercial
    };

    const score = calcularScore(base);
    const estadoSEO = clasificar(score, base);

    // --------------------------------------------------------
    // IDENTIFICADOR DEL PRODUCTO
    // --------------------------------------------------------
    // PRIORIDAD:
    // 1. id del catálogo
    // 2. id_multiconfort
    // 3. codigo_mc
    // 4. codigo_proveedor
    // 5. uuid
    //
    // NO usamos Number() para evitar NaN.
    // --------------------------------------------------------

    let identificador = null;
    let tipoIdentificador = null;

    if (
        p.id !== undefined &&
        p.id !== null &&
        String(p.id).trim() !== ""
    ) {
        identificador = p.id;
        tipoIdentificador = "id_catalogo";
    }
    else if (p.id_multiconfort) {
        identificador = p.id_multiconfort;
        tipoIdentificador = "id_multiconfort";
    }
    else if (p.codigo_mc) {
        identificador = p.codigo_mc;
        tipoIdentificador = "codigo_mc";
    }
    else if (p.codigo_proveedor) {
        identificador = p.codigo_proveedor;
        tipoIdentificador = "codigo_proveedor";
    }
    else if (p.uuid) {
        identificador = p.uuid;
        tipoIdentificador = "uuid";
    }

    // --------------------------------------------------------
    // RESULTADO SEO
    // --------------------------------------------------------

    return {

        // Identificación universal
        identificador,
        tipoIdentificador,

        // ID original del catálogo
        id:
            p.id !== undefined &&
            p.id !== null &&
            String(p.id).trim() !== ""
                ? p.id
                : null,

        // Identificadores MULTICONFORT
        id_multiconfort:
            p.id_multiconfort ?? "",

        codigo_proveedor:
            p.codigo_proveedor ?? "",

        uuid:
            p.uuid ?? "",

        codigo_mc:
            p.codigo_mc ?? "",

        // Información del producto
        descripcion:
            p.descripcion ?? "",

        categoria:
            p.categoria ?? "",

        familia:
            p.familia ?? "",

        subfamilia:
            p.subfamilia ?? "",

        marca:
            p.marca ?? "",

        fabricante:
            p.fabricante ?? "",

        modelo:
            p.modelo ?? "",

        // SEO
        score,

        estadoSEO,

        relevanciaHVACR:
            relevancia.puntos,

        keywordsHVACR:
            relevancia.keywords,

        descripcionAnalisis:
            descripcion,

        atributosAnalisis:
            atributos,

        comercialAnalisis:
            comercial,

        // Identidad SEO V1
        identidad_seo: identidad?.identidad_seo || "",
        estadoIdentidad: identidad?.estado || "IDENTIDAD_NO_ENCONTRADA",
        fuenteIdentidad: identidad?.fuente_identidad || "",
        motivoIdentidad: identidad?.motivo || ""
    };
}

// ------------------------------------------------------------
// VALIDAR CATALOGO
// ------------------------------------------------------------

if (!fs.existsSync(CATALOGO)) {

    console.error("ERROR: NO EXISTE EL CATALOGO:");

    console.error(CATALOGO);

    process.exit(1);
}

let catalogo;

try {

    catalogo = require(CATALOGO);

}
catch (error) {

    console.error(
        "ERROR AL CARGAR CATALOGO:"
    );

    console.error(error.message);

    process.exit(1);
}

if (!Array.isArray(catalogo)) {

    console.error(
        "ERROR: EL CATALOGO NO ES UN ARRAY"
    );

    process.exit(1);
}

console.log(
    "Productos encontrados:",
    catalogo.length
);

// ------------------------------------------------------------
// ANALISIS
// ------------------------------------------------------------

const resultados =
    catalogo.map(analizarProducto);

// ------------------------------------------------------------
// ESTADISTICAS
// ------------------------------------------------------------

const ready =
    resultados.filter(
        p => p.estadoSEO === "SEO_READY"
    );

const pending =
    resultados.filter(
        p => p.estadoSEO === "SEO_PENDING"
    );

const noPublicar =
    resultados.filter(
        p => p.estadoSEO === "NO_PUBLICAR"
    );

// ------------------------------------------------------------
// RANKING
// ------------------------------------------------------------

const ranking =
    [...resultados]
        .sort((a, b) => {

            if (b.score !== a.score) {
                return b.score - a.score;
            }

            return (
                b.relevanciaHVACR -
                a.relevanciaHVACR
            );
        });

// ------------------------------------------------------------
// ESTADISTICAS ADICIONALES
// ------------------------------------------------------------

const activos =
    resultados.filter(
        p => p.comercialAnalisis.activo
    ).length;

const disponibles =
    resultados.filter(
        p => p.comercialAnalisis.disponible
    ).length;

const conMarca =
    resultados.filter(
        p => p.marca
    ).length;

const conModelo =
    resultados.filter(
        p => p.modelo
    ).length;

const conAtributos =
    resultados.filter(
        p =>
            p.atributosAnalisis.cantidad > 0
    ).length;

// ------------------------------------------------------------
// REPORTE
// ------------------------------------------------------------

const reporte = {

    metadata: {

        sistema:
            "MULTICONFORT IA",

        modulo:
            "SEO COMERCIAL",

        version:
            "2.0.0",

        fecha:
            new Date().toISOString(),

        catalogo:
            path.relative(ROOT, CATALOGO)

    },

    resumen: {

        productosAnalizados:
            resultados.length,

        seoReady:
            ready.length,

        seoPending:
            pending.length,

        noPublicar:
            noPublicar.length,

        activos,

        disponibles,

        conMarca,

        conModelo,

        conAtributos

    },

    ranking: ranking.slice(0, 100),

    productos:
        resultados

};

// ------------------------------------------------------------
// CREAR OUTPUT
// ------------------------------------------------------------

fs.mkdirSync(
    OUTPUT,
    {
        recursive: true
    }
);

// ------------------------------------------------------------
// GUARDAR
// ------------------------------------------------------------

fs.writeFileSync(
    REPORTE,
    JSON.stringify(
        reporte,
        null,
        2
    ),
    "utf8"
);

// ------------------------------------------------------------
// CONSOLA
// ------------------------------------------------------------

console.log("\n==============================================");
console.log(" RESULTADO SEO V2");
console.log("==============================================");

console.log(
    "Productos analizados :",
    resultados.length
);

console.log(
    "SEO_READY            :",
    ready.length
);

console.log(
    "SEO_PENDING          :",
    pending.length
);

console.log(
    "NO_PUBLICAR          :",
    noPublicar.length
);

console.log("----------------------------------------------");

console.log(
    "Activos              :",
    activos
);

console.log(
    "Con existencia       :",
    disponibles
);

console.log(
    "Con marca            :",
    conMarca
);

console.log(
    "Con modelo           :",
    conModelo
);

console.log(
    "Con atributos        :",
    conAtributos
);

console.log("\n==============================================");
console.log(" TOP 20 SEO");
console.log("==============================================");

ranking
    .slice(0, 20)
    .forEach((p, i) => {

        console.log(
            `${i + 1}. SCORE ${p.score} | ${p.estadoSEO}`
        );

        console.log(
            `   ID: ${p.id} | ${p.descripcion}`
        );

        console.log(
            `   ${p.marca || ""} | ${p.categoria || ""} | ${p.familia || ""}`
        );

        console.log("");

    });

console.log("==============================================");

console.log(
    "REPORTE:",
    path.relative(ROOT, REPORTE)
);

console.log("==============================================");

console.log(
    "CATALOGO ORIGINAL: SIN MODIFICAR"
);

console.log(
    "SEO ENGINE: NO EJECUTADO"
);

console.log(
    "HTML: NO GENERADO"
);

console.log("==============================================");