const FC102Simulator =
require("./fc102Simulator");


const vfd =
new FC102Simulator(
"FC102-SIM-001"
);



console.log(
"MULTICONFORT IA - FC102 SIM"
);



vfd.start();


vfd.setFrequency(42.5);



console.log(
JSON.stringify(
vfd.getData(),
null,
2
)
);