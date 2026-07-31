// ======================================
// MULTICONFORT IA
// REPORTE DE ENTIDADES IA
// ======================================

const fs = require("fs");
const path = require("path");


const archivo =
    path.join(
        __dirname,
        "..",
        "database",
        "catalog_ia.json"
    );


const productos =
    JSON.parse(
        fs.readFileSync(
            archivo,
            "utf8"
        )
    );


let marcas = {};
let tecnologias = {};
let tipos = {};
let fuentes = {};



productos.forEach(producto=>{


    const entidades =
        producto.entidades_ia;


    if(entidades){


        entidades.marcas.forEach(x=>{
            marcas[x] = (marcas[x] || 0) + 1;
        });


        entidades.tecnologias.forEach(x=>{
            tecnologias[x] = (tecnologias[x] || 0) + 1;
        });


        entidades.tipos.forEach(x=>{
            tipos[x] = (tipos[x] || 0) + 1;
        });


    }



    if(producto.conocimiento_ia){


        const fuente =
            producto.conocimiento_ia.fuente;


        fuentes[fuente] =
            (fuentes[fuente] || 0) + 1;


    }


});



function imprimir(titulo,obj){

    console.log("");
    console.log("==============================");
    console.log(titulo);
    console.log("==============================");


    Object.entries(obj)
    .sort((a,b)=>b[1]-a[1])
    .forEach(([nombre,cantidad])=>{

        console.log(
            nombre.padEnd(25),
            cantidad
        );

    });

}



console.log("");
console.log("=================================");
console.log("MULTICONFORT IA");
console.log("REPORTE DE INTELIGENCIA");
console.log("=================================");


console.log("");

console.log(
    "Productos totales:",
    productos.length
);


console.log(
    "Con entidades IA:",
    productos.filter(x=>x.entidades_ia).length
);


console.log(
    "Con conocimiento:",
    productos.filter(x=>x.conocimiento_ia).length
);



imprimir(
    "MARCAS DETECTADAS",
    marcas
);


imprimir(
    "TECNOLOGIAS DETECTADAS",
    tecnologias
);


imprimir(
    "TIPOS DE PRODUCTO",
    tipos
);


imprimir(
    "FUENTES DE CONOCIMIENTO",
    fuentes
);