const fs = require("fs");
const path = require("path");

const paths = require("../config/paths");

const archivo = path.join(
    paths.DATABASE,
    "catalog_enriquecido.json"
);

const catalogo =
JSON.parse(
    fs.readFileSync(archivo,"utf8")
);


let pendientes = [];


catalogo.forEach(producto=>{


    if(!producto.categoria){

        pendientes.push({

            codigo:
            producto.codigo_proveedor,

            descripcion:
            producto.descripcion

        });

    }

});



console.log(
"Productos pendientes:",
pendientes.length
);


console.table(
pendientes.slice(0,50)
);