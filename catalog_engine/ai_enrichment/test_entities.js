// ======================================
// MULTICONFORT IA
// TEST ENTITY RECOGNITION
// ======================================

const {
    reconocerEntidades
} = require("./entity_recognition");


const pruebas = [

    "COPELAND ACEITE POLIOLESTER RL32 GALON",

    "CONTROLADOR CAREL MODBUS HVAC",

    "COMPRESOR DANFOSS R404A"

];


pruebas.forEach(texto => {

    console.log("\n====================");
    console.log("Producto:");
    console.log(texto);

    console.log("\nEntidades:");

    console.log(
        reconocerEntidades(texto)
    );

});