const path = require("path");

const {
    loadMCDDL
} = require("./mcddlLoader");


const file = path.resolve(

    __dirname,

    "..",

    "drivers",

    "vfd",

    "danfoss",

    "fc102",

    "fc102.mcddl.json"

);



const fc102 = loadMCDDL(file);



console.log(
"MULTICONFORT IA - FC102 MC-DDL TEST"
);



console.log(
"Fabricante:"
);

console.log(
fc102.device.manufacturer
);



console.log(
"Modelo:"
);

console.log(
fc102.device.model
);



console.log(
"Variables:"
);



fc102.variables.forEach(
(v)=>{

console.log(
"-",
v.id,
"|",
v.name
);

}

);