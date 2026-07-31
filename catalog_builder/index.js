const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

//=========================================================
// MULTICONFORT Catalog Builder v0.2
//=========================================================

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("\nUso:");
    console.log("node catalog_builder/index.js archivo.xlsx\n");
    process.exit(0);
}

const archivo = args[0];

if (!fs.existsSync(archivo)) {
    console.log("\nNo existe el archivo:");
    console.log(archivo);
    process.exit(0);
}

console.log("");
console.log("======================================");
console.log(" MULTICONFORT Catalog Builder v0.2");
console.log("======================================");
console.log("");

console.log("Leyendo Excel...");
console.log(archivo);
console.log("");

const workbook = XLSX.readFile(archivo);

const hoja = workbook.Sheets[workbook.SheetNames[0]];

const datos = XLSX.utils.sheet_to_json(hoja, {
    defval: ""
});

console.log("Productos encontrados:", datos.length);

//------------------------------------------------------
// Crear carpeta output
//------------------------------------------------------

const outputDir = path.join(__dirname, "output");

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

//------------------------------------------------------
// Normalizar registros
//------------------------------------------------------

const catalogo = datos.map((item, index) => {

    return {

        id: index + 1,

        uuid: "",

        codigo_mc: item["Codigo MC"],

        categoria: item["Categoria"],

        familia: item["Familia"],

        subfamilia: item["Subfamilia"],

        marca: item["Marca"],

        fabricante: item["Fabricante"],

        modelo: item["Modelo"],

        serie: item["Serie"],

        codigo_proveedor: item["No Artículo"],

        descripcion: item["Descripción"],

        almacen: item["Almacén"],

        existencia: Number(item["Disponible"]),

        precio_compra: Number(item["PRECIO + iva"]),

        precio_publico: Number(item["precio publico "]),

        estado: "ACTIVO",

        sinonimos: [],

        atributos: {}

    };

});

//------------------------------------------------------
// Guardar JSON
//------------------------------------------------------

const archivoSalida = path.join(outputDir, "catalogo_maestro.json");

fs.writeFileSync(
    archivoSalida,
    JSON.stringify(catalogo, null, 4),
    "utf8"
);

console.log("");
console.log("Archivo generado correctamente:");
console.log(archivoSalida);
console.log("");

console.log("Primer producto:");
console.log("");

console.log(catalogo[0]);

console.log("");
console.log("Proceso terminado.");