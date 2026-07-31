const fs = require("fs");

const {
 detectarDuplicados
}=require("./duplicate_engine");


const productos =
JSON.parse(
fs.readFileSync(
"../database/catalog_ia.json",
"utf8"
)
);


const resultado =
detectarDuplicados(productos);


console.log(
"Duplicados encontrados:",
resultado.length
);


console.log(
resultado.slice(0,10)
);