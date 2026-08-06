const TC900ESimulator =
require("./tc900eSimulator");


const simulator =
new TC900ESimulator();


simulator.on(
"data",
(data)=>{

console.clear();

console.log(
"MULTICONFORT IA - TC900E SIM"
);

console.log(
JSON.stringify(
data,
null,
2
)
);


});


simulator.start();