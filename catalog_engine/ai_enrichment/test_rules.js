const reglas =
require("./rules_engine");


let productos = [

"HARRYS SOLDADURA PLANA 0%",
"GEFRIEREN REFRIGERANTE 404A 10.89KGS",
"FULL GAUGE CONTROLADOR MEDIA TEMP 12/24V",
"COBRE CODO 1 5/8 X 90"

];


productos.forEach(p=>{

    console.log("\nPRODUCTO:");
    console.log(p);

    console.log(
        reglas.clasificarProducto(p)
    );

});