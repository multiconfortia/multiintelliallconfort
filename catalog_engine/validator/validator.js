const fs = require("fs");
const path = require("path");


// Archivo origen
const archivo = path.join(
    __dirname,
    "../../catalog_builder/output/catalogo_maestro.json"
);


const catalogo =
JSON.parse(
    fs.readFileSync(archivo,"utf8")
);


let errores = [];
let advertencias = [];


catalogo.forEach((producto,index)=>{


    if(!producto.codigo_proveedor){

        errores.push(
          `Producto ${index+1}: sin código proveedor`
        );

    }


    if(!producto.descripcion){

        errores.push(
          `Producto ${index+1}: sin descripción`
        );

    }


    if(producto.existencia < 0){

        errores.push(
          `Producto ${index+1}: existencia negativa`
        );

    }


    if(producto.categoria===""){

        advertencias.push(
          `${producto.descripcion}: sin categoría`
        );

    }

});


console.log("================================");
console.log("VALIDACIÓN CATÁLOGO MAESTRO");
console.log("================================");


console.log(
`Productos revisados: ${catalogo.length}`
);


console.log(
`Errores: ${errores.length}`
);


console.log(
`Advertencias: ${advertencias.length}`
);



if(errores.length){

    console.log("\nERRORES:");
    console.table(errores);

}


if(advertencias.length){

    console.log("\nPENDIENTES IA:");
    console.table(advertencias.slice(0,20));

}


console.log("\nProceso terminado.");