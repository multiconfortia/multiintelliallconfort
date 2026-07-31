const { extraerAtributos } =
require("./attributes");


const productos = [

"MOTOR VENTILADOR 2 HP 1750 RPM 220V",

"REFRIGERANTE R404A CILINDRO 10 KG",

"FILTRO DESHIDRATADOR 3/8 SAE",

"TERMOSTATO DIGITAL 110V"

];


productos.forEach(texto => {

    console.log("");
    console.log(texto);

    console.log(
        extraerAtributos(texto)
    );

});