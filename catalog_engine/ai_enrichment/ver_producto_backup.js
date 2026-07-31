const fs = require("fs");


const productos =
JSON.parse(
    fs.readFileSync(
        "../database/catalog_ia.json",
        "utf8"
    )
);


let familias = {};


productos.forEach(p=>{

    let f =
    p.familia || "SIN_FAMILIA";


    familias[f] =
    (familias[f] || 0) + 1;

});


console.log(familias);