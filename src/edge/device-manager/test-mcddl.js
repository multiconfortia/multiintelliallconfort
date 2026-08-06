const path = require("path");

const { loadMCDDL } = require("./mcddlLoader");


const devicePath = path.join(
    __dirname,
    "..",
    "drivers",
    "fullgauge",
    "tc900e",
    "tc900e.mcddl.json"
);


const device = loadMCDDL(devicePath);


console.log("================================");
console.log("MULTICONFORT IA - MC-DDL TEST");
console.log("================================");

console.log("Fabricante:");
console.log(device.device.manufacturer);

console.log("Modelo:");
console.log(device.device.model);

console.log("Protocolo:");
console.log(device.communication.protocol);

console.log("Variables:");

device.variables.forEach(variable => {

    console.log(
        "-",
        variable.id,
        "|",
        variable.name,
        "| Registro:",
        variable.register
    );

});